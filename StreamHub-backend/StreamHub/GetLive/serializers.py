from rest_framework import serializers
from .models import Stream, ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'stream', 'user', 'message', 'timestamp']

class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = ['id', 'stream_title', 'user', 'start_time', 'end_time', 'is_active']
