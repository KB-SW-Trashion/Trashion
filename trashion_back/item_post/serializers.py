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
        fields = '__all__'


class StylePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylePhoto
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(source='photo_sets', many=True, read_only=True)
    style_photos = StylePhotoSerializer(source='style_photo_sets', many=True, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'

    # Photo, StylePhoto
    def create(self, validated_data):
        images_data = self.context['request'].FILES
        item = Item.objects.create(**validated_data)
        for photo_data in images_data.getlist('photos_data'):
            Photo.objects.create(item_id=item, photo=photo_data)
        for style_photo_data in images_data.getlist('style_photos_data'):
            StylePhoto.objects.create(item_id=item, user_id=self.context['request'].user, photo=style_photo_data)
        return item


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class LocationSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationSet
        fields = '__all__'
