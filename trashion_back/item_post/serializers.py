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
    photos = PhotoSerializer(source='photo_sets', many=True, read_only=True)
    style_photos = StylePhotoSerializer(source='style_photo_sets', many=True, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'


