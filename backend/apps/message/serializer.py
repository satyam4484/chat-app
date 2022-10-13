from dataclasses import field
from re import I
from rest_framework import serializers
from .models import Message
from datetime import timedelta

class MessageSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields=['id','message','msg_from','msg_to','date']
    def get_date(self,object):
        newdate = object.date + timedelta(hours=5,minutes=30)
        return newdate.strftime('%I:%M %p, %d-%m-%Y')
    