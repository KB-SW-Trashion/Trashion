import operator
from functools import reduce

from django.contrib.auth import get_user_model
from django.db.models import Q

from dj_rest_auth.jwt_auth import JWTCookieAuthentication
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status, permissions
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet

from .models import Item, Category, Photo, StylePhoto
from .serializers import RetrieveSerializer
from .serializers import *
from relationship.models import Block

User = get_user_model()

class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permissions(self, request, view, obj):
        return obj.user_id == request.user


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()\
        .prefetch_related('location_item_sets') #?—­ì°¸ì¡°?Š” prefetch_related, ? •ì°¸ì¡°?Š” select_related!
    serializer_class = ItemSerializer
    parser_classes = (MultiPartParser, FormParser)
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend, ]
    filterset_fields = ['location_item_sets__location_id__city','location_item_sets__location_id__gu',
                        'location_item_sets__location_id__dong',
                        'category_id__big_category', 'category_id__small_category']
    search_fields = ['description']    # ?search=
    ordering_fields = ['created_at']  # ?ordering=
    ordering = ['-created_at']
    authentication_classes = (JWTCookieAuthentication,)
    permission_classes = (IsOwner,)

    # permission
    def get_permissions(self):
        if self.action in ['create']:
            self.permission_classes = [IsAuthenticated, ]
        elif self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsOwner, ]
        else:
            self.permission_classes = [AllowAny, ]
        return super().get_permissions()

    # create
    def create(self, request, *args, **kwargs):
        # location ë°›ì•„?˜¤ê¸?
        city = request.data['city']
        gu = request.data['gu']
        dong = request.data['dong']
        if city is not None and gu is not None and dong is not None:
            try:
                location = Location.objects.get(
                    Q(city=city) & Q(gu=gu) & Q(dong=dong)
                )
            except:
                Location.objects.create(city=city, gu=gu, dong=dong)
                location = Location.objects.get(
                    Q(city=city) & Q(gu=gu) & Q(dong=dong)
                )
        else:
            return Response(
                {"message": "ì£¼ì†Œ? •ë³´ë?? ëª¨ë‘ ?…? ¥?•´ì£¼ì„¸?š”."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # photo, stylephoto > serializers.py?˜ create()?—?„œ ì²˜ë¦¬
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        new_item = Item.objects.get(id=serializer.data['id'])
        headers = self.get_success_headers(serializer.data)
        # LocationSet ê°ì²´ë§Œë“¤ê¸?
        LocationSet.objects.create(item_id=new_item, location_id=location)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # ?‘?„±? ??™ ????¥
    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)

    # update
    # photo, stylephoto > serializers.py?˜ update()?—?„œ ì²˜ë¦¬
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        # ê¸°ì¡´ locationset ?‚­? œ
        LocationSet.objects.filter(item_id=instance).delete()
        # location ë°›ì•„?˜¤ê¸?
        city = request.data['city']
        gu = request.data['gu']
        dong = request.data['dong']
        if city is not None and gu is not None and dong is not None:
            try:
                location = Location.objects.get(
                    Q(city=city) & Q(gu=gu) & Q(dong=dong)
                )
            except:
                Location.objects.create(city=city, gu=gu, dong=dong)
                location = Location.objects.get(
                    Q(city=city) & Q(gu=gu) & Q(dong=dong)
                )
        else:
            return Response(
                {"message": "ì£¼ì†Œ? •ë³´ë?? ëª¨ë‘ ?…? ¥?•´ì£¼ì„¸?š”."},
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

    #?ƒ?„¸ì¡°íšŒ
    # url: item_post/item/{int:pk}
    def retrieve(self, request, *args, **kwargs):
        item = self.get_object()
        category = Category.objects.get(id=item.category_id_id)
        locationset = LocationSet.objects.get(item_id=item)
        location = locationset.location_id
        serializer = RetrieveSerializer(item)
        return Response(serializer.data)

    # ?•„?´?…œ ?Œë§¤ì™„ë£Œì²˜ë¦?
    # url: item_post/{pk}/set_sold/
    @action(detail=True, methods=['PATCH'])
    def set_sold(self, request, pk):
        item = self.get_object()
        item.sold_out = True
        item.save()
        serializer = self.get_serializer(item)
        return Response(serializer.data)

    # ?•„?„° ì¢…í•©
    @action(detail=False, methods=['GET'])
    def filter_all(self, request):
        city = request.GET.getlist('city', None)
        gu = request.GET.getlist('gu', None)
        dong = request.GET.getlist('dong', None)
        big_category = request.GET.getlist('big_category', None)
        small_category = request.GET.getlist('small_category', None)
        height = request.GET.get('height', None)
        weight = request.GET.get('weight', None)
        sold_out = request.GET.get('sold_out', None)
        locations = Location.objects.all()
        categorys = Category.objects.all()
        items = []
        print(big_category, small_category)
        # ì§??—­ë³? ì¡°íšŒ
        if city is not None:
            if gu == []:  # cityë§? ë³´ì—¬ì£¼ê¸°
                locations = locations.filter(Q(city__in=city))
            elif dong == []:  # city?‘ guë§? ë³´ì—¬ì£¼ê¸°
                locations = Location.objects.filter(Q(city__in=city) & Q(gu__in=gu))
            else: # city, gu, dong ?‹¤ ë³´ì—¬ì£¼ê¸°
                locations = Location.objects.filter(Q(city__in=city) & Q(gu__in=gu) & Q(dong__in=dong))
            location_ids = []
            for i in locations:
                location_ids.append(i.id)
            locationsets = LocationSet.objects.filter(location_id__in=location_ids)
            for i in locationsets:
                items.append(i.item_id)
        # ì¹´í…Œê³ ë¦¬ ì¡°íšŒ
        if big_category is not None:
            if small_category == []:
                categorys = categorys.filter(Q(big_category__in=big_category))
            else:
                categorys = categorys.filter(Q(big_category__in=big_category) & Q(small_category__in=small_category))
            category_ids = []
            for i in categorys:
                category_ids.append(i.id)
            cate_item = Item.objects.filter(category_id__in=category_ids)
            items.extend(cate_item)
        # ?Œë§¤ì™„ë£?/?Œë§¤ì¤‘ ì¡°íšŒ...
        if sold_out is not None:
            s_items = Item.objects.filter(sold_out=sold_out)
            items.extend(s_items)
        # ?‚¤/ëª¸ë¬´ê²? ?‚¬?´ì¦ˆë³„ ì¡°íšŒ
        if height is not None:
            height = int(height)
            if weight is None:
                s_items = Item.objects.filter(Q(height__range=[height - 3, height + 3]))
            else:
                weight = int(weight)
                s_items = Item.objects.filter(
                    Q(height__range=[height - 3, height + 3]) & Q(weight__range=[weight - 3, weight + 3])
                )
            items.extend(s_items)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ?˜„?¬ ?Œë§¤ì¤‘?¸ ?•„?´?…œ ì¡°íšŒ (?Œë§¤ì™„ë£? x)
    @action(detail=False, methods=['GET'])
    def not_sold_item(self, request):
        items = Item.objects.filter(sold_out=False)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ?Œë§¤ëœ ?•„?´?…œ (?Œë§¤ì™„ë£?)
    @action(detail=False, methods=['GET'])
    def sold_item(self, request):
        items = Item.objects.filter(sold_out=True)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ?‚´ ?•„?´?…œ ì¡°íšŒ
    @action(detail=False, methods=['GET'])
    def my_item(self, request):
        items = Item.objects.filter(user_id=request.GET.get('user_id'))
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ?¼ë°? ?´ë¯¸ì??ë§? ëª¨ì•„ë³´ê¸° : ê°™ì?? ?•„?´?…œ?— ?‚¬ì§? ?—¬?Ÿ¬?¥?¼ ê²½ìš°?—?Š” ?•œ?¥ë§?!
    @action(detail=False, methods=['GET'])
    def photo_item_only(self, request):
        item_ids = Photo.objects.distinct().values_list('item_id', flat=True)
        items = Item.objects.filter(id__in=item_ids)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ì°©ì¥ ?´ë¯¸ì??ë§? ëª¨ì•„ë³´ê¸° : ê°™ì?? ?•„?´?…œ?— ?‚¬ì§? ?—¬?Ÿ¬?¥?¼ ê²½ìš°?—?Š” ?•œ?¥ë§?!
    @action(detail=False, methods=['GET'])
    def stylephoto_item_only(self, request):
        item_ids = StylePhoto.objects.distinct().values_list('item_id', flat=True)
        items = Item.objects.filter(id__in=item_ids)
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # ê²??ƒ‰ ê¸°ëŠ¥ (description ê¸°ì??)
    @action(detail=False, methods=['GET'])
    def search_item(self, request):
        q = request.GET.get('q', None)
        items = Item.objects.filter(Q(description__icontains=q))
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_parsers(self):
        if getattr(self, 'swagger_fake_view', False):
            return []

        return super().get_parsers()

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = (JWTCookieAuthentication,)
    permission_classes = (AllowAny,)
    pagination_class = None

    
    def create(self, request, *args, **kwargs):
        big_category= request.data['big_category']
        small_category = request.data['small_category']
        category = Category.objects.filter(small_category = small_category)
        if len(category) == 0 and big_category is not None and small_category is not None:
            Category.objects.create(big_category=big_category, small_category=small_category)
            
        return Response(status.HTTP_201_CREATED)


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
