from asyncio.windows_events import NULL
from django.db import models
from django.contrib.auth import get_user_model

from item_post.models import Item
User = get_user_model()

class Review(models.Model):
    SATISFIED_CHOICES = [
        ('SF', 'Satisfaction'),
        ('US', 'Unsatisfaction')
    ]
    
    reviewer = models.ForeignKey(User, related_name='review_author', on_delete=models.CASCADE)
    target = models.ForeignKey(Item, related_name='review_target', on_delete=models.CASCADE)
    satisfied = models.CharField(max_length=2, choices=SATISFIED_CHOICES, default=NULL)
    review = models.TextField(max_length=140, null=True, blank=True)
    
    def __str__(self):
        return self.review