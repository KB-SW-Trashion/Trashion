from django.db import models
from django.contrib.auth import get_user_model
from item_post.models import Item

User = get_user_model()

class Follow(models.Model):
    follower_id = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE)
    followed_id = models.ForeignKey(User, related_name="followed", on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.follower_id.email
    
class Like(models.Model):
    like_user_id = models.ForeignKey(User, related_name="like_user_id", on_delete=models.CASCADE)
    like_item = models.ForeignKey(Item, related_name="like_item", on_delete=models.CASCADE)