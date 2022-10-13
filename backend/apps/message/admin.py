from django.contrib import admin
from .models import Message


@admin.register(Message)
class messageAdmin(admin.ModelAdmin):
    list_display = ['id','message','msg_from','msg_to','date']

# working of the process
'''
1-> user will all his friends
2->he can search for a particular person with him he wants to chat 



'''