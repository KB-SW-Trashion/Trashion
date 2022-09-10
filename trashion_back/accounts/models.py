import os
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = UserManager()
    social_profile = models.URLField(null=True,blank=True)
    realname = models.CharField(max_length=50, blank=True)
    nickname = models.CharField(max_length=50, null=True, unique=True) 
    address = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    introduce = models.TextField(max_length=140, null=True)
    height = models.CharField(max_length=3)
    weight = models.CharField(max_length=3)
    top_size = models.CharField(max_length=5)
    bottom_size = models.CharField(max_length=5)
    
    def __str__(self):
        return self.user.email

class ProfileImage(models.Model):
    user = models.OneToOneField(User, related_name="profile_image", on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='profile', null=True)
    
    def delete(self,*args,**kwargs):
        os.remove(os.path.join(settings.MEDIA_ROOT, self.photo.name))
        super(User, self).delete(*args,**kwargs)
    
    def __str__(self):
        return self.user.email