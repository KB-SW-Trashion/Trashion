from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    CLOTHES_CHOICES = (
        ('outer', '아우터'),
        ('dress', '원피스'),
        ('top', '상의'),
        ('pants', '바지'),
        ('skirt', '스커트'),
        ('shoes', '신발'),
        ('accessory', '악세사리'),
    )
    big_category = models.CharField(max_length=20, choices=CLOTHES_CHOICES)
    small_category = models.CharField(max_length=20)

    def __str__(self):
        return self.get_big_category_display()


class Item(models.Model):
    user_id = models.ForeignKey(User, related_name='item_sets', on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, related_name='item_sets', on_delete=models.DO_NOTHING)
    description = models.TextField()
    feature = models.TextField()
    product_defect = models.TextField()
    size = models.CharField(max_length=6)
    height = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    weight = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    wear_count = models.IntegerField()
    price = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description


class Location(models.Model):
    city = models.CharField(max_length=10)
    gu = models.CharField(max_length=10)
    dong = models.CharField(max_length=10)

    def __str__(self):
        return self.city+" "+self.gu+" "+self.dong


class LocationSet(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='location_sets')
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='location_sets')


class Photo(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='photo_sets')
    photo = models.ImageField(upload_to='item_post', blank=True, null=True)


class StylePhoto(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='style_photo_sets')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='style_photo_sets')
    photo = models.ImageField(upload_to='item_post', blank=True, null=True)