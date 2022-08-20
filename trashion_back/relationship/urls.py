from django.urls import path
from .views import follow, like, stylelike

urlpatterns = [
    path('follow/', follow.follow, name = 'follow'), #팔로우 기능
    
    path('like/', like.like, name="like"),
    path('userlike/', like.user_like, name='user_like'), #유저가 찜한 아이템 목록
    path('likeditem/', like.liked_item, name='liked_item'), #아이템을 찜한 유저 목록
    
    path('stylelike/', stylelike.like, name="stylelike"),
    path('stylelikeuser/', stylelike.user_like, name='user_like'), #유저가 찜한 아이템 목록
    path('likedstyle/', stylelike.liked_style, name='liked_style'), #아이템을 찜한 유저 목록
]
