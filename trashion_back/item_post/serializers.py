from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError as DjangoValidationError, ObjectDoesNotExist
from allauth.account.adapter import get_adapter
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['photo']


class StylePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylePhoto
        fields = ['photo']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['big_category', 'small_category']


class ItemSerializer(serializers.ModelSerializer):
    user = UserSerializer(source="user_id", read_only=True)
    photos = PhotoSerializer()
    style_photos = StylePhotoSerializer()
    category = CategorySerializer(source="category_id")

    class Meta:
        model = Item
        fields = [
            'user',
            'description',
            'feature',
            'product_defect',
            'size',
            'wear_count',
            'price',
            'category',
            'photos',
            'style_photos',
        ]

    def create(self, validated_data):
        category = validated_data.pop('category')

        try:
            category = Category.objects.get(big_category=category.get('big_category'))
        except ObjectDoesNotExist:
            category_serializer = CategorySerializer(data=category)
            category_serializer.is_valid(raise_exception=True)
            category = category_serializer.save()
        else:
            validated_data['category'] = category

        return super(ItemSerializer, self).create(validated_data)

