from django.urls import path
from .views import follow, like

urlpatterns = [
    path('follow/', follow.follow, name = 'follow'), #팔로우 기능
    path('following/', follow.following, name = 'followingList'), #내가 팔로우 한 유저 목록
    path('follower/', follow.follower, name = 'followerList'), #나를 팔로우 한 유저 목록
    
    path('like/', like.like, name="like"),
    path('userlike/', like.user_like, name='user_like'), #유저가 찜한 아이템 목록
    path('likeditem/', like.liked_item, name='likeed_item'), #아이템을 찜한 유저 목록
]
