from dataclasses import field
from rest_framework import serializers
from .models import *


class CustomerRoomSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='item.user_id.nickname')
    last_date = serializers.ReadOnlyField(source='last_time')
    user_img = serializers.ReadOnlyField(source='seller_profile')
    class Meta:
        model = Room
        fields = '__all__'

class SellerRoomSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.nickname')
    last_date = serializers.ReadOnlyField(source='last_time')
    user_img = serializers.ReadOnlyField(source='user_profile')
    class Meta:
        model = Room
        fields = '__all__'