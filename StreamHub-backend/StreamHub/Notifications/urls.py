# Notifications/urls.py
from django.urls import path
from .views import get_notifications, mark_notification_as_read

urlpatterns = [
    path('notifications/', get_notifications, name='get_notifications'),
    path('notifications/<int:notification_id>/mark-as-read/', mark_notification_as_read, name='mark_notification_as_read'),
]
