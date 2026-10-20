import React, { useState, useEffect } from 'react';
import style from "./Home.module.css";
import LocationTracker from '../../components/Script/location_tracker';
import HomeNav from '../../components/Home-Nav/home_nav';
import Signup from "../../components/Signup-check/Signup";
import HomeSection from '../../components/Home-Section/home_section';
import HomeFooter from '../../components/Home-Footer/home_footer';
const Home = () => {
    const { countryName } = LocationTracker();
    useEffect(() => {
        document.title = `Netflix ${countryName} - Watch TV Shows Online, Watch Movies Online`;
    }, [countryName]);

    return (
        <div className={style.main}>
            <header>
                <HomeNav />
                <div className={style.info}>
                    <div className={style.info_text}>
                        <h1>Unlimited movies, TV shows, and more</h1>
                        <p>Watch anywhere. Cancel anytime.</p>
                    </div>
                    <Signup />
                </div>
            </header>
            <HomeSection />
            <HomeFooter />
        </div>
    );
};

export default Home;
