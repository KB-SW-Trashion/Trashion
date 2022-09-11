import requests
import os
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount


User = get_user_model()

BASE_URL = 'http://localhost:8000/'
GOOGLE_CALLBACK_URI = BASE_URL + 'accounts/google/callback/'
KAKAO_CALLBACK_URI = BASE_URL + 'accounts/kakao/callback/'
NAVER_CALLBACK_URI = BASE_URL + 'accounts/naver/callback/'

state = os.environ.get('STATE')

@api_view(['POST'])
def authenticate_google(request):
    code = request.data['code']
    access_token = request.data['access_token']
    email = request.data['access_token']
    profile_image = request.data['profile_image']
    name = request.data['name']
    try:
        user = User.objects.get(email=email)
        # 기존에 가입된 유저의 Provider가 google이 아니면 에러 발생, 맞으면 로그인
        # 다른 SNS로 가입된 유저
        social_user = SocialAccount.objects.get(user=user)
        if social_user is None:
            return Response({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'google':
            return Response({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        # 기존에 Google로 가입된 유저
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/google/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return Response({'err_msg': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        User.objects.filter(email=email).update(nickname=name,
            email=email,
            social_profile = profile_image
        )
        return Response(accept_json)
    except User.DoesNotExist:
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/google/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return Response({'err_msg': 'failed to signup'}, status=accept_status)
        accept_json = accept.json()
        User.objects.filter(email=email).update(nickname=name,
            email=email,
            social_profile=profile_image
        )
        return Response(accept_json)

class GoogleLogin(SocialLoginView):
    adapter_class = google_view.GoogleOAuth2Adapter
    client_class = OAuth2Client

#Kakao

@api_view(['POST'])    
def authenticate_kakao(request):

    access_token = request.data["access_token"]
    code =request.data['code']
    """
    Email Request
    """
    profile_request = requests.get(
        "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
    profile_json = profile_request.json()
    kakao_account = profile_json.get('kakao_account')

    email = kakao_account.get('email')
    profile = kakao_account.get("profile")
    nickname = profile.get("nickname")
    profile_image = profile.get("profile_image_url")   # 사이즈 'thumbnail_image_url' < 'profile_image_url'

    """
    Signup or Signin Request
    """
    try:
        user = User.objects.get(email=email)
        # 기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인
        # 다른 SNS로 가입된 유저
        social_user = SocialAccount.objects.get(user=user)
        if social_user is None:
            return Response({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'kakao':
            return Response({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        # 기존에 Google로 가입된 유저
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/kakao/login/allauth/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return Response({'err_msg': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        User.objects.filter(email=email).update(nickname=nickname,
                                          email=email,
                                          social_profile=profile_image
                                          )
        return Response(accept_json)
    except User.DoesNotExist:
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/kakao/login/allauth/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return Response({'err_msg': 'failed to signup'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        #카카오에서 전화번호, 주소 받으려면 사업자 등록 해야됨.
        accept_json = accept.json()
        User.objects.filter(email=email).update(nickname=nickname,                                 
                                         social_profile=profile_image                             
                                         )
        return Response(accept_json)

class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    client_class = OAuth2Client
    callback_url = KAKAO_CALLBACK_URI
