import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from '../../Api/axios';
import style from './Trailer.module.css';
import YouTube from 'react-youtube';
import { FaUser, FaList, FaPlay } from 'react-icons/fa';
import { MdFavorite, MdImage } from 'react-icons/md';
import MovieNav from '../../components/Movie-Nav/Movie_Nav';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { RatingComponent } from 'react-rating-emoji';
import 'react-rating-emoji/dist/index.css';
import IMDB_logo from '../../Assets/Image/IMDB.png';
import loader from '../../Assets/Image/loader.svg';

const IMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const base_url = "https://image.tmdb.org/t/p/original/";

const Trailer = () => {
    const [imdbrating, setIMDBRating] = useState("");
    const [vibe, setVibe] = useState(0);
    const [movie, setMovie] = useState(null);
    const [isPlayTrailer, setPlayTrailer] = useState(false);
    const { type, movieName } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                setLoading(true);

                if (type !== 'movie' && type !== 'tv') {
                    throw new Error(`Unsupported media type: ${type}`);
                }

                let movieId = location.state?.movieId;
                let movieTitle = movieName;
                if (!movieId) {
                    const searchResponse = await axios.get(`/search/${type}`, {
                        params: { query: movieName },
                    });
                    const normalizeTitle = (title) => title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    const match = searchResponse.data.results.find(result =>
                        normalizeTitle(result.title || result.name) === normalizeTitle(movieName)
                    );
                    if (!match) throw new Error(`${type} not found: ${movieName}`);
                    movieId = match.id;
                    movieTitle = match.title || match.name || movieName;
                }

                const detailsResponse = await axios.get(`/${type}/${movieId}`);
                const details = detailsResponse.data;
                const videosResponse = await axios.get(`/${type}/${movieId}/videos`);
                const creditsResponse = await axios.get(`/${type}/${movieId}/credits`);

                const videos = videosResponse.data.results;
                const credits = creditsResponse.data;

                const currentSeason = type === 'tv' && details.number_of_seasons > 0
                    ? details.seasons[details.seasons.length - 1]
                    : null;

                const currentSeasonDetails = currentSeason
                    ? await axios.get(`/tv/${movieId}/season/${currentSeason.season_number}`)
                    : null;

                setMovie({
                    id: movieId,
                    type: type,
                    overview: details.overview || 'No Overview',
                    rating: details.vote_average || 'N/A',
                    poster_path: details.poster_path || 'path/to/default-poster.jpg',
                    backdrop_path: details.backdrop_path || 'path/to/default-backdrop.jpg',
                    trailers: videos.filter(video => video.type === 'Trailer'),
                    cast: credits.cast || [],
                    crew: credits.crew || [],
                    genres: details.genres || [],
                    production_countries: details.production_countries || [],
                    release_date: details.release_date || 'Unknown',
                    runtime: details.runtime || 'N/A',
                    title: details.name || details.title || 'No Title',
                    status: details.status || 'Unknown',
                    originalLanguage: details.original_language || 'Unknown',
                    budget: details.budget || '-',
                    revenue: details.revenue || '-',
                    number_of_seasons: details.number_of_seasons || 0,
                    number_of_episodes: details.number_of_episodes || 0,
                    current_season_number: currentSeason?.season_number || 'N/A',
                    current_season_episodes: currentSeasonDetails?.episodes.length || 0,
                    networks: details.networks || []
                });

                if (IMDB_API_KEY) {
                    try {
                        const imdbResponse = await axios.get(`https://www.omdbapi.com/`, {
                            params: {
                                t: details.title || details.name || movieTitle,
                                apikey: IMDB_API_KEY,
                            },
                        });
                        if (imdbResponse.data.Response === "True") {
                            setIMDBRating(imdbResponse.data.imdbRating);
                        }
                    } catch (imdbError) {
                        console.error('Error fetching IMDb rating:', imdbError);
                    }
                }
            } catch (error) {
                setError('Error fetching movie data. Please try again later.');
                console.error('Error fetching movie data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();
    }, [type, movieName, location.state?.movieId]);

    if (loading) return <div className={style.loader}><img src={loader} alt="Loading..." /></div>;
    if (error) return <p>{error}</p>;

    if (!movie) return <p>No movie data available</p>;

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const playTrailer = () => {
        setPlayTrailer(!isPlayTrailer);
    };

    const posterImageUrl = `${base_url}${movie.poster_path}`;
    const backdropImageUrl = `${base_url}${movie.backdrop_path}`;
    const thumbnailUrl = movie.trailers.length > 0 ? `https://img.youtube.com/vi/${movie.trailers[0].key}/maxresdefault.jpg` : '';

    const handleRating = (newRating) => {
        setVibe(newRating);
    };

    return (
        <div className={style.trailer}>
            <MovieNav />
            <div className={style.trailerContainer}>
                <div className={style.trailer_banner}>
                    <div className={style.trailer_header} style={{ background: `linear-gradient(to top, rgba(0, 0, 0, 0.161) 0%, rgba(30, 30, 30, 0.750) 0%), url(${backdropImageUrl}) no-repeat top/cover` }}>
                        <div className={style.posterImage}>
                            {posterImageUrl ? (
                                <img src={posterImageUrl} alt="Movie Poster" />
                            ) : (
                                <div>
                                    <MdImage />
                                </div>
                            )}
                        </div>
                        <div className={style.trailer_header_detail}>
                            <h1>{movie.title || movieName}</h1>
                            {movie.rating && (
                                <div className={style.rate}>
                                    <div className={style.rating}>
                                        <Rating
                                            value={movie.rating / 2}
                                            readOnly
                                            max={5}
                                            precision={0.1}
                                        />
                                        <p>{movie.rating} / 10</p>
                                    </div>
                                </div>
                            )}
                            <p>{movie.genres?.map(genre => genre.name).join(", ")}</p>
                            <div className={style.trailer_header_button}>
                                <Link to="/movies/my-list">
                                    <button className={style.trailer_mylist}><FaList /></button>
                                </Link>
                                <button className={style.trailer_mylist}><MdFavorite /></button>
                                <button className={style.trailer_play} onClick={playTrailer}>
                                    <FaPlay /> Play Trailer
                                </button>
                            </div>
                            <div className={style.vibe}>
                                <h3>What's your Vibe?</h3>
                                <RatingComponent rating={vibe} onClick={handleRating} />
                            </div>
                            <div>
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.trailer_detail}>
                    <div className={style.trailer_data}>
                        <div className={style.Media_poster}>
                            <h2>Media</h2>
                            <div className={style.Media_video_poster}>
                                <div className={style.trailer_play_poster} onClick={playTrailer}>
                                    <button>
                                        <FaPlay />
                                    </button>
                                    <img src={thumbnailUrl} alt="YouTube Trailer Thumbnail" className={style.trailer_thumbnail_img} />
                                </div>
                                <div><img src={backdropImageUrl} alt="Backdrop Poster" /></div>
                                <div><img src={posterImageUrl} alt="Movie Poster" /></div>
                            </div>
                        </div>
                        <div className={style.cast}>
                            <h2>Cast</h2>
                            <div className={style.cast_list}>
                                {movie.cast && movie.cast.length > 0 ? (
                                    movie.cast.map(member => (
                                        <div key={member.id} className={style.cast_member}>
                                            {member.profile_path ? (
                                                <img className={style.castPhoto} src={`http://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
                                            ) : (
                                                <div className={style.trailer_icon}>
                                                    <FaUser />
                                                </div>
                                            )}
                                            <div className={style.cast_info}>
                                                <p><strong>{member.name}</strong></p>
                                                <span>{member.character}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No cast information available.</p>
                                )}
                            </div>
                        </div>
                        <div className={style.crew}>
                            <h2>Crew</h2>
                            <div className={style.crew_list}>
                                {movie.crew && movie.crew.length > 0 ? (
                                    movie.crew.map(member => (
                                        <div key={member.id} className={style.crew_member}>
                                            {member.profile_path ? (
                                                <img className={style.crewPhoto} src={`http://image.tmdb.org/t/p/w500${member.profile_path}`} />
                                            ) : (
                                                <div className={style.trailer_icon}>
                                                    <FaUser />
                                                </div>
                                            )}
                                            <div className={style.crew_info}>
                                                <p><strong>{member.name}</strong></p>
                                                <span>{member.job}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No crew information available.</p>
                                )}
                            </div>
                        </div>
                        {movie.current_season_number !== undefined && movie.current_season_episodes !== undefined &&
                            <div className={style.tvshow}>
                                <img className={style.showposterImage} src={posterImageUrl} alt="Movie Poster" />
                                <div>
                                    <p>Season {movie.current_season_number}</p>
                                    <p>Episodes {movie.current_season_episodes}</p>
                                    <p><strong>Release Date</strong> <br /> {movie.release_date}</p>
                                    {/* <p>Episode {episodes}</p> */}
                                </div>
                            </div>}
                    </div>
                    <div className={style.trailer_info}>
                        <p>Country: <strong>{movie.production_countries.map(country => country.name).join(', ') || 'Unknown'}</strong></p>
                        <p><strong>Status</strong> <br /> {movie.status}</p>
                        <p><strong>Release Date</strong> <br /> {movie.release_date}</p>
                        <p><strong>Language</strong> <br /> {movie.originalLanguage}</p>
                        {imdbrating && <div className={style.imdb}>
                            <p><strong>IMDb Rating:</strong></p>
                            <div>
                                <img src={IMDB_logo} alt="IMDB logo" />
                                <p>{imdbrating} / 10</p>
                            </div>
                            </div>}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {movie.budget !== undefined && <p><strong>Budget</strong> <br /> ${movie.budget}</p>}
                        {movie.revenue !== undefined && <p><strong>Revenue</strong> <br /> ${movie.revenue}</p>}
                        {movie.networks && <p>Networks: {movie.networks.map(network => network.name).join(", ")}</p>}
                        {movie.current_season_number !== undefined && <p>Season: {movie.current_season_number}</p>}
                        {movie.current_season_episodes !== undefined && <p>Episodes: {movie.current_season_episodes}</p>}
                    </div>
                </div>
            </div>
            <div style={{ display: isPlayTrailer ? 'block' : 'none' }}>
                <div className={style.trailer_popup} onClick={() => setPlayTrailer(false)}>
                    <button className={style.trailer_button} onClick={() => setPlayTrailer(false)}>
                        &#10005;
                    </button>
                    {isPlayTrailer && movie.trailers.length > 0 && (
                        <div className={style.trailer_video}>
                            <YouTube videoId={movie.trailers[0].key} opts={opts} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Trailer;