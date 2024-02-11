let constants = {
    "app": {
        "name": "My movies", 
        "version": "2.0.0", 
        "author": "Strifelab",
        "locale": "it", 
        "fallbackLocale": "it", 
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
        'api_key': 'cbb4487d53c34d7edc90ab8d0b8e4677', 
        "url": "https://api.themoviedb.org/3/",
        "doc": "https://developer.themoviedb.org/reference/search-multi",
        "endpoints": {
            "search_movies": "search/multi",
            "images_original": "https://image.tmdb.org/t/p/original",
            "images_w500": "https://image.tmdb.org/t/p/w500"
        }
    },
    "backend": {
        "url": "https://strapi.andreacorriga.com/api/",
        "apiToken": "6ea9ef5fe408811f06611b7cc223978b4645711591eb551dc5797a4d588d606f9071dcfceba15b178e7bdd34f3fe084e52cf097482d5771339735febca9b7189d19a2f8e18dcf7bad4a7eaa2f18168d10285dbb77cf838a31f6014602349b0c471b77d3deaab49f40410025f26b16f1b6ef9855559569dd4924ea03c51d7d2b7",

        "endpoints": {
            "login": "auth/local",
            "films": "films"
        }
    }
}

export default constants;