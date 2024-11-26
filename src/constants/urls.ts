export const IMAGE_URLS = {
  url: 'https://image.tmdb.org/t/p/original'
}

export const API_URLS = {
  dev: 'http://localhost:3005/api',
  prod: 'https://simbioxmoviesbackend-1.onrender.com/api'
}

const isProduction = window.location.hostname !== 'localhost';
export const API_URL = isProduction ? API_URLS.prod : API_URLS.dev;