import json
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from item_post.models import Item
from relationship.models import Like

from .models import *
from item_post.serializers import ItemSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'realname', 'nickname', 'social_profile']
        
class CustomTokenRefreshSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh_token'])
        data = {'access_token': str(refresh.access_token)}

        return data


class SignUpSerializer(RegisterSerializer):
    username = None
    nickname = serializers.CharField()
    def get_cleaned_data(self):
        return {
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'nickname': self.validated_data.get('nickname', ''),
        }
        
class FollowingListingField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{value.followed.nickname}'

class FollowerListingField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{value.follower.nickname}'
                
class BlockUserListingField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{value.blocked_user.nickname}'        
        
class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields =  ['photo']
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['introduce', 'height', 'weight', 'top_size', 'bottom_size']        

class ItemSerializer(ItemSerializer):
    class Meta:
        ref_name = "Account"
        model = Item
        fields = ['id', 'review']

class UserDetailSerializer(serializers.ModelSerializer):
    following = FollowingListingField(many=True, read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)
    follower = FollowerListingField(many=True, read_only=True)
    follower_count = serializers.IntegerField(source='follower.count', read_only=True)
    
    like_item_count = serializers.IntegerField(source='likeitem_sets.count', read_only=True)

    blocked_user = BlockUserListingField(many=True, read_only=True)
    
    profile = ProfileSerializer(partial=True)
    profile_image = ProfileImageSerializer()
    item_sets = ItemSerializer(many=True, read_only=True)
    
    id = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    realname = serializers.ReadOnlyField()
    social_profile = serializers.ReadOnlyField()
    sold_out_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'realname', 'nickname', 'social_profile', 'following_count', 'following', 'follower_count', 'follower', 'like_item_count', 'blocked_user', 'profile', 'profile_image', 'item_sets', 'sold_out_count']
    
    def update(self, instance, validated_data):
        images_data = self.context['request'].FILES
        if(images_data):
            ProfileImage.objects.filter(user=instance).delete()
            for photo in images_data.getlist('profile_image'):
                ProfileImage.objects.create(user=instance, photo=photo)
            
        instance.nickname = self.context['request'].data.get('nickname')
        instance.save()
        
        profile_data = json.loads(self.context['request'].data.get('profile'))
        if(profile_data.get('profile_image')):
            profile_data.pop('profile_image')
        profile = instance.profile

        for k, v in profile_data.items():
            setattr(profile, k, v)
        profile.save()
        
        return instance
    
    def get_sold_out_count(self, obj):
        return len(obj.item_sets.filter(sold_out=True))