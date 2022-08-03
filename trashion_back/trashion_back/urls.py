from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dj_rest_auth/', include('dj_rest_auth.urls')),
    path('allauth/', include('allauth.urls')),
    path('accounts/', include('accounts.urls'))
]
