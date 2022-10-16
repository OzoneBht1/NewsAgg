from rest_framework import serializers
from .models import UserProfile
from rest_framework.validators import ValidationError
from django.contrib.auth.hashers import make_password

GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
    ("Others", "Male"),
)


class UserProfileCreateSerializer(serializers.ModelSerializer):
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    password = serializers.CharField(write_only=True, required=True, style={
                                     'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={
                                      'input_type': 'password'})

    class Meta:
        model = UserProfile
        extra_kwargs = {'password': {'write_only': True}}
        fields = ['name', 'email', 'gender',
                  'country', 'password', 'password2']

    def validate_name(self, value):
        if ' ' not in value.lower():
            raise ValidationError("Enter full name")
        return value

    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        validated_data['password2'] = make_password(
            validated_data.get('password2'))
        print(validated_data)
        validated_data.pop('password2')
        return UserProfile.objects.create(**validated_data)

    def validate(self, data):
        if data['password'] != data['password2']:
            return serializers.ValidationError({"password2": "Password must match"})

        return data

    def validate_password(self, value):
        if len(value) < 7:
            raise ValidationError(
                # TODO: FIX THIS DOESNT WORK
                "The length of password must be greater than 7")
        return value


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['name', 'email', 'gender',
                  'country']
