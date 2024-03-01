from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Stream, ChatMessage
from .serializers import StreamSerializer, ChatMessageSerializer

# API endpoints for Stream model

@api_view(['GET', 'POST'])
def stream_list(request):
    if request.method == 'GET':
        streams = Stream.objects.all()
        serializer = StreamSerializer(streams, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StreamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def stream_detail(request, pk):
    try:
        stream = Stream.objects.get(pk=pk)
    except Stream.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StreamSerializer(stream)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = StreamSerializer(stream, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        stream.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# API endpoints for ChatMessage model

@api_view(['GET', 'POST'])
def chat_message_list(request):
    if request.method == 'GET':
        chat_messages = ChatMessage.objects.all()
        serializer = ChatMessageSerializer(chat_messages, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ChatMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def chat_message_detail(request, pk):
    try:
        chat_message = ChatMessage.objects.get(pk=pk)
    except ChatMessage.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChatMessageSerializer(chat_message)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ChatMessageSerializer(chat_message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        chat_message.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
