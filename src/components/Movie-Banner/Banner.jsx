import React, { useEffect, useState } from 'react';
import style from './Banner.module.css';
import axios from '../../Api/axios';
import requests from '../../Api/Requests';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdFormatListBulletedAdd, MdImage } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { Rating } from '@smastrom/react-rating';
import SliderWrapper from "../Script/SlickSlider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

function Banner() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { currentUser, addToMyList } = useAuth();

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                setMovies(request.data.results || []);
            } catch (fetchError) {
                setError(fetchError);
                console.error('Error fetching featured movies:', fetchError);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + '...' : str;
    }

    const handleTrailerClick = (movie) => {
        const type = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
        const title = movie.title || movie.name || movie.original_name || 'unknown-title';
        const movieName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        navigate(`/trailer/${type}/${encodeURIComponent(movieName)}`, {
            state: { movieId: movie.id },
        });
    };

    const handleAddToList = (movie) => {
        if (!currentUser) {
            navigate('/signin');
            return;
        }

        const title = movie.title || movie.name || movie.original_name;
        if (!movie.id || !title) {
            console.error('Cannot add movie without an ID and title:', movie);
            return;
        }

        void addToMyList({
            ...movie,
            type: movie.media_type || (movie.first_air_date ? 'tv' : 'movie'),
            title,
            trailers: [],
            genres: [],
            production_countries: [],
        });
    };

    // Custom Arrow Components
    const NextArrow = ({ onClick }) => (
        <button className={`${style.arrowRight} ${style.arrow}`} onClick={onClick}> &#10095; </button>
    );

    const PrevArrow = ({ onClick }) => (
        <button className={`${style.arrowLeft} ${style.arrow}`} onClick={onClick}> &#10094; </button>
    );

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        adaptiveHeight: true,
        appendDots: dots => <ul className={style.dot}>{dots}</ul>,
        customPaging: i => (
        <div className="ft-slick__dots--custom">
            <div className="loading" />
        </div>
        )
    };

    const getGenreNames = (genre_ids) => {
        return genre_ids.map(id => genreMap[id]).join(', ');
    };

    if (loading) {
        return <div className={style.banner} role="status">Loading featured titles…</div>;
    }

    if (error) {
        return (
            <div className={style.banner} role="alert">
                Featured titles are unavailable. Check your TMDB API key and connection.
            </div>
        );
    }

    return (
        <SliderWrapper>
        <Slider {...settings}>
            {movies.map((movie) => (
                <div key={movie.id} className={style.moviebanner}>
                    <header
                        className={style.banner}
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                            backgroundPosition: 'top',
                        }}
                    >
                        <div className={style.banner_content}>
                            <h1 className={style.movie_title}>
                                {movie?.title || movie?.name || movie?.original_name}
                            </h1>
                            {movie.vote_average && (
                                <div className={style.rate}>
                                    <div className={style.rating}>
                                        <Rating
                                            value={movie.vote_average / 2}
                                            readOnly
                                            max={5}
                                            precision={0.1}
                                        />
                                        <p>{Math.min(movie.vote_average).toFixed(1)} / 10</p>
                                        <p className={style.lang}>{movie.original_language}</p>
                                        <p>{movie.release_date}</p>
                                    </div>
                                    <p className={style.genre}>{getGenreNames(movie.genre_ids)}</p>
                                </div>
                            )}
                            <p className={style.movie_info}>{truncate(movie?.overview, 200)}</p>
                            <div className={style.movie_button}>
                                <button className={style.movie_play} onClick={() => handleTrailerClick(movie)}>
                                    <strong>Watch Trailer</strong> <FaPlay />
                                </button>
                                <button className={style.movie_list} onClick={() => handleAddToList(movie)}>
                                    <strong>Add To List</strong> <MdFormatListBulletedAdd />
                                </button>
                            </div>
                        </div>
                        <div className={style.banner_fade} />
                    </header>
                </div>
            ))}
        </Slider>
        </SliderWrapper>
    );
}

export default Banner;
