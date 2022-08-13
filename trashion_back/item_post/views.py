from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import status
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
    ordering_fields = ['-created_at']  # ?ordering=
    ordering = ['-created_at']

    # 내가 판매중인 아이템 조회
    @action(detail=False, methods=['GET'])
    def my_item(self, request):
        items = Item.objects.filter(user_id=request.data['user_id'])
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 카테고리별 아이템 조회
    @action(detail=False, methods=['GET'])
    def category_item(self, request):
        items = Item.objects.filter(category_id=request.data['category_id'])
        serializer = self.get_serializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 지역별 아이템 조회 <오류발생: 필드에 값이 안들어옴>
    @action(detail=False, methods=['GET'])
    def location_item(self, request):
        locations = Location.objects.all()
        city = request.GET.get('city', None)  # 시는 한개
        gu = request.GET.getlist('gu', None)  # 구는 여러개 선택 가능
        dong = request.GET.getlist('dong', None)  # 동은 여러개 선택 가능
        print(city, " ", gu, " ", dong)  # >> None   []   []
        if city:
            locations = locations.filter(city=city)
        if gu:
            locations = locations.filter(gu__in=gu).distinct()
        if dong:
            locations = locations.filter(dong__in=dong).distinct()

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


class LocationSetViewSet(ModelViewSet):
    queryset = LocationSet.objects.all()
    serializer_class = LocationSetSerializer
