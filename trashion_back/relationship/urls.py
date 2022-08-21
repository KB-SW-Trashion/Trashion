from django.urls import path
from .views import follow, like, stylelike

urlpatterns = [
    path('follow/', follow.follow, name = 'follow'), #팔로우 기능
    path('like/', like.like, name="like"),
    path('stylelike/', stylelike.like, name="stylelike"),
]
