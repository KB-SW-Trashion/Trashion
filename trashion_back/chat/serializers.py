from dataclasses import field
from rest_framework import serializers
from .models import *


class CustomerRoomSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='item.user_id.nickname')
    last_date = serializers.ReadOnlyField(source='last_time')
    user_img = serializers.ImageField(source='seller_profile',read_only= True,use_url=True)
    last_message = serializers.ReadOnlyField(source='get_last_message')
    class Meta:
        model = Room
        fields = '__all__'

class SellerRoomSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.nickname')
    last_date = serializers.ReadOnlyField(source='last_time')
    user_img = serializers.ImageField(source='user_profile',read_only= True,use_url=True)
    last_message = serializers.ReadOnlyField(source='get_last_message')
    class Meta:
        model = Room
        fields = '__all__'