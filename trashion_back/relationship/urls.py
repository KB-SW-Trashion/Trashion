from django.urls import path
from relationship import views

urlpatterns = [
    path('<str:id>/follow/', views.follow, name='follow')
]
