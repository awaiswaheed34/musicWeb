# app/urls.py

from django.urls import path
from .views import (
    user_login,
    user_signup,
    user_logout,
    get_all_songs,
    search_songs,
    upload_song,
    get_all_users, 
    user_profile,
)

urlpatterns = [
    path('api/user/login/', user_login, name='user_login'),
    path('api/user/signup/', user_signup, name='user_signup'),
    path('api/user/logout/', user_logout, name='user_logout'),
    path('api/music/all/', get_all_songs, name='get_all_songs'),
    path('api/music/search/', search_songs, name='search_songs'),
    path('api/music/upload/', upload_song, name='upload_song'),
    path('api/users/all/', get_all_users, name='get_all_users'),
    path('api/user/profile/<str:username>/', user_profile, name='user_profile'),
]
