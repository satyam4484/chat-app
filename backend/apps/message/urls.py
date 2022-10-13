from urllib.parse import urlparse
from django.urls import path 
from .views import getMessage,sendMessage,deleteMessage

urlpatterns = [
    path('',getMessage),
    path('send',sendMessage),
    path('delete',deleteMessage),
]
