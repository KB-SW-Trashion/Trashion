from django.urls import path
from accounts import views
urlpatterns = [
  
    path('google/authenticate/', views.authenticate_google,      name='google_callback'),  
    path('google/login/finish/', views.GoogleLogin.as_view(), name='google_login_todjango'),
  
    path('kakao/authenticate/', views.authenticate_kakao),
    path('kakao/login/allauth/', views.KakaoLogin.as_view()),
]