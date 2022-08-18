from django.contrib.auth import get_user_model
from rest_framework import generics

from ..serializers import UserEditSerializer

User = get_user_model()

class UserEditAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer
    