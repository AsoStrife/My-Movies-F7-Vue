let constants = {
    
    "app": {
        "name": "My movies", 
        "version": "1.0.0", 
        "author": "Webenterprises",
        "locale": "en", 
        "fallbackLocale": "en", 
        "supportedLanguages": [
            {
                'lang': 'en', 
                'name': 'English'
            }, 
            {
                'lang': 'it', 
                'name': 'Italiano'
            }
        ]
    },
    "themoviedb": {
        'api_key': '', 
        "url": "https://api.themoviedb.org/4/",
        "doc": "https://developers.themoviedb.org/4/search/search-movies",
        "endpoints": {
            "search_movies": "search/movie",
            "images_original": "https://image.tmdb.org/t/p/original",
            "images_w500": "https://image.tmdb.org/t/p/w500"
        }
    },
    "backend": {
        "url": "http://localhost:1337/api/",
        "endpoints": {
            "login": "auth/local",
            "films": "films"
        }
    }
}

export default constants;