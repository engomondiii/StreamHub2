# authentication/serializers.py

from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'full_name', 'password', 'gender', 'date_of_birth', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'full_name': {'required': True},
            'username': {'required': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
# backend/authentication/serializers.py


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Validate user credentials (email/username and password)
        email_or_username = attrs.get("email_or_username")
        password = attrs.get("password")

        # Authenticate the user using the provided credentials
        user = authenticate(request=self.context.get("request"), username=email_or_username, password=password)

        if not user:
            # If authentication fails, raise an error
            raise serializers.ValidationError("Invalid email/username or password.")

        # Generate JWT token if the user is authenticated
        data = super().validate(attrs)

        # Update last login timestamp
        update_last_login(None, user)

        return data