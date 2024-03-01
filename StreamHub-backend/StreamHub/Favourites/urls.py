from django.urls import path
from .views import favourite_list, favourite_detail

urlpatterns = [
    path('favourites/', favourite_list, name='favourite-list'),
    path('favourites/<int:pk>/', favourite_detail, name='favourite-detail'),
]
