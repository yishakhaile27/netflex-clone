import React, { useEffect, useState, useRef } from 'react';
import style from './Movie_list.module.css';
import axios from '../../Api/axios';
import { MdFormatListBulletedAdd, MdImage } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import classNames from 'classnames';
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'; // Import SkeletonLoader

const base_url = "https://image.tmdb.org/t/p/original/";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const defaultPoster = '/path-to-default-poster.jpg'; // Set the path to your default poster image

const Movieslist = ({ fetchUrl, title, LargePosterRow }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 }); // State for mouse position
    const navigate = useNavigate();
    const { currentUser, addToMyList } = useAuth();
    const detailsRef = useRef(null); // Reference for the details box

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const request = await axios.get(fetchUrl);
                console.log('Initial API Response:', request.data);

                if (!request.data.results || request.data.results.length === 0) {
                    setError('No movies found.');
                    setLoading(false);
                    return;
                }

                const detailedMovies = await Promise.all(
                    request.data.results?.map(async (movie) => {
                        if (!movie || !movie.id) {
                            console.warn('Encountered null or undefined movie data:', movie);
                            return null;
                        }

                        try {
                            const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
                            let detailsResponse;

                            if (!API_KEY) {
                                throw new Error('Missing TMDB API key. Set REACT_APP_TMDB_API_KEY in your .env file.');
                            }

                            if (type === 'movie') {
                                detailsResponse = await axios.get(`/movie/${movie.id}`);
                            } else if (type === 'tv') {
                                detailsResponse = await axios.get(`/tv/${movie.id}`);
                            } else {
                                throw new Error('Invalid type. Use "movie" or "tv".');
                            }

                            const details = detailsResponse.data;
                            console.log(`Details for ${movie.id}:`, details); // Log the details for debugging

                            const currentSeason = type === 'tv' && details.number_of_seasons > 0
                                ? details.seasons[details.seasons.length - 1]
                                : null;

                            const currentSeasonDetails = currentSeason
                                ? (await axios.get(`/tv/${movie.id}/season/${currentSeason.season_number}`)).data
                                : null;

                            const posterPath = details.poster_path ? `${base_url}${details.poster_path}` : defaultPoster;

                            return {
                                id: movie.id,
                                type: type,
                                overview: details.overview || 'No Overview',
                                rating: details.vote_average || 0,
                                poster_path: posterPath,
                                genres: details.genres || [],
                                production_countries: details.production_countries || [],
                                release_date: details.release_date || 'Unknown',
                                runtime: details.runtime || 'N/A',
                                title: details.name || details.title || 'No Title',
                                originalLanguage: details.original_language || 'Unknown',
                                current_season_number: currentSeason?.season_number || 'N/A',
                                current_season_episodes: currentSeasonDetails?.episodes.length || 0,
                                networks: details.networks || []
                            };
                        } catch (error) {
                            console.error(`Error fetching details for ${movie.id}:`, error.message || error.response?.data || error);
                            return null;  // Handle the error and return null
                        }
                    })
                );

                setMovies(detailedMovies.filter(movie => movie !== null));  // Filter out null values

            } catch (error) {
                setError('Error fetching movies. Please try again later.');
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [fetchUrl]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target)) {
                setSelectedMovie(null);  // Close the details view if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [detailsRef]);

    const handleTrailerClick = (movie) => {
        const mediaTypePath = movie.type === 'tv' ? 'tv' : 'movie';
        const movieName = (movie.title || 'unknown-title')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        navigate(`/trailer/${mediaTypePath}/${encodeURIComponent(movieName)}`, {
            state: { movieId: movie.id },
        });
    };

    const handleAddToList = (movie) => {
        if (currentUser) {
            if (movie && movie.id && movie.title) {
                addToMyList(movie);
            } else {
                console.warn('Invalid movie data:', movie);
            }
        } else {
            navigate('/signin');
        }
    };

    const handleRightClick = (e, movie) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setSelectedMovie(movie);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    };

    if (loading) {
        return (
            <div className={style.row}>
                <div className={style.movies}>
                    <h1>{title}</h1>
                    <div className={style.all_poster}>
                        {[...Array(10)].map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <p>{error}</p>;

    return (
        <div className={style.row}>
            <div className={style.movies}>
                <h1>{title}</h1>
                <div className={style.all_poster}>
                    {movies.map((movie) => (
                        <div key={movie.id} className={style.posterContainer} onContextMenu={(e) => handleRightClick(e, movie)} onClick={() => handleTrailerClick(movie)}>
                            <span className={style.posterhover}><FaPlay /></span>
                            {movie.poster_path ? (
                                <img
                                    className={classNames(style.row_poster, { [style.largePoster]: LargePosterRow })}
                                    src={movie.poster_path}
                                />
                            ) : (
                                <div className={`${style.nonposter} ${style.row_poster}`}>
                                    <MdImage />
                                </div>
                            )}
                            <p className={style.movieTitle}>{movie.title || 'No Title'}</p>
                            <div className={style.duration}>
                                {movie.type === 'tv' ? (
                                    <p>{`Se ${movie.current_season_number} Ep ${movie.current_season_episodes}`}</p>
                                ) : (
                                    <p>{new Date(movie.release_date).getFullYear()} - {movie.runtime} min</p>
                                )}
                                <p className={style.movieInfo}>{movie.type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedMovie && (
                <div
                    className={style.moviedetails}
                    ref={detailsRef} // Attach the ref to the details box
                    style={{ top: position.y, left: position.x }} // Position the details box
                >
                    <div className={style.moviedetails_text}>
                        <h3 className={style.movieTitle}>{selectedMovie.title || 'No Title'}</h3>
                        <div className={style.duration}>
                            {selectedMovie.type === 'tv' ? (
                                <p>{`Season ${selectedMovie.current_season_number} - ${selectedMovie.current_season_episodes} episodes`}</p>
                            ) : (
                                <p>{new Date(selectedMovie.release_date).getFullYear()} - {selectedMovie.runtime} min</p>
                            )}
                            <p className={style.movieInfo}>{selectedMovie.type}</p>
                        </div>
                        <div className={style.movieInfo}>
                            <p className={style.movie_overview}>{selectedMovie.overview || 'No Overview'}</p>
                            <p>Rating: <strong>{selectedMovie.rating}</strong></p>
                            <p>Country: <strong>{selectedMovie.production_countries?.map(country => country.name).join(', ') || 'Unknown'}</strong></p>
                            <p>Genres: <strong>{selectedMovie.genres?.map(genre => genre.name).join(', ') || 'Unknown'}</strong></p>
                            <p>Status: <strong>{selectedMovie.status || 'Unknown'}</strong></p>
                            <p>Original Language: <strong>{selectedMovie.originalLanguage || 'Unknown'}</strong></p>
                            {selectedMovie.type === 'tv' && (
                                <p>Networks: <strong>{selectedMovie.networks?.map(network => network.name).join(', ') || 'Unknown'}</strong></p>
                            )}
                        </div>
                    </div>
                    <div className={style.moviedetails_button}>
                        <button onClick={() => handleTrailerClick(selectedMovie)}>
                            <strong>Watch Trailer</strong> <FaPlay />
                        </button>
                        <button onClick={() => handleAddToList(selectedMovie)}>
                            <strong>Add To List</strong> <MdFormatListBulletedAdd />
                        </button>
                    </div>
                </div>
            )}
            <div className={style.box}></div>
        </div>
    );
};

export default Movieslist;