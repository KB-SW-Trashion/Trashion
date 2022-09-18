from operator import mod
from statistics import mode
from django.db import models
from django.contrib.auth import get_user_model
from item_post.models import Item
User = get_user_model()

# Create your models here.

import random, string

class Room(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='chat_rooms')
    item = models.ForeignKey(Item,on_delete=models.CASCADE, related_name='chat_rooms')
    code = models.CharField(max_length=15)

    #code  hash
    def make_code(self, user,item):
        self.user = user
        self.item = item
        length_of_string = 8
        self.code =  str(user.id)+''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length_of_string)) + str(item.id)
        return self
    def last_time(self):
        last = self.messages.last()
        if last:
          date = last.created_at
        else:
          date = ""
        return date
    def user_profile(self):
        user = self.user
        if user.social_profile:
            return user.social_profile
        else:
            try:
                return user.profile_image.photo.url
            except:
                return ''

    def seller_profile(self):
        user = self.item.user_id
        if user.social_profile:
            return user.social_profile
        else:
            try:
                return user.profile_image.photo.url
            except:
                return ''
    def get_last_message(self):
        message = self.messages.last()
        if message:
            return messasge.text
        else:
            return '채팅을 걸어보세요'

class Message(models.Model):
    text = models.TextField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages',null=True)
    created_at = models.DateTimeField(auto_now_add=True)
