from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response

from ..serializers import UserEditSerializer

User = get_user_model()

class UserEditAPIView(APIView):
    def get(self, request):
        qs = User.objects.filter(id = request.user.id)
        serializer = UserEditSerializer(qs, many = True)
    
        return Response(serializer.data)
    
    def put(self, request):
        detail = User.objects.filter(email=request.user.email)
        #serializer = UserEditSerializer(data=)
        
        return Response(serializer.data)
        
    
    def delete(self, request):
        pass