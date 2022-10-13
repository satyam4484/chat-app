from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
User =get_user_model()


class Message(models.Model):
    message = models.TextField(blank=False,null=False)
    msg_from = models.ForeignKey(User,on_delete=models.CASCADE,related_name='msg_sender')
    msg_to = models.ForeignKey(User,on_delete=models.CASCADE,related_name='msg_receiver')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.message

    def getdate(self) :
        return self.date.strftime('%Y:%m:%d %H:%M:%S %Z %z')
