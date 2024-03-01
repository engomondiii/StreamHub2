from django.urls import path
from .views import register_user, login_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    # Add more URL patterns for other authentication endpoints if needed
]
