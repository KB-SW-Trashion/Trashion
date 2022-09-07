from django.urls import path, include

from .views import *
urlpatterns = [
    path('', ReviewList.as_view()),
]