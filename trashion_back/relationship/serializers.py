from pyexpat import model
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Follow, Like

User = get_user_model()

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'
        
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'