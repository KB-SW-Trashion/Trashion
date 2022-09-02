from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'realname', 'nickname', 'address', 'phone','social_profile']
        
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

class ItemListingField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{value.likeitem}'     
        
class BlockUserListingField(serializers.RelatedField):
    def to_representation(self, value):
        return f'{value.blocked_user.nickname}'        
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['introduce', 'height', 'weight', 'top_size', 'bottom_size']        
        
class UserDetailSerializer(serializers.ModelSerializer):
    following = FollowingListingField(many=True, read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)
    follower = FollowerListingField(many=True, read_only=True)
    follower_count = serializers.IntegerField(source='follower.count', read_only=True)
    
    likeitem_sets = ItemListingField(many=True, read_only=True)
    like_item_count = serializers.IntegerField(source='likeitem_sets.count', read_only=True)

    blocked_user = BlockUserListingField(many=True, read_only=True)
    
    profile = ProfileSerializer(partial=True)
    
    id = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()
    realname = serializers.ReadOnlyField()
    
    
    class Meta:
        model = User
        fields = ['id', 'email', 'realname', 'nickname', 'address', 'phone', 'social_profile', 'following_count', 'following', 'follower_count', 'follower', 'like_item_count', 'likeitem_sets', 'blocked_user', 'profile']
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile
        for k, v in profile_data.items():
            setattr(profile, k, v)
        profile.save()
        
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.save()
        return instance