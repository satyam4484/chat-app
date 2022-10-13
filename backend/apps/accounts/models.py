from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import (BaseUserManager,AbstractBaseUser)

# creating custom user model

class UserManager(BaseUserManager):
    def create_user(self,email,username,password = None,**extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not username :
            raise ValueError('Users must have an username ')
        
        user = self.model (
            email = self.normalize_email(email),
            username=username,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,username,password,**extra_fields):
        user = self.create_user(email,username,password=password,**extra_fields)
        user.is_admin = True
        user.save(using = self._db)
        return user
                    

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email',unique=True,max_length=255)
    username = models.CharField(unique=True,max_length=100)
    name = models.CharField(max_length=200,blank=True,null=True)
    about = models.TextField(max_length=500,blank=True,null=True)
    profileImage = models.ImageField(upload_to='accounts/',default='defaultProfile.jpg',)
    friends = models.ManyToManyField('Friend',related_name='friends_name',blank=True,null=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects =  UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS= ['email']

    def __str__(self):
        return self.username

    def has_perm(self,perm,obj = None):
        return True
    
    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Friend(models.Model):
    profile=models.OneToOneField(User,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.profile.username


@receiver(post_save,sender=User)
def create_friend_profile(sender,instance,created,**kwargs):
    if created:
        Friend.objects.create(profile=instance)