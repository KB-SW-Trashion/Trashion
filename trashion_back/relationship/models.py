from django.db import models
from django.contrib.auth import get_user_model
from item_post.models import Item, StylePhoto

User = get_user_model()

class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE) #주체
    followed = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE, null=True) #당한사람
    
    def __str__(self):
        return f'{self.follower.nickname}:{self.followed.nickname}'
    
class Like(models.Model):
    likeuser = models.ForeignKey(User, related_name="likeuser_sets", on_delete=models.CASCADE)
    likeitem = models.ForeignKey(Item, related_name="likeitem_sets", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.likeitem.description
    
class StyleLike(models.Model):
    user = models.ForeignKey(User, related_name="user_sets", on_delete=models.CASCADE)
    likeStyle = models.ForeignKey(StylePhoto, related_name="likeStyle_sets", on_delete=models.CASCADE)
    
    def __str__(self):
        return self.likeStyle.item_id.description