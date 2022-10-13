from socket import MsgFlag
from apps.accounts.views import content
from .models import Message
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth import get_user_model
from .serializer import MessageSerializer
User = get_user_model()
from datetime import datetime

@api_view(['POST'])
def getMessage(request):
    try:
        msg_from = request.user
        msg_to = User.objects.get(id = request.data['to'])
        message = Message.objects.filter(msg_from = msg_from,msg_to=msg_to).order_by('date') | Message.objects.filter(msg_from = msg_to,msg_to=msg_from).order_by('date')
        # print(message)
        data = []
        for i in message:
            # print(i.id)
            newmsg = Message.objects.get(id= i.id)
            serializer = MessageSerializer(newmsg)
            data.append(serializer.data)                
        return content(False,"","",data)
    except Exception as e:
        return content(True,str(e),"Error occured in getting user chat details")

@api_view(['POST'])
def sendMessage(request):
    try:
        to = User.objects.get(id = request.data['to'])
        msg_from = request.user
        message = Message.objects.create(message = request.data['message'],msg_from=msg_from,msg_to=to)
        message.save()
        data = Message.objects.filter(msg_from=msg_from,msg_to=to).last()
        serializer = MessageSerializer(data)
        return content(False,"","",serializer.data)
    except Exception as e:
        return content(True,str(e),"Error occured in sending message")
@api_view(['DELETE'])
def deleteMessage(request):
    try:
        msg_id = request.data['id']
        message = Message.objects.get(id = msg_id)
        message.delete()
        return content(False,"Message deleted successfully!!","")
    except Exception as e:
        return content(True,str(e),"Error occured in deleting message")
