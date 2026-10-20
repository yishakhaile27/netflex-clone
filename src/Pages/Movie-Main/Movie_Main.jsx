import React, { useState } from "react";
import style from "./Movie_Main.module.css"
import requests from '../../Api/Requests';
import Banner from '../../components/Movie-Banner/Banner';
import Nav from '../../components/Movie-Nav/Movie_Nav';
import Movieslist from '../../components/Movie-List/Movie_list';
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const Movie = () => {
    const [selectednet, setSelectedNet] = useState('netflixmov');
    const [selectedtrend, setSelectedTrend] = useState('trendmov');
    const [selectedtop, setSelectedTop] = useState('topmov');
    const [selectedcoming, setSelectedComing] = useState('comingmov');

    const handleNetChange = (e) => {
        setSelectedNet(e.target.id);
    };
    const handleTrendChange = (e) => {
        setSelectedTrend(e.target.id);
    };
    const handleTopChange = (e) => {
        setSelectedTop(e.target.id);
    };
    const handleComingChange = (e) => {
        setSelectedComing(e.target.id);
    };
    return (
        <div className={style.Moviemain}>
            <div className={style.Nav}>
                <Nav />
            </div>
            <div className={style.banner}>
                <Banner />
            </div>
            <div className={style.allmovies}>
                <div>
                    <div className={style.movie}>
                        <h1>Netflix Originals</h1>
                        <div className={style.movietype}>
                            <input type="radio" name="type" id="netflixmov" hidden checked={selectednet === 'netflixmov'} onChange={handleNetChange}/>
                            <label htmlFor="netflixmov">Movies</label>
                            <input type="radio" name="" id="netflixtv" hidden checked={selectednet === 'netflixtv'} onChange={handleNetChange}/>
                            <label htmlFor="netflixtv">TV Shows</label>
                        </div>
                    </div>
                    {selectednet === 'netflixmov' && <Movieslist fetchUrl={requests.fetchNetflixOriginals} LargePosterRow/>}
                    {selectednet === 'netflixtv' && <Movieslist fetchUrl={requests.fetchNetflixOriginalsTV} LargePosterRow/>}
                </div>

                <div>
                    <div className={style.movie}>
                        <h1>Trending</h1>
                        <div className={style.movietype}>
                            <input type="radio" name="" id="trendmov" hidden checked={selectedtrend === 'trendmov'} onChange={handleTrendChange}/>
                            <label htmlFor="trendmov">Movies</label>
                            <input type="radio" name="" id="trendtv" hidden checked={selectedtrend === 'trendtv'} onChange={handleTrendChange}/>
                            <label htmlFor="trendtv">TV Shows</label>
                        </div>
                    </div>
                    {selectedtrend === 'trendmov' && <Movieslist fetchUrl={requests.fetchTrending} LargePosterRow/>}
                    {selectedtrend === 'trendtv' && <Movieslist fetchUrl={requests.fetchTrendingTV} LargePosterRow/>}
                </div>

                <div>
                    <div className={style.movie}>
                        <h1>Top Rated</h1>
                        <div className={style.movietype}>
                            <input type="radio" name="" id="topmov" hidden checked={selectedtop === 'topmov'} onChange={handleTopChange}/>
                            <label htmlFor="topmov">Movies</label>
                            <input type="radio" name="" id="toptv" hidden checked={selectedtop === 'toptv'} onChange={handleTopChange}/>
                            <label htmlFor="toptv">TV Shows</label>
                        </div>
                    </div>
                    {selectedtop === 'topmov' && <Movieslist fetchUrl={requests.fetchTopRatedMovies} LargePosterRow/>}
                    {selectedtop === 'toptv' && <Movieslist fetchUrl={requests.fetchTopRatedTV} LargePosterRow/>}
                </div>

                <div>
                    <div className={style.movie}>
                        <h1>Coming Soon</h1>
                        <div className={style.movietype}>
                            <input type="radio" name="" id="comingmov" hidden checked={selectedcoming === 'comingmov'} onChange={handleComingChange}/>
                            <label htmlFor="comingmov">Movies</label>
                            <input type="radio" name="" id="comingtv" hidden checked={selectedcoming === 'comingtv'} onChange={handleComingChange}/>
                            <label htmlFor="comingtv">TV Shows</label>
                        </div>
                    </div>
                    {selectedcoming === 'comingmov' && <Movieslist fetchUrl={requests.fetchUpcomingMovies} LargePosterRow/>}
                    {selectedcoming === 'comingtv' && <Movieslist fetchUrl={requests.fetchUpcomingTV} LargePosterRow/>}
                </div>

                <div>
                    <div className={`${style.movie} ${style.moremovie}`}>
                        <h1>Movies</h1>
                        <Link to="/movies/film">
                            <button>See More <MdArrowOutward /></button>
                        </Link>
                    </div>
                    <Movieslist fetchUrl={requests.fetchAllMovies} LargePosterRow/>
                </div>

                <div>
                    <div className={`${style.movie} ${style.moremovie}`}>
                        <h1>TV Shows</h1>
                        <Link to="/movies/tv">
                            <button>See More <MdArrowOutward /></button>
                        </Link>
                    </div>
                    <Movieslist fetchUrl={requests.fetchAllTV} LargePosterRow />
                </div>
            </div>
        </div>
    );
}

export default Movie;
