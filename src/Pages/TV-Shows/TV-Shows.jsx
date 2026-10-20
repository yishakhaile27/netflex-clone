import React from 'react';
import style from './TV-Shows.module.css'
import MovieNav from '../../components/Movie-Nav/Movie_Nav';
import Movieslist from '../../components/Movie-List/Movie_list';
import requests from '../../Api/Requests';

const Tvshows = () => {
    return (
        <div>
            <div className={style.Nav}>
                <MovieNav />
            </div>
            <div className={style.allmovies}>
                <Movieslist title="Action" fetchUrl={requests.fetchActionTV} LargePosterRow/>
                <Movieslist title="Comedy" fetchUrl={requests.fetchComedyTV} LargePosterRow/>
                <Movieslist title="Animation" fetchUrl={requests.fetchAnimationTV} LargePosterRow/>
                <Movieslist title="Family" fetchUrl={requests.fetchFamilyTV} LargePosterRow/>
                <Movieslist title="Mystery" fetchUrl={requests.fetchMysteryTV} LargePosterRow/>
                <Movieslist title="Drama" fetchUrl={requests.fetchDramaTV} LargePosterRow/>
                <Movieslist title="Crime" fetchUrl={requests.fetchCrimeTV} LargePosterRow/>
            </div>
        </div>
    );
}

export default Tvshows;
