from django.shortcuts import render

# Create your views here.
# Notifications/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

@api_view(['GET'])
def get_notifications(request):
    """
    Get all notifications for the authenticated user.
    """
    user = request.user
    notifications = Notification.objects.filter(user=user)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def mark_notification_as_read(request, notification_id):
    """
    Mark a notification as read.
    """
    try:
        notification = Notification.objects.get(id=notification_id)
    except Notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    notification.is_read = True
    notification.save()
    return Response(status=status.HTTP_204_NO_CONTENT)
