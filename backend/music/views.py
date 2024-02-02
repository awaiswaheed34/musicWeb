# app/views.py

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token  # Import Token model
from .models import User, Music
import cloudinary
from cloudinary import uploader 
cloudinary.config(
            cloud_name='dqk0t0gf5',
            api_key='999639613314214',
            api_secret='2L_8tEdTj7eATQqjKcVeCT_EeqE'
        )
@csrf_exempt
@require_POST
def user_login(request):
    #get values from data 
    print(request.POST, "request")
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request, username=username, password=password)
    print(user, username, password,  "user")
    if user:
        login(request, user)

        # Generate or get existing token for the user
        token, created = Token.objects.get_or_create(user=user)

        user_profile = User.objects.get(username=user.username)
        response_data = {
            'status': 'success',
            'user_profile': {
                'username': user.username,
                'email': user.email,
                #return a list of genre likes and instruments 
                'genre_likes': [user_profile.genre_likes],
                'instruments': [user_profile.instruments],
                'description': user_profile.description,
                'image_url': user_profile.image_url,
            },
            'token': token.key,  # Use the generated or existing token key
        }
        return JsonResponse(response_data)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})

@require_GET
def get_all_songs(request):
    all_songs = Music.objects.all()
    serialized_songs = [
        {
            'song_name': song.song_name,
            'artist_name': song.artist_name,
            'genre': song.genre,
            'instruments': song.instruments,
            'image_url': song.image_url,
            'user': song.uploaded_by.username,
        }
        for song in all_songs
    ]
    return JsonResponse({'status': 'success', 'songs': serialized_songs})

@csrf_exempt
@require_POST
def user_signup(request):
    try:
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        genre_likes = request.POST.get('genre_likes')
        instruments = request.POST.get('instruments')
        description = request.POST.get('description')
        image = request.FILES['image']

        user = User.objects.create_user(username=username, email=email, password=password)
        user.genre_likes = genre_likes
        user.instruments = instruments
        user.description = description

        # Upload image to Cloudinary
        
        cloudinary_response = uploader.upload(image)

        user.image_url = cloudinary_response['secure_url']

        user.save()

        # Generate token for the newly created user
        token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({'status': 'success', 'message': 'User created successfully', 'token': token.key})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


@require_POST
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    # Delete the token to log the user out
    request.auth.delete()
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'User logged out'})


@require_GET
def search_songs(request):
    query_param = request.GET.get('query')
    matching_songs = Music.objects.filter(song_name__icontains=query_param)
    serialized_songs = [{'song_name': song.song_name, 'artist_name': song.artist_name, 'date_uploaded': song.date_uploaded} for song in matching_songs]
    return JsonResponse({'status': 'success', 'matching_songs': serialized_songs})

@csrf_exempt
@require_POST
@api_view(['POST'])
def upload_song(request):
    song_name = request.POST.get('song_name')
    artist_name = request.POST.get('artist_name')
    genre = request.POST.get('genre')
    instruments = request.POST.get('instruments')
    image = request.FILES['image']
    #uplod image to cloudinary 
    cloudinary_response = uploader.upload(image)
    image_url = cloudinary_response['secure_url']

    user = request.user
    print(request.auth, "request.auth")
    if user.is_anonymous:
        return JsonResponse({'status': 'error', 'message': 'You must be logged in to upload a song'})
    new_song = Music.objects.create(
        song_name=song_name,
        artist_name=artist_name,
        genre=genre,
        instruments=instruments,
        image_url=image_url,
        uploaded_by=user,
    )

    return JsonResponse({'status': 'success', 'message': 'Song uploaded successfully'})

@require_GET
def get_all_users(request):
    all_users = User.objects.all()
    serialized_users = [
        {
            'username': user.username,
            'image_url': user.image_url,
        }
        for user in all_users
    ]
    return JsonResponse({'status': 'success', 'users': serialized_users})


@api_view(['GET'])
def user_profile(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = request.user

    serialized_user = {
        'username': user.username,
        'email': user.email,
        'genre_likes': [user.genre_likes],
        'instruments': [user.instruments],
        'description': user.description,
        'image_url': user.image_url,
    }
    return JsonResponse({'status': 'success', 'user_profile': serialized_user})
