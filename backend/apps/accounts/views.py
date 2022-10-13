from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth import get_user_model
from apps.accounts.models import Friend
from .serializers import UserSerializer,FriendSerializer
User = get_user_model()


def content(error,message,extraMessage,data=[]):
    return Response({"error":error,"message":message,"additionalMessage":extraMessage,"data":data});

@api_view(['POST'])
def getFriend(request):
    try:
        username= request.data['user']
        friend = User.objects.get(username = username)
        serializer = UserSerializer(friend,context={"request": request})
        return content(False,"","",serializer.data)
    except Exception as e:
        return content(True,str(e),"Error occurred in getting friend data ")

@api_view(['GET'])
def getFriends(request):
    try:
        user =request.user.friends.values()
        friends = []
        for i in user:
            username = User.objects.get(id = i['profile_id'])
            data = {"id":i['profile_id'],"username":username.username}
            friends.append(data)
        return content(False,"","",friends)
    except Exception as e:
        return content(True,str(e),"Error occurred in getting friends")

@api_view(['POST'])
@permission_classes([AllowAny])
def createAccount(request):
    if request.method == 'POST':
        try:
            data = request.data
            user = User.objects.create(email = data['email'],username = data['username'],name = data['name'],about = data['about'])
            if data['profileImage']:
                user.profileImage = data['profileImage']
            print(data['password'])
            user.set_password(data['password'])
            user.save()

            if User.objects.filter(username = data['username']):
                return content(False,'Account created sucessfully !!',"")
            else :
                return content(True,'Error occured in creating account',"")            
        except Exception as e:
            return content(True,str(e),"Error occured in creating account")

@api_view(['PUT'])
def updatePassword(request):
    try:
        user = User.objects.get(username = request.user)
        oldPassword = request.data['oldpassword']
        newpassword = request.data['newpassword']
        if not user.check_password(oldPassword):
            return content(True,"Old Password in incorrect","Error occured in updating password")
        else:
            user.set_password(newpassword)
            user.save()
            return content(False,"Password updated successfully","")
    except Exception as e:
        return content(True,str(e),"Error occured in updating password")


@api_view(['GET','PATCH'])
def userAccount(request):
    if request.method == 'GET':
        try:
            user = User.objects.get(username = request.user)
            serializer = UserSerializer(user,context={"request": request})
            return content(False,"","",serializer.data)
        except Exception as e:
            return content(True,str(e),"Error occured in getting user account")

    if request.method == "PATCH":
        try:
            data  = request.data 
            user = User.objects.get(username=request.user)
            serializer = UserSerializer(data=data,instance=user)
            if serializer.is_valid():
                return content(False,"Profile updated successfully","",serializer.data)
            else :
                return content(True,str(serializer.errors),"Error occurred in updating user profile",serializer.data)
        except Exception as e:
            return content(True,str(e),"Error occured in updating user profile")

@api_view(['POST'])
@permission_classes([AllowAny])
def checkUsername(request):
    try:
        data = request.data 
        if (User.objects.filter(username = data['username'])):
            return content(True,"Username Already taken !!! , Try different username","username")
        
        if(User.objects.filter(email = data['email'])):
            return content(True,"email Already taken !!! , Try different username","email")
        return content(False,"","")
    except Exception as e:
        return content(True,str(e),"Error occured in checking username and email")

