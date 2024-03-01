from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Download
from .serializers import DownloadSerializer

@api_view(['GET', 'POST'])
def download_list(request):
    """
    List all downloads or create a new download.
    """
    if request.method == 'GET':
        downloads = Download.objects.all()
        serializer = DownloadSerializer(downloads, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DownloadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
