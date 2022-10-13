import imp
from django.contrib import admin
from .models import User,Friend
# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display=['id','username','email','name','about','profileImage','is_admin','is_active',]

@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display=['id','profile']