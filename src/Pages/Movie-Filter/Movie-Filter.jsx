import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../Api/axios';
import styles from './Movie-Filter.module.css';
import MovieNav from '../../components/Movie-Nav/Movie_Nav';

const Filter = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('movie');
  const [searchInput, setSearchInput] = useState('');

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();

  useEffect(() => {
    setSearchInput(query || '');
  }, [query]);

  useEffect(() => {
    const searchTerm = query?.trim() || '';
    document.title = searchTerm ? `Search results for ${searchTerm} | Netflix` : 'Search Netflix';
    if (!searchTerm) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const fetchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/${mediaType}`, {
          signal: controller.signal,
          params: {
            query: searchTerm,
          }
        });

        setResults(response.data.results || []);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError(err);
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResults();
    return () => controller.abort();
  }, [query, mediaType]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = searchInput.trim();
    if (searchTerm) {
      navigate(`/movies/filter?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleTrailerClick = (movie) => {
    const movieName = (movie.title || movie.name || 'unknown-title')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    navigate(`/trailer/${mediaType}/${encodeURIComponent(movieName)}`, {
      state: { movieId: movie.id },
    });
  };

  return (
    <div className={styles.container}>
      <MovieNav />
      <div className={styles.filters}>
        <form className={styles.searchForm} onSubmit={handleSearchSubmit} role="search">
          <label className={styles.visuallyHidden} htmlFor="movie-search">Search titles</label>
          <input
            id="movie-search"
            className={styles.searchInput}
            type="search"
            placeholder="Search movies and TV shows"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button className={styles.searchButton} type="submit" disabled={!searchInput.trim()}>
            Search
          </button>
        </form>
        <select onChange={(e) => setMediaType(e.target.value)} value={mediaType}>
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>
      </div>
      <main className={styles.content}>
        <div className={styles.resultsHeader}>
          <div>
            <h1>{query?.trim() ? `Results for “${query.trim()}”` : 'Find your next favorite'}</h1>
            <p>{query?.trim() ? `${mediaType === 'movie' ? 'Movies' : 'TV shows'} matching your search` : 'Search movies and TV shows by title.'}</p>
          </div>
          {!loading && !error && query?.trim() && results.length > 0 && (
            <span className={styles.resultCount}>{results.length} results</span>
          )}
        </div>
        <div className={styles.results} aria-live="polite" aria-busy={loading}>
        {loading ? (
          <div className={styles.loading}>Searching titles…</div>
        ) : error ? (
          <div className={styles.error} role="alert">
            <h2>We couldn’t load search results</h2>
            <p>{error.response?.data?.status_message || 'Check your connection and try searching again.'}</p>
          </div>
        ) : !query?.trim() ? (
          <div className={styles.noResults}>Enter a title in search to find movies or TV shows.</div>
        ) : results.length > 0 ? (
          results.map((movie) => (
            <button key={movie.id} type="button" className={styles.item} onClick={() => handleTrailerClick(movie)}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className={styles.itemPoster}
                  loading="lazy"
                />
              ) : (
                <span className={styles.posterPlaceholder} aria-hidden="true">No poster</span>
              )}
              <span className={styles.itemDetails}>
                <span className={styles.itemTitle}>{movie.title || movie.name}</span>
                <span className={styles.itemMeta}>
                  {mediaType === 'movie' ? movie.release_date?.slice(0, 4) : movie.first_air_date?.slice(0, 4)}
                  {movie.vote_average > 0 && ` · ★ ${movie.vote_average.toFixed(1)}`}
                </span>
                {movie.overview && <span className={styles.itemOverview}>{movie.overview}</span>}
              </span>
            </button>
          ))
        ) : (
          <div className={styles.noResults}>
            <h2>No matches found</h2>
            <p>Try a different title or switch between movies and TV shows.</p>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default Filter;