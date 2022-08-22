from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Follow

User = get_user_model()

@api_view(['POST'])
def follow(request): #requset에 팔로우할 대상 email 담아서 넘기기
    follower_user = request.user

    email = request.data['email']
    print(request.data)
    followed_user = User.objects.get(email=email)
    
    is_follow = Follow.objects.filter(follower = follower_user.id, followed = followed_user.id)

    if is_follow:
        is_follow[0].delete()
        message = 'Unfollowing'
    else:
        Follow.objects.create(
            follower = follower_user,
            followed = followed_user
        )
        message = 'Following'
    return Response({'message':message}, status.HTTP_204_NO_CONTENT)