from django.urls import path
from . import views

urlpatterns = [
    path('streams/', views.stream_list, name='stream-list'),
    path('streams/<int:pk>/', views.stream_detail, name='stream-detail'),
    path('chat_messages/', views.chat_message_list, name='chat-message-list'),
    path('chat_messages/<int:pk>/', views.chat_message_detail, name='chat-message-detail'),
]
