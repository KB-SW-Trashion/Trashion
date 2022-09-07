from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import *

User = get_user_model()

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'target', 'satisfied', 'review']