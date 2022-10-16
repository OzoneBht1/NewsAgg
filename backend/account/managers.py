from django.contrib.auth.models import BaseUserManager
from django.forms import ValidationError


class UserProfileManager(BaseUserManager):
    # two methods: create user and superuser

    def create_user(self, email, name, country, gender, password=None):
        """Create and save user with given email and password"""
        if not email:
            return ValidationError("Email cannot be empty")
        email = self.normalize_email(email)
        # will convert the second half of email to lowercase, which is valid to many email providers

        user = self.model(email=email, name=name,
                          country=country, gender=gender)
        # no idea
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, country, gender, password):
        user = self.create_user(email, name, country, gender, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
