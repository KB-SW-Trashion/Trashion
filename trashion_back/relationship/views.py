from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from item_post.models import Item
from .models import Follow, Like
from .serializers import FollowSerializer, LikeSerializer

User = get_user_model()

class FollowAPIView(APIView):
    def get(self, request): #요청 보낸 유저의 팔로우 목록 보기
        qs = Follow.objects.filter(follower_id = request.user.id)
        serializer = FollowSerializer(qs, many = True)
    
        return Response(serializer.data)
    
    def post(self, request): #requset에 팔로우할 대상 email 담아서 넘기기
        follower_user = request.user
    
        email = request.data['email']
        followed_user = User.objects.get(email=email)
        
        is_follow = Follow.objects.filter(follower_id = follower_user.id, followed_id = followed_user.id)

        if is_follow:
            is_follow[0].delete()
            message = 'Unfollowing'
        else:
            Follow.objects.create(
                follower_id = follower_user,
                followed_id = followed_user
            )
            message = 'Following'
        return Response({'message':message}, status.HTTP_204_NO_CONTENT)

class LikeAPIView(APIView):
    def get(self, request): #요청 보낸 유저의 좋아요(찜) 목록 보기
        qs = Like.objects.filter(like_user_id = request.user.id)
        serializer = LikeSerializer(qs, many = True)
    
        return Response(serializer.data)
    
    def post(self, request): #request에 좋아요 할 대상 id 담아서 넘기기
        like_user = request.user
        
        item_id = request.data['id']
        item = Item.objects.get(pk=item_id)
        
        is_like = Like.objects.filter(like_user_id = like_user.id, like_item_id = item.id)
        
        if is_like:
            is_like[0].delete()
            message = 'Dislike'
        else:
            Like.objects.create(
                like_user_id = like_user,
                like_item_id = item
            )
            message = 'Like'
        return Response({'message':message}, status.HTTP_204_NO_CONTENT)