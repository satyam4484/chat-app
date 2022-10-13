from django.urls import path 
from .views import createAccount,userAccount,updatePassword,checkUsername,getFriends,getFriend
urlpatterns = [
    path('create',createAccount),
    path('get',userAccount),
    path('updatepassword',updatePassword),
    path('checkcredentials',checkUsername),
    path('getfriends',getFriends),
    path('getfriend',getFriend)
]
