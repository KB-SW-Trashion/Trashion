from django.urls import path
from .views import get_send_chat_list,get_item_chat_list,create_chat_room

urlpatterns = [
    path('get_send_chat_list/',get_send_chat_list), #팔로우 기능
    path('get_item_chat_list/', get_item_chat_list),
    path('create_chat_room/', create_chat_room), 
]
