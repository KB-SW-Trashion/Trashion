import requests
import os
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google import views as google_view
from allauth.socialaccount.providers.kakao import views as kakao_view
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.models import SocialAccount
import asyncio

User = get_user_model()

BASE_URL = 'http://localhost:8000/'
GOOGLE_CALLBACK_URI = BASE_URL + 'accounts/google/callback/'
KAKAO_CALLBACK_URI = BASE_URL + 'accounts/kakao/callback/'
NAVER_CALLBACK_URI = BASE_URL + 'accounts/naver/callback/'

state = os.environ.get('STATE')

@api_view(['POST'])
def update_user_info(request):
    nickname =request.data['name']
    social_profile =request.data['social_profile']
    user = request.user

    user.nickname = 'google:'+nickname
    user.social_profile = social_profile
    user.save(update_fields = ['email','nickname', 'social_profile'])
    return Response(status=status.HTTP_200_OK)

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

def request_post(data):
    rep = requests.post(data[0],data[1])
    return rep
async def get_async_request(url,data):
    params = [url,data]
    loop = asyncio.get_event_loop() 
    response = await loop.run_in_executor(None, request_post, params)
    return response


#Kakao
# class KaKaoAdapter(kakao_view.KakaoOAuth2Adapter):

#     def complete_login(self, request, app, token, **kwargs):
#         headers = {"Authorization": "Bearer {0}".format(token.token)}
#         resp = requests.get(self.profile_url, headers=headers)
#         resp.raise_for_status()
#         extra_data = resp.json()
#         kakao_account = profile_json.get('kakao_account')
#         email = kakao_account.get('email')
#         profile = kakao_account.get("profile")
#         nickname = profile.get("nickname")
#         profile_image = profile.get("profile_image_url")   # 사이즈 'thumbnail_image_url' < 'profile_image_url'
#         try:
#             user = User.objects.get(email=email)
#             # 기존에 가입된 유저의 Provider가 kakao가 아니면 에러 발생, 맞으면 로그인
#             # 다른 SNS로 가입된 유저
#             social_user = SocialAccount.objects.get(user=user)
#             User.objects.filter(email=email).update(nickname=nickname,
#                                               email=email,
#                                               social_profile=profile_image
#                                               )
#             print("process6")
#             return Response(accept_json)
#         except User.DoesNotExist:
#             User.objects.filter(email=email).update(nickname=nickname,                                 
#                                              social_profile=profile_image                             
#                                              )
#             print("process9")
#             return Response(accept_json)
        
        
        # return self.get_provider().sociallogin_from_response(request, extra_data)

class KakaoLogin(SocialLoginView):
    adapter_class = kakao_view.KakaoOAuth2Adapter
    client_class = OAuth2Client
    callback_url = KAKAO_CALLBACK_URI

    # def process_login(self):

    #     get_adapter(self.request).login(self.request, self.user)

class KakaoAuth(APIView):
    def post(self,request):
        access_token = self.request.data["access_token"]
        code =self.request.data['code']
        """
        Email Request
        """
        print("process1")
        profile_request = requests.get(
            "https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
        print("process2")
        profile_json = profile_request.json()
        kakao_account = profile_json.get('kakao_account')
    
        email = kakao_account.get('email')
        profile = kakao_account.get("profile")
        nickname = profile.get("nickname")
        profile_image = profile.get("profile_image_url")   # 사이즈 'thumbnail_image_url' < 'profile_image_url'
        print("process3")
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
            print("process4")
            data = {'access_token': access_token, 'code': code}
            # print("data",data)
            loop = asyncio.new_event_loop()
            # asyncio.set_event_loop(loop)
            # accept = loop.run_until_complete(get_async_request(f"{BASE_URL}accounts/kakao/login/allauth/",data))
            # accept = requests.post(
            #     f"{BASE_URL}accounts/kakao/login/allauth/", data=data)
            accept = KakaoLogin.as_view()(self.request)
            print("process5")
            # accept_status = accept.status_code
            if accept_status != 200:
                return Response({'err_msg': 'failed to signin'}, status=accept_status)
            accept_json = accept.json()
            User.objects.filter(email=email).update(nickname=nickname,
                                              email=email,
                                              social_profile=profile_image
                                              )
            print("process6")
            return Response(accept_json)
        except User.DoesNotExist:
            # 기존에 가입된 유저가 없으면 새로 가입
            data = {'access_token': access_token, 'code': code}
            # accept = requests.post(
            #     f"{BASE_URL}accounts/kakao/login/allauth/", data=data)
            accept = KakaoLogin.as_view()(self.request)
            print("process7")
            accept_status = accept.status_code
            if accept_status != 200:
                return Response({'err_msg': 'failed to signup'}, status=accept_status)
            # user의 pk, email, first name, last name과 Access Token, Refresh token 가져옴
            #카카오에서 전화번호, 주소 받으려면 사업자 등록 해야됨.
            print("process8")
            accept_json = accept.json()
            User.objects.filter(email=email).update(nickname=nickname,                                 
                                             social_profile=profile_image                             
                                             )
            print("process9")
            return Response(accept_json)


# @api_view(['POST'])    
# def authenticate_kakao(request):

    



    # def post(self, request, *args, **kwargs):
    #     print("시발",request)
    #     self.request = request
    #     self.serializer = self.get_serializer(data=self.request.data)
    #     self.serializer.is_valid(raise_exception=True)

    #     self.login()
    #     return self.get_response()