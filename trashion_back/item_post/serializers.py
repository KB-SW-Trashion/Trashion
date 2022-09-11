from django.contrib.auth import get_user_model
from rest_framework import serializers

from review.serializers import ReviewSerializer
from .models import *

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['item_id', 'photo']


class StylePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StylePhoto
        fields = ['item_id', 'user_id', 'photo']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['city', 'gu', 'dong']

class LocationSetSerializer(serializers.ModelSerializer):
    location = LocationSerializer(source='location_id')

    class Meta:
        model = LocationSet
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(source='photo_sets', many=True, read_only=True)
    style_photos = StylePhotoSerializer(source='style_photo_sets', many=True, read_only=True)
    review = ReviewSerializer(source='review_target', many=True, read_only=True)

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
            StylePhoto.objects.create(item_id=item, user_id=self.context['request'].user,
                                      photo=style_photo_data)
        return item

    def update(self, instance, validated_data):
        print("시리얼라이저", self.context['request'].data)
        images_data = self.context['request'].FILES
        print("이미지", images_data)
        Photo.objects.filter(item_id=instance).delete()
        StylePhoto.objects.filter(item_id=instance).delete()
        for photo_data in images_data.getlist('photos_data'):
            Photo.objects.create(item_id=instance, photo=photo_data)
        for style_photo_data in images_data.getlist('style_photos_data'):
            StylePhoto.objects.create(item_id=instance, user_id=self.context['request'].user,
                                      photo=style_photo_data)
        instance = super().update(instance, validated_data)
        return instance


class RetrieveSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(source='photo_sets', many=True, read_only=True)
    style_photos = StylePhotoSerializer(source='style_photo_sets', many=True, read_only=True)
    category = CategorySerializer(source='category_id')
    locationSet = LocationSetSerializer(source='location_sets', many=True)
    review = ReviewSerializer(source='review_target', many=True, read_only=True)

    class Meta:
        model = Item
        fields = '__all__'
