from django.db.models import Q
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status, exceptions, permissions
from .serializers import *
from django.contrib.auth import get_user_model
from .models import Item, Category, Photo, StylePhoto
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
User = get_user_model()
from rest_framework.permissions import IsAuthenticated, AllowAny
from dj_rest_auth.jwt_auth import JWTCookieAuthentication


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permissions(self, request, view, obj):
      return obj.user_id == request.user


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['description']    # ?search=
    ordering_fields = ['created_at']  # ?ordering=
    ordering = ['-created_at']
    authentication_classes = (JWTCookieAuthentication,)
    permission_classes = (IsOwner,)

    # permission
    def get_permissions(self):
        if self.action in ['create']:
            self.permission_classes = [IsAuthenticated, ]
        elif self.action in ['update', 'partial_update', 'destroy', 'my_item']:
            self.permission_classes = [IsOwner, ]
        else:
            self.permission_classes = [AllowAny, ]
        return super().get_permissions()

    # create
    def create(self, request, *args, **kwargs):
        # location 받아오기
        city = request.data['city']
        gu = request.data['gu']
        dong = request.data['dong']
        if city is not None and gu is not None and dong is not None:
            location = Location.objects.get(
                Q(city=city) & Q(gu=gu) & Q(dong=dong)
            )
        else:
            return Response(
                {"message": "주소정보를 모두 입력해주세요."},
                status=status.HTTP_400_BAD_REQUEST
            )
        # photo, stylephoto > serializers.py의 create()에서 처리
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        new_item = Item.objects.get(id=serializer.data['id'])
        headers = self.get_success_headers(serializer.data)
        # LocationSet 객체만들기
        LocationSet.objects.create(item_id=new_item, location_id=location)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # 작성자 자동 저장
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)

    # update
    # photo, stylephoto > serializers.py의 update()에서 처리
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        # 기존 locationset 삭제
        LocationSet.objects.filter(item_id=instance).delete()
        # location 받아오기
        city = request.data['city']
        gu = request.data['gu']
        dong = request.data['dong']
        if city is not None and gu is not None and dong is not None:
            location = Location.objects.get(
                Q(city=city) & Q(gu=gu) & Q(dong=dong)
            )
        else:
            return Response(
                {"message": "주소정보를 모두 입력해주세요."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        LocationSet.objects.create(item_id=instance, location_id=location)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save(user_id=self.request.user)

    # 내가 판매중인 아이템 조회
    @action(detail=False, methods=['GET'])
    def my_item(self, request):
        items = Item.objects.filter(user_id=request.GET.get('user_id'))
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 카테고리별 아이템 조회
    @action(detail=False, methods=['GET'])
    def category_item(self, request):
        items = Item.objects.filter(category_id=request.GET.get('category_id'))
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 지역별 아이템 조회
    @action(detail=False, methods=['GET'])
    def location_item(self, request):
        city = request.GET.get('city', None)  # 시는 한개
        gu = request.GET.getlist('gu', None)  # 구는 여러개 선택 가능
        dong = request.GET.getlist('dong', None)  # 동은 여러개 선택 가능
        locations = Location.objects.filter(
            Q(city=city) & Q(gu__in=gu) & Q(dong__in=dong)
        )
        location_ids = []
        for i in locations:
            location_ids.append(i.id)

        locationsets = LocationSet.objects.filter(location_id__in=location_ids)

        item_ids = []
        for i in locationsets:
            item_ids.append(i.item_id)
        serializer = self.get_serializer(item_ids, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 사이즈별 아이템 조회(입력한 키의 +-3cm, 몸무게의 +-3kg 범주 내의 상품을 조회)
    @action(detail=False, methods=['GET'])
    def size_item(self, request):
        height = int(request.GET.get('height', None))
        weight = int(request.GET.get('weight', None))
        items = Item.objects.filter(
            Q(height__range=[height-3, height+3]) & Q(weight__range=[weight-3, weight+3])
        )
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 일반 이미지만 모아보기 : 같은 아이템에 사진 여러장일 경우에는 한장만!
    @action(detail=False, methods=['GET'])
    def photo_item_only(self, request):
        item_ids = Photo.objects.distinct().values_list('item_id', flat=True)
        items = Item.objects.filter(id__in=item_ids)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 착장 이미지만 모아보기 : 같은 아이템에 사진 여러장일 경우에는 한장만!
    @action(detail=False, methods=['GET'])
    def stylephoto_item_only(self, request):
        item_ids = StylePhoto.objects.distinct().values_list('item_id', flat=True)
        items = Item.objects.filter(id__in=item_ids)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class StylePhotoViewSet(ModelViewSet):
    queryset = StylePhoto.objects.all()
    serializer_class = StylePhotoSerializer


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class LocationSetViewSet(ModelViewSet):
    queryset = LocationSet.objects.all()
    serializer_class = LocationSetSerializer
