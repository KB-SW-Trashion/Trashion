from django.urls import path, include
from relationship import views

urlpatterns = [
    path('follow/', views.FollowAPIView.as_view()),
    path('like/', views.LikeAPIView.as_view(), name="like")
]
