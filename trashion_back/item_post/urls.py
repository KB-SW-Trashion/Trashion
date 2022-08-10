from django.urls import path
from . import views


urlpatterns = [
    path('post/', views.ItemListAPIView.as_view()),
    path('post/<int:pk>/', views.ItemDetailAPIView.as_view()),
]