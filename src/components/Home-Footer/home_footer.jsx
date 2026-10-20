import React from 'react';
import style from "./home_footer.module.css"
import LocationTracker from '../Script/location_tracker';

function HomeFooter() {
    const { countryName } = LocationTracker();
    return (
        <footer className={style.main_footer}>
            <div className={style.Information}>
                <a className={style.questions}>Questions? Contact us.</a>
                <div className={style.row}>
                    <div className={style.col}><a>FAQ</a></div>
                    <div className={style.col}><a>Help Center</a></div>
                    <div className={style.col}><a>Account</a></div>
                    <div className={style.col}><a>Media Center</a></div>
                    <div className={style.col}><a>Investor Relations</a></div>
                    <div className={style.col}><a>Jobs</a></div>
                    <div className={style.col}><a>Ways to Watch</a></div>
                    <div className={style.col}><a>Terms of Use</a></div>
                    <div className={style.col}><a>Privacy</a></div>
                    <div className={style.col}><a>Cookie Preferences</a></div>
                    <div className={style.col}><a>Corporate Information</a></div>
                    <div className={style.col}><a>Contact Us</a></div>
                    <div className={style.col}><a>Speed Test</a></div>
                    <div className={style.col}><a>Legal Notices</a></div>
                    <div className={style.col}><a>Only on Netflix</a></div>
                </div>
                <p>Natflix {countryName}</p>
            </div>
        </footer>
    );
}

export default HomeFooter;
