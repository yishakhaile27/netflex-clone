import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Services/firebase'; // Adjust import based on your setup
import { useAuth } from '../../Context/AuthContext'; // Import the useAuth hook
import { FaTrash } from 'react-icons/fa'; // Import a trash icon for delete button
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2
import styles from './MyList.module.css'; // Import the CSS module
import MovieNav from '../../components/Movie-Nav/Movie_Nav';

const MyListPage = () => {
    const [myList, setMyList] = useState({ movies: [], tvShows: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth(); // Use Auth context
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        if (!currentUser) {
            console.log('User not authenticated');
            setLoading(false);
            return;
        }

        const fetchMyList = async () => {
            try {
                const userDoc = doc(db, 'users', currentUser.uid);
                const userSnap = await getDoc(userDoc);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    const movies = (userData.myList || []).filter(item => item.type === 'movie');
                    const tvShows = (userData.myList || []).filter(item => item.type === 'tv');
                    setMyList({ movies, tvShows });
                } else {
                    console.log('No such document!');
                }
            } catch (err) {
                setError(err);
                console.error('Error fetching my list:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyList();
    }, [currentUser]);

    const handleDelete = async (id, type) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to recover this item!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                console.log('Deleting item with ID:', id);

                const userDoc = doc(db, 'users', currentUser.uid);
                const userSnap = await getDoc(userDoc);
                if (!userSnap.exists()) {
                    throw new Error('User document does not exist.');
                }

                const userData = userSnap.data();
                const currentList = userData.myList || [];

                const updatedList = currentList.filter(item => item.id !== id || item.type !== type);

                await updateDoc(userDoc, {
                    myList: updatedList
                });

                if (type === 'movie') {
                    setMyList(prevList => ({
                        ...prevList,
                        movies: prevList.movies.filter(movie => movie.id !== id)
                    }));
                } else {
                    setMyList(prevList => ({
                        ...prevList,
                        tvShows: prevList.tvShows.filter(tvShow => tvShow.id !== id)
                    }));
                }

                await Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                );
            }
        } catch (err) {
            setError(err);
            console.error('Error removing item from list:', err);
        }
    };

    const handleMovieClick = (movie, type) => {
        const movieName = (movie.title || movie.name || 'unknown-title')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        navigate(`/trailer/${type}/${encodeURIComponent(movieName)}`, {
            state: { movieId: movie.id },
        });
    };

    return (
        <div className={styles.container}>
            <MovieNav />
            <main className={styles.content}>
                <header className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>YOUR COLLECTION</p>
                        <h1>My List</h1>
                        <p className={styles.subtitle}>Your saved movies and shows, all in one place.</p>
                    </div>
                    {!loading && !error && (
                        <span className={styles.totalCount}>
                            {myList.movies.length + myList.tvShows.length} titles
                        </span>
                    )}
                </header>

                {loading ? (
                    <div className={styles.status} role="status">Loading your list…</div>
                ) : error ? (
                    <div className={styles.statusError} role="alert">
                        <h2>We couldn’t load your list</h2>
                        <p>{error.message || 'Please check your connection and try again.'}</p>
                    </div>
                ) : (
                    <>
                        <section className={styles.section} aria-labelledby="saved-movies">
                            <div className={styles.sectionHeading}>
                                <h2 id="saved-movies">Movies</h2>
                                <span>{myList.movies.length}</span>
                            </div>
                            {myList.movies.length > 0 ? (
                                <div className={styles.grid}>
                                    {myList.movies.map(movie => (
                                        <article key={`movie-${movie.id}`} className={styles.movieItem}>
                                            <button
                                                type="button"
                                                className={styles.openMovie}
                                                onClick={() => handleMovieClick(movie, 'movie')}
                                                aria-label={`View ${movie.title || movie.name || 'movie'}`}
                                            >
                                                {movie.poster_path ? (
                                                    <img
                                                        src={movie.poster_path.startsWith('http')
                                                            ? movie.poster_path
                                                            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                        alt=""
                                                        className={styles.moviePoster}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className={styles.posterPlaceholder}>Poster unavailable</span>
                                                )}
                                                <span className={styles.movieTitle}>{movie.title || movie.name || 'Untitled movie'}</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.deleteButton}
                                                aria-label={`Remove ${movie.title || movie.name || 'movie'} from My List`}
                                                onClick={() => handleDelete(movie.id, 'movie')}
                                            >
                                                <FaTrash />
                                            </button>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.emptySection}>No movies saved yet.</p>
                            )}
                        </section>

                        <section className={styles.section} aria-labelledby="saved-tv">
                            <div className={styles.sectionHeading}>
                                <h2 id="saved-tv">TV Shows</h2>
                                <span>{myList.tvShows.length}</span>
                            </div>
                            {myList.tvShows.length > 0 ? (
                                <div className={styles.grid}>
                                    {myList.tvShows.map(tvShow => (
                                        <article key={`tv-${tvShow.id}`} className={styles.movieItem}>
                                            <button
                                                type="button"
                                                className={styles.openMovie}
                                                onClick={() => handleMovieClick(tvShow, 'tv')}
                                                aria-label={`View ${tvShow.title || tvShow.name || 'TV show'}`}
                                            >
                                                {tvShow.poster_path ? (
                                                    <img
                                                        src={tvShow.poster_path.startsWith('http')
                                                            ? tvShow.poster_path
                                                            : `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                                        alt=""
                                                        className={styles.moviePoster}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className={styles.posterPlaceholder}>Poster unavailable</span>
                                                )}
                                                <span className={styles.movieTitle}>{tvShow.title || tvShow.name || 'Untitled show'}</span>
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.deleteButton}
                                                aria-label={`Remove ${tvShow.title || tvShow.name || 'TV show'} from My List`}
                                                onClick={() => handleDelete(tvShow.id, 'tv')}
                                            >
                                                <FaTrash />
                                            </button>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.emptySection}>No TV shows saved yet.</p>
                            )}
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default MyListPage;
