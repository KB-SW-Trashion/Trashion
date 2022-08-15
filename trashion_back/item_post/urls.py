from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, CategoryViewSet, PhotoViewSet, StylePhotoViewSet, LocationViewSet, LocationSetViewSet

router = DefaultRouter()
router.register('item', ItemViewSet)
router.register('category', CategoryViewSet)
router.register('photo', PhotoViewSet)
router.register('stylephoto', StylePhotoViewSet)
router.register('location', LocationViewSet)
router.register('locationset', LocationSetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]