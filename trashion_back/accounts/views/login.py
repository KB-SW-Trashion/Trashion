import requests
import os
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from json.decoder import JSONDecodeError
from rest_framework import status
from rest_framework.response import Response
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.naver import views as naver_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount


User = get_user_model()
from ..models import Profile

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
        User.objects.filter(email=email).update(realname=name,
                                          email=email,
                                          social_profile = profile_image
                                          )
        # accept_json.pop('user', None)
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
        # accept_json.pop('user', None)
        User.objects.filter(email=email).update(realname=name,
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


    print("?",request.data)
    access_token = request.data["access_token"]
    code =request.data['code']
    """
    Email Request
    """
    profile_request = requests.get(
        "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
    profile_json = profile_request.json()
    kakao_account = profile_json.get('kakao_account')

    print(kakao_account)
    email = kakao_account.get('email')
    profile = kakao_account.get("profile")
    nickname = profile.get("nickname")
    profile_image = profile.get("thumbnail_image_url")   # 사이즈 'thumbnail_image_url' < 'profile_image_url'
    print('image', profile_image)

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
        # accept_json.pop('user', None)
        print("accept_json이뭐여",accept_json)
        User.objects.filter(email=email).update(realname=nickname,
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
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        #카카오에서 전화번호, 주소 받으려면 사업자 등록 해야됨.
        accept_json = accept.json()
        # accept_json.pop('user', None)
        User.objects.filter(email=email).update(realname=nickname,                                 
                                         social_profile=profile_image                             
                                         )
        return Response(accept_json)

class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    client_class = OAuth2Client
    callback_url = KAKAO_CALLBACK_URI


def naver_login(request):
    """
    Code Request
    """
    client_id = os.environ.get("SOCIAL_AUTH_NAVER_CLIENT_ID")
    return redirect(f"https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={client_id}&redirect_uri={NAVER_CALLBACK_URI}&state={state}")

def naver_callback(request):
    client_id = os.environ.get('SOCIAL_AUTH_NAVER_CLIENT_ID')
    clientSecret = os.environ.get('SOCIAL_AUTH_NAVER_SECRET')
    code = request.GET.get("code")
    redirect_uri = NAVER_CALLBACK_URI
    """
    Access Token Request
    """
    token_req = requests.get(
        f"https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={clientSecret}&redirect_uri={redirect_uri}&code={code}&state={state}")
    token_req_json = token_req.json()
    error = token_req_json.get("error")
    if error is not None:
        raise JSONDecodeError(error)
    access_token = token_req_json.get("access_token")
    """
    Email Request
    """
    profile_request = requests.get(
        "https://openapi.naver.com/v1/nid/me", headers={"Authorization": f"Bearer {access_token}"})
    profile_json = profile_request.json()
    naver_account = profile_json.get('response')
    """
    naver_account에서 이메일 외에
    네이버 프로필 이미지, 배경 이미지 url 가져올 수 있음
    print(naver_account) 참고
    """
    email = naver_account.get('email')
    realname = naver_account.get('name')
    phone = naver_account.get('mobile')
    nickname = naver_account.get('nickname')
    profile_image = naver_account.get('profile_image')
    """
    Signup or Signin Request
    """
    try:
        user = User.objects.get(email=email)
        # 기존에 가입된 유저의 Provider가 naver가 아니면 에러 발생, 맞으면 로그인
        # 다른 SNS로 가입된 유저
        social_user = SocialAccount.objects.get(user=user)
        if social_user is None:
            return JsonResponse({'err_msg': 'email exists but not social user'}, status=status.HTTP_400_BAD_REQUEST)
        if social_user.provider != 'naver':
            return JsonResponse({'err_msg': 'no matching social type'}, status=status.HTTP_400_BAD_REQUEST)
        # 기존에 Naver로 가입된 유저
        data = {'access_token': access_token, 'code': code}
        accept = requests.post(
            f"{BASE_URL}accounts/naver/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signin'}, status=accept_status)
        accept_json = accept.json()
        accept_json.pop('user', None)
        User.objects.filter(email=email).update(
            realname = realname,
            nickname = nickname,
            phone = phone,
        )

        user = User.objects.get(email=email)
        Profile.objects.filter(username=email).update(
            user = user,
            username = email,
            profile_image = profile_image
        )
            
        return JsonResponse(accept_json)
    except User.DoesNotExist:
        # 기존에 가입된 유저가 없으면 새로 가입
        data = {'access_token': access_token, 'code': code}
        print(data)
        accept = requests.post(
            f"{BASE_URL}accounts/naver/login/finish/", data=data)
        accept_status = accept.status_code
        if accept_status != 200:
            return JsonResponse({'err_msg': 'failed to signup'}, status=accept_status)
        # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
        User.objects.filter(email=email).update(
            realname = realname,
            nickname = nickname,
            phone = phone
        )
        
        user = User.objects.get(email=email)

        Profile.objects.create(
            user = user,
            username = email,
            profile_image = profile_image
        )
        accept_json = accept.json()
        accept_json.pop('user', None)
        return JsonResponse(accept_json)
    
class NaverLogin(SocialLoginView):
    adapter_class = naver_view.NaverOAuth2Adapter
    client_class = OAuth2Client
    callback_url = NAVER_CALLBACK_URI
