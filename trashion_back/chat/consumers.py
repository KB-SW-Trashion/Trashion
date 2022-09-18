# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *
class ChatConsumer(WebsocketConsumer):
    # websocket 연결
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def fetch_messages(self, data):
        # room_id = int(self.room_name)
        room_id = data['room_id']
        messages = Message.objects.filter(room_id=room_id)
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    def new_message(self, data):
        user = User.objects.get(id=data['user_id'])
        room = Room.objects.get(id=data['room_id'])
        message_creat = Message.objects.create(
            user=user,
            room=room,
            text=data['message']
        )
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message_creat)
        }
        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'user_id': message.user.id,
            'message': message.text,
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }
    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message
            }
        )
    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))

  