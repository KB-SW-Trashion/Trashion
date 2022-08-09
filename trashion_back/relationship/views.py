import json
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Follow

User = get_user_model()


#팔로우 버튼 누르면 링크 실행 -> 함수 실행
#유저정보(email)로 해당 유저가 DB에 있는지 검사
@api_view(['GET'])
def follow(request, id):
    follower_user = request.user
    followed_user = User.objects.get(id=id)
    follow = Follow.objects.filter(follower_id = follower_user.id, followed_id = followed_user.id)

    if follow:
        follow[0].delete()
        message = 'Unfollowing'
    else:
        Follow.objects.create(
            follower_id = follower_user,
            followed_id = followed_user
        )
        message = 'Following'
    return JsonResponse({'message':message}, status=200)