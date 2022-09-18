from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from item_post.models import Item
from .models import *
from .serializers import *
# Create your views here.

#내가 구매자로 있는 톡방
@api_view(['GET'])
def get_send_chat_list(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_401_UNAUTHORIZED)        
    rooms = user.chat_rooms.all()
    serializer = CustomerRoomSerializer(rooms,many=True)
    return Response(serializer.data,status= status.HTTP_200_OK)
    
#내가 판매하고 있는 톡방
@api_view(['GET'])
def get_item_chat_list(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_401_UNAUTHORIZED)       
    l = []
    for item in user.item_sets.filter(sold_out=False):
        for room in item.chat_rooms.all():
            l.append(room)
    serializer = SellerRoomSerializer(l,many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_chat_room(request):
    user = request.user
    if not user.is_authenticated:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    item = Item.objects.get(pk=request.data['item_id'])
    room = Room()
    room = room.make_code(item=item,user=user)
    room.save()
    rooms = user.chat_rooms.all()
    serializer = CustomerRoomSerializer(rooms, many= True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


