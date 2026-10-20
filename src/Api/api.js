/* // api.js
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovieDetails(movieId) {
  try {
    const detailsResponse = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const videosResponse = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const creditsResponse = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);

    const movieDetails = detailsResponse.data;
    const movieVideos = videosResponse.data;
    const movieCredits = creditsResponse.data;

    return {
      overview: movieDetails.overview,
      rating: movieDetails.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
      backdrops: movieDetails.backdrops ? movieDetails.backdrops.map(path => `https://image.tmdb.org/t/p/w500${path.file_path}`) : [],
      trailers: movieVideos.results.filter(video => video.type === 'Trailer'),
      cast: movieCredits.cast,
      crew: movieCredits.crew,
      genres: movieDetails.genres.map(genre => genre.name).join(', '),
      countries: movieDetails.production_countries.map(country => country.name).join(', '),
      status: movieDetails.status,
      originalLanguage: movieDetails.original_language,
      budget: movieDetails.budget,
      revenue: movieDetails.revenue,
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}
 */