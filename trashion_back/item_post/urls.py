from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, CategoryViewSet, PhotoViewSet, StylePhotoViewSet

router = DefaultRouter()
router.register('item', ItemViewSet)
router.register('category', CategoryViewSet)
router.register('photo', PhotoViewSet)
router.register('stylephoto', StylePhotoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]