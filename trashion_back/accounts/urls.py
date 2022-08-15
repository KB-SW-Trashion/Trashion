from django.urls import path
from accounts import views

urlpatterns = [
  
    path('google/authenticate/', views.authenticate_google, name='google_callback'),  
    path('google/login/finish/', views.GoogleLogin.as_view(), name='google_login_todjango'),
  
    path('kakao/authenticate/', views.authenticate_kakao),
    path('kakao/login/allauth/', views.KakaoLogin.as_view()),

    path('naver/login/', views.naver_login, name='naver_login'),
    path('naver/callback/', views.naver_callback, name='naver_callback'),
    path('naver/login/finish/', views.NaverLogin.as_view(),
         name='naver_login_todjango'),
]
