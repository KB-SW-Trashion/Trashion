from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from .serializers import *
from django.contrib.auth import get_user_model

User = get_user_model()


class ItemListAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = ItemSerializer


class ItemDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ItemSerializer


