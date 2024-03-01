from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.get_user_profile, name='user-profile'),
    path('profile/update/', views.update_user_profile, name='update-user-profile'),
    path('profile/delete/', views.delete_user_profile, name='delete-user-profile'),
]
