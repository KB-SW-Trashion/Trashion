from django.urls import path, include
from relationship import views

urlpatterns = [
    path('follow/', views.FollowAPIView.as_view()),
    path('unfollow/<int:pk>', views.UnFollowAPIView.as_view()),
    path('like/', views.LikeAPIView.as_view()),
    path('unlike/<int:pk>', views.UnLikeAPIView.as_view()),
    #path('follows/<int:id>', views.follow, name="follow"),
]
