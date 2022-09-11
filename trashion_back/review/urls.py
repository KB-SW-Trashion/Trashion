from django.urls import path

from .views import *
urlpatterns = [
    path('', ReviewList.as_view()),
]