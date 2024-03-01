from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer
from django.contrib.auth import authenticate

@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    if request.method == 'POST':
        serializer = MyTokenObtainPairSerializer(data=request.data)
        if serializer.is_valid():
            # Get the validated data from the serializer
            email_or_username = serializer.validated_data.get('email_or_username')
            password = serializer.validated_data.get('password')
            
            # Authenticate the user
            user = authenticate(request=request, username=email_or_username, password=password)
            
            if user:
                # Generate JWT token
                token_serializer = MyTokenObtainPairSerializer(user)
                token_data = token_serializer.validated_data
                return Response(token_data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
