# models.py
from django.db import models
from django.utils import timezone

class RegisteredUser(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    face_encoding = models.JSONField()  # store list of floats
    last_attendance = models.DateTimeField(null=True, blank=True)  # Track both date and time

    def __str__(self):
        return self.name
