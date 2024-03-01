from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Favourite
from .serializers import FavouriteSerializer

@api_view(['GET', 'POST'])
def favourite_list(request):
    """
    List all favourites or create a new favourite.
    """
    if request.method == 'GET':
        favourites = Favourite.objects.all()
        serializer = FavouriteSerializer(favourites, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FavouriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def favourite_detail(request, pk):
    """
    Retrieve, update or delete a favourite.
    """
    try:
        favourite = Favourite.objects.get(pk=pk)
    except Favourite.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = FavouriteSerializer(favourite)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = FavouriteSerializer(favourite, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
