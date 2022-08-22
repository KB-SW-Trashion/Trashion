from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from item_post.models import Item
from ..models import Like

User = get_user_model()

@api_view(['POST'])
def like(request): #request에 좋아요 할 대상 id 담아서 넘기기
    like_user = request.user
    
    item_id = request.data['item_id']
    item = Item.objects.get(pk=item_id)
    
    is_like = Like.objects.filter(likeuser = like_user.id, likeitem = item.id)
    
    if is_like:
        is_like[0].delete()
        message = 'Dislike'
    else:
        Like.objects.create(
            likeuser = like_user,
            likeitem = item
        )
        message = 'Like'
    return Response({'message':message}, status.HTTP_204_NO_CONTENT)