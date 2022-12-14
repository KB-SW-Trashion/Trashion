import os
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

class Category(models.Model):
    big_category = models.CharField(max_length=20)
    small_category = models.CharField(max_length=20)

    def __str__(self):
        return self.big_category + "-" + self.small_category

class Item(models.Model):
    user_id = models.ForeignKey(User, related_name='item_sets', on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, related_name='item_sets', on_delete=models.DO_NOTHING)
    title = models.TextField()
    content = models.TextField()
    size = models.CharField(max_length=6)
    height = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    weight = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    condition = models.CharField(max_length=20)
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    sold_out = models.BooleanField(default=False)
    purchaser = models.ForeignKey(User, related_name='item_buy_sets',
                                  default=None, null=True, blank=True, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.title

    def total_like(self):
        return self.likeuser_sets.all().count()

class Location(models.Model):
    city = models.CharField(max_length=10)
    gu = models.CharField(max_length=10)
    dong = models.CharField(max_length=10)

    def __str__(self):
        return self.city+" "+self.gu+" "+self.dong

class LocationSet(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='location_item_sets')
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='location_sets')

class Photo(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='photo_sets')
    photo = models.ImageField(upload_to='item_post', blank=True, null=True)

class StylePhoto(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='style_photo_sets')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='style_photo_sets')
    photo = models.ImageField(upload_to='item_post', blank=True, null=True)
    
    def __str__(self):
        return self.item_id.title