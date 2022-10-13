from asyncore import read
from dataclasses import field
from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.accounts.models import Friend
User =get_user_model()

class FriendSerializer(serializers.ModelSerializer):
    profile = serializers.CharField(read_only = True)
    class Meta:
        model = Friend
        fields=['profile'] 

class UserSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True,read_only=True)
    class Meta:
        model = User
        fields = ['id','username','email','name','about','profileImage','friends']


