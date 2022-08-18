from imp import source_from_cache
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import *

User = get_user_model()

class FollowSerializer(serializers.ModelSerializer):
    follower_user = serializers.ReadOnlyField(source='follower.nickname')
    followed_user = serializers.ReadOnlyField(source='followed.nickname')
    class Meta:
        model = Follow
        fields = [
            'follower',
            'follower_user',
            'followed',
            'followed_user',
        ]
        
class LikeSerializer(serializers.ModelSerializer):
    like_user = serializers.ReadOnlyField(source='likeuser.nickname')
    liked_item_description = serializers.ReadOnlyField(source='likeitem.description')
    class Meta:
        model = Like
        fields = [
            'likeuser',
            'like_user',
            'likeitem',
            'liked_item_description',
        ]
        
class LikeStyleSerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='user.nickname')
    item = serializers.ReadOnlyField(source='likeStyle.item_id.description')
    
    class Meta:
        model = StyleLike
        fields = [
            'pk',
            'user',
            'nickname',
            'likeStyle',
            'item'          
        ]