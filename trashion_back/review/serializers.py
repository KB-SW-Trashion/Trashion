from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import *

User = get_user_model()

class ReviewSerializer(serializers.ModelSerializer):
    reviewer = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'target', 'satisfied', 'review']
        
    def get_reviewer(self, obj):
        return obj.reviewer.nickname
    
    def get_target(self, obj):
        return obj.target.user_id.id