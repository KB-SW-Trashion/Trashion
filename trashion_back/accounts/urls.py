from django.urls import path, re_path
from dj_rest_auth.registration.views import VerifyEmailView
from .views import login, user_edit
from .views.email_verification import ConfirmEmailView

urlpatterns = [
    path('google/authenticate/', login.authenticate_google, name='google_callback'),  
    path('google/login/finish/', login.GoogleLogin.as_view(), name='google_login_todjango'),
  
    path('kakao/authenticate/', login.authenticate_kakao),
    path('kakao/login/allauth/', login.KakaoLogin.as_view()),

    # path('naver/login/', login.naver_login, name='naver_login'),
    # path('naver/callback/', login.naver_callback, name='naver_callback'),
    # path('naver/login/finish/', login.NaverLogin.as_view(), name='naver_login_todjango'),
    
    path('detail/<str:pk>', user_edit.UserDetailAPIView.as_view(), name='user_detail'),
    # 유효한 이메일이 유저에게 전달
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # 유저가 클릭한 이메일(=링크) 확인
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', ConfirmEmailView.as_view(), name='account_confirm_email'),
]
