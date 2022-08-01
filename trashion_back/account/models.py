from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    nickname = models.CharField(max_length=100)
    email = models.EmailField(max_length=50, unique=True)
    height = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    weight = models.DecimalField(max_digits=4, decimal_places=1, default=0)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', blank=True, null=True) #프로필 사진

    def __str__(self):
        return self.user.username
