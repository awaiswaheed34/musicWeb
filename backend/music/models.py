# models.py

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model
    """
    genre_likes = models.JSONField(default=list)
    instruments = models.JSONField(default=list)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)


class Music(models.Model):
    """
    Music model
    """
    song_name = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    instruments = models.CharField(max_length=255)
    date_uploaded = models.DateField(auto_now_add=True)
    image_url = models.URLField(blank=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
