import time
from typing import TypedDict
from functools import cache

Song = TypedDict('Song', {'video': str, 'name': str, 'title': str})

song1 : Song = {
    "video": "https://www.youtube.com/song1",
    "name": "this-is-our-song",
    "title": "This is our song"
}

song2 : Song = {
    "video": "https://www.youtube.com/song2",
    "name": "this-is-our-second-song",
    "title": "This is our second song"
}

Artist = TypedDict('Artist', {'name': str, 'video': str, 'photo': str, 'songs': list[Song]})


artist1: Artist = {
    "name": "Roberto Carlos",
    "video": "https://www.youtube.com/embed/54xxnkXqltw",
    "photo": "roberto-carlos.jpg",
    'songs': [song1, song2]
}

artist2: Artist = {
    "name": "Lulu Santos",
    "video": "https://www.youtube.com/embed/54xxnkXqltw",
    "photo": "lulu-santos.jpg",
    'songs': [song1, song2]
}

artist3: Artist = {
    "name": "Roberto Carlos",
    "video": "https://www.youtube.com/embed/54xxnkXqltw",
    "photo": "roberto-carlos.jpg",
    'songs': [song1, song2]
}

database = {
    'Roberto Carlos': [artist1, artist3],
    'Lulu Santos': [artist2],
    'Ademir Sobrero': [artist1, artist3],
    'Paulo Soares': [artist2],
    'Maria Aguilar': [artist2],
    'Vitor Sodre': [artist1, artist3]
}

@cache
def get_songs_by_artist(name: str) -> list[Song]:
    print(f"\nthese are the songs of {name}:")
    time.sleep(5)
    return database[name]


artist1_songs = get_songs_by_artist('Roberto Carlos')
for song in artist1_songs:
    print(f"song name: {song['name']},  video: {song['video']}")


artist1_songs = get_songs_by_artist('Lulu Santos')
for song in artist1_songs:
    print(f"song name: {song['name']},  video: {song['video']}")


print(f"\ncalling Roberto Carlos second time")
artist1_songs = get_songs_by_artist('Roberto Carlos')
for song in artist1_songs:
    print(f"song name: {song['name']},  video: {song['video']}")


artist1_songs = get_songs_by_artist('Maria Aguilar')
for song in artist1_songs:
    print(f"song name: {song['name']},  video: {song['video']}")


