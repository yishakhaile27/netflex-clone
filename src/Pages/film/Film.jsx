import React, { useState } from 'react';
import style from './Film.module.css';
import '../../style/checkbox.css'
import Movieslist from '../../components/Movie-List/Movie_list';
import requests from '../../Api/Requests';
import MovieNav from '../../components/Movie-Nav/Movie_Nav';

const Film = () => {
    const [selectedGenre, setSelectedGenre] = useState('Action');

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.id);
    };

    return (
        <div className={style.film}>
            <div className={style.Nav}>
                <MovieNav />
            </div>
            <div className={style.film_genre}>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Action" checked={selectedGenre === 'Action'} onChange={handleGenreChange} />
                    <label htmlFor="Action">Action</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Adventure" checked={selectedGenre === 'Adventure'} onChange={handleGenreChange} />
                    <label htmlFor="Adventure">Adventure</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Animation" checked={selectedGenre === 'Animation'} onChange={handleGenreChange} />
                    <label htmlFor="Animation">Animation</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Comedy" checked={selectedGenre === 'Comedy'} onChange={handleGenreChange} />
                    <label htmlFor="Comedy">Comedy</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Crime" checked={selectedGenre === 'Crime'} onChange={handleGenreChange} />
                    <label htmlFor="Crime">Crime</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Documentary" checked={selectedGenre === 'Documentary'} onChange={handleGenreChange} />
                    <label htmlFor="Documentary">Documentary</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Drama" checked={selectedGenre === 'Drama'} onChange={handleGenreChange} />
                    <label htmlFor="Drama">Drama</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Family" checked={selectedGenre === 'Family'} onChange={handleGenreChange} />
                    <label htmlFor="Family">Family</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Fantasy" checked={selectedGenre === 'Fantasy'} onChange={handleGenreChange} />
                    <label htmlFor="Fantasy">Fantasy</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="History" checked={selectedGenre === 'History'} onChange={handleGenreChange} />
                    <label htmlFor="History">History</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Horror" checked={selectedGenre === 'Horror'} onChange={handleGenreChange} />
                    <label htmlFor="Horror">Horror</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Music" checked={selectedGenre === 'Music'} onChange={handleGenreChange} />
                    <label htmlFor="Music">Music</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Mystery" checked={selectedGenre === 'Mystery'} onChange={handleGenreChange} />
                    <label htmlFor="Mystery">Mystery</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Romance" checked={selectedGenre === 'Romance'} onChange={handleGenreChange} />
                    <label htmlFor="Romance">Romance</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Science" checked={selectedGenre === 'Science'} onChange={handleGenreChange} />
                    <label htmlFor="Science">Science Fiction</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="TV" checked={selectedGenre === 'TV'} onChange={handleGenreChange} />
                    <label htmlFor="TV">TV Movie</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Thriller" checked={selectedGenre === 'Thriller'} onChange={handleGenreChange} />
                    <label htmlFor="Thriller">Thriller</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="War" checked={selectedGenre === 'War'} onChange={handleGenreChange} />
                    <label htmlFor="War">War</label>
                </div>
                <div className={style.checkmark}>
                    <input className='checkmark' type="checkbox" name="genre" id="Western" checked={selectedGenre === 'Western'} onChange={handleGenreChange} />
                    <label htmlFor="Western">Western</label>
                </div>
            </div>
            <div className={style.allmovies}>
                {selectedGenre === 'Action' && <Movieslist title="Action" fetchUrl={requests.fetchActionMovies} LargePosterRow />}
                {selectedGenre === 'Adventure' && <Movieslist title="Adventure" fetchUrl={requests.fetchAdventureMovies} LargePosterRow />}
                {selectedGenre === 'Animation' && <Movieslist title="Animation" fetchUrl={requests.fetchAnimationMovies} LargePosterRow />}
                {selectedGenre === 'Comedy' && <Movieslist title="Comedy" fetchUrl={requests.fetchComedyMovies} LargePosterRow />}
                {selectedGenre === 'Crime' && <Movieslist title="Crime" fetchUrl={requests.fetchCrimeMovies} LargePosterRow />}
                {selectedGenre === 'Documentary' && <Movieslist title="Documentary" fetchUrl={requests.fetchDocumentaryMovies} LargePoster />}
                {selectedGenre === 'Drama' && <Movieslist title="Drama" fetchUrl={requests.fetchDramaMovies} LargePoster />}
                {selectedGenre === 'Family' && <Movieslist title="Family" fetchUrl={requests.fetchFamilyMovies} LargePosterRow />}
                {selectedGenre === 'Fantasy' && <Movieslist title="Fantasy" fetchUrl={requests.fetchFantasyMovies} LargePoster />}
                {selectedGenre === 'History' && <Movieslist title="History" fetchUrl={requests.fetchHistoryMovies} LargePosterRow />}
                {selectedGenre === 'Horror' && <Movieslist title="Horror" fetchUrl={requests.fetchHorrorMovies} LargePosterRow />}
                {selectedGenre === 'Music' && <Movieslist title="Music" fetchUrl={requests.fetchMusicMovies} LargePosterRow />}
                {selectedGenre === 'Mystery' && <Movieslist title="Mystery" fetchUrl={requests.fetchMysteryMovies} LargePosterRow />}
                {selectedGenre === 'Romance' && <Movieslist title="Romance" fetchUrl={requests.fetchRomanceMovies} LargePosterRow />}
                {selectedGenre === 'Science' && <Movieslist title="Science Fiction" fetchUrl={requests.fetchScienceFictionMovies} LargePosterRow />}
                {selectedGenre === 'TV' && <Movieslist title="TV Movie" fetchUrl={requests.fetchTVMovies} LargePosterRow />}
                {selectedGenre === 'Thriller' && <Movieslist title="Thriller" fetchUrl={requests.fetchThrillerMovies} LargePosterRow />}
                {selectedGenre === 'War' && <Movieslist title="War" fetchUrl={requests.fetchWarMovies} LargePosterRow />}
                {selectedGenre === 'Western' && <Movieslist title="Western" fetchUrl={requests.fetchWesternMovies} LargePosterRow />}
            </div>
        </div>
    );
}

export default Film;
