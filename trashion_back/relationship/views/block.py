from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Block

User = get_user_model()

@api_view(['POST'])
def block(request): #requset에 팔로우할 대상 email 담아서 넘기기
    user = request.user

    email = request.data['email']
    blocked_user = User.objects.get(email=email)
    
    is_block = Block.objects.filter(user = user.id, blocked_user = blocked_user.id)

    if is_block:
        is_block[0].delete()
        message = 'UnBlocking'
    else:
        Block.objects.create(
            user = user,
            blocked_user = blocked_user
        )
        message = 'Blocking'
    return Response({'message':message}, status.HTTP_204_NO_CONTENT)