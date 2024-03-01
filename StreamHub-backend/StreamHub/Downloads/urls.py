# In Downloads/urls.py
from django.urls import path
from .views import download_list

urlpatterns = [
    path('downloads/', download_list, name='download-list'),
]
