from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Follow, Like
from .serializers import FollowSerializer, LikeSerializer

User = get_user_model()

class FollowAPIView(generics.ListCreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    
class UnFollowAPIView(generics.RetrieveDestroyAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer

class LikeAPIView(generics.ListCreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    
class UnLikeAPIView(generics.RetrieveDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

"""
@api_view(['GET'])
def follow(request, id):
    follower_user = request.user
    followed_user = User.objects.get(id=id) #팔로우할 사람의 id
    follow = Follow.objects.filter(follower_id = follower_user.id, followed_id = followed_user.id)

    if follow:
        follow[0].delete()
        message = 'Unfollowing'
    else:
        Follow.objects.create(
            follower_id = follower_user,
            followed_id = followed_user
        )
        message = 'Following'
    return Response({'message':message}, status.HTTP_204_NO_CONTENT) 
    """