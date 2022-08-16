from django.db.models import Q
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status, exceptions
from .serializers import *
from django.contrib.auth import get_user_model
from .models import Item, Category, Photo, StylePhoto
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
User = get_user_model()


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['description']    # ?search=
    ordering_fields = ['created_at']  # ?ordering=
    ordering = ['-created_at']

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
