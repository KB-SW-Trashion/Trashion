from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from item_post.models import StylePhoto
from ..models import StyleLike
from ..serializers import LikeStyleSerializer

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

@api_view(['GET'])
def user_like(request): #요청 보낸 유저가 좋아요 누른 스타일 목록 보기
    qs = StyleLike.objects.filter(user = request.user.id)
    serializer = LikeStyleSerializer(qs, many = True)

    return Response(serializer.data)

@api_view(['GET'])
def liked_style(request): #스타일에 좋아요 누른 유저 목록 보기
    style_id = request.GET['style_id'] #리퀘스트에 style_id 담아서 전송
    item = StylePhoto.objects.get(id = style_id)
    qs = StyleLike.objects.filter(likeStyle = item) 
    serializers = LikeStyleSerializer(qs, many = True)
    
    return Response(serializers.data)