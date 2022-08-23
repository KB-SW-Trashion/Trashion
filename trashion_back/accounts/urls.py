from django.urls import path
from accounts import views
from .views import login, user_edit
urlpatterns = [
  
    path('google/authenticate/', login.authenticate_google, name='google_callback'),  
    path('google/login/finish/', login.GoogleLogin.as_view(), name='google_login_todjango'),
  
    path('kakao/authenticate/', login.authenticate_kakao),
    path('kakao/login/allauth/', login.KakaoLogin.as_view()),

    path('naver/login/', login.naver_login, name='naver_login'),
    path('naver/callback/', login.naver_callback, name='naver_callback'),
    path('naver/login/finish/', login.NaverLogin.as_view(),
         name='naver_login_todjango'),
    
    path('detail/<str:email>', user_edit.UserDetailAPIView.as_view(), name='user_detail')
]
