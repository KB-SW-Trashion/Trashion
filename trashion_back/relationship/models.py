from django.db import models
from django.contrib.auth import get_user_model
from item_post.models import Item

User = get_user_model()

class Follow(models.Model):
    follower = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE)
    followed = models.ForeignKey(User, related_name="followed", on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.follower_id.email
    
class Like(models.Model):
    likeuser = models.ForeignKey(User, related_name="like_user_id", on_delete=models.CASCADE)
    likeitem = models.ForeignKey(Item, related_name="like_item_id", on_delete=models.CASCADE)