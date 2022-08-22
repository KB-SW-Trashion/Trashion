from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from item_post.models import StylePhoto
from ..models import StyleLike

User = get_user_model()

@api_view(['POST'])
def like(request): #request에 좋아요 할 대상 id 담아서 넘기기
    like_user = request.user
    
    style_id = request.data['style_id']
    item = StylePhoto.objects.get(pk=style_id)
    
    is_like = StyleLike.objects.filter(user = like_user.id, likeStyle = item.id)
    
    if is_like:
        is_like[0].delete()
        message = 'Dislike'
    else:
        StyleLike.objects.create(
            user = like_user,
            likeStyle = item
        )
        message = 'Like'
    return Response({'message':message}, status.HTTP_204_NO_CONTENT)