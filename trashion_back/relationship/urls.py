from django.urls import path
from .views import follow, like, block

urlpatterns = [
    path('follow/', follow.follow, name = 'follow'), #팔로우 기능
    path('like/', like.like, name="like"),
    path('block/', block.block, name="block"),
]
