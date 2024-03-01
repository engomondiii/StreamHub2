# In downloads/serializers.py
from rest_framework import serializers
from .models import Download

class DownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = ['id', 'title', 'download_date', 'file_type', 'file_size', 'file_url', 'thumbnail_url']
