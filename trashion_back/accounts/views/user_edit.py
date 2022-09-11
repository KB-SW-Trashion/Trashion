from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

from ..serializers import UserDetailSerializer
User = get_user_model()

class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    parser_classes = (MultiPartParser, FormParser)
    