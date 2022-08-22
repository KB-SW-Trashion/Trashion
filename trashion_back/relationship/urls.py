from django.urls import path
from .views import follow, like

urlpatterns = [
    path('follow/', follow.follow, name = 'follow'), #팔로우 기능
    path('like/', like.like, name="like"),
]
