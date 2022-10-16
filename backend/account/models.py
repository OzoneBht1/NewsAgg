from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .managers import UserProfileManager
# Create your models here.


class UserProfile(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    gender = models.CharField(max_length=50, default="Prefer Not to Say")
    objects = UserProfileManager()
    country = models.CharField(max_length=150, default="Nepal")

    REQUIRED_FIELDS = ['name', 'gender', 'country']
    USERNAME_FIELD = 'email'

    def __str__(self):
        return f"{self.name} : {self.email}"
