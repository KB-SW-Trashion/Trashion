from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Follow, Like

User = get_user_model()

class FollowSerializer(serializers.ModelSerializer):
        
    follower_user = serializers.ReadOnlyField(source='follower_id.email')
    followed_user = serializers.ReadOnlyField(source='followed_id.email')
    
    class Meta:
        model = Follow
        fields = [
            'follower_id',
            'follower_user',
            'followed_id',
            'followed_user',
        ]
        
class LikeSerializer(serializers.ModelSerializer):
    like_user = serializers.ReadOnlyField(source='like_user_id.email')
    liked_item_description = serializers.ReadOnlyField(source='like_item_id.description')
    class Meta:
        model = Like
        fields = [
            'like_user_id',
            'like_user',
            'like_item_id',
            'liked_item_description',
        ]