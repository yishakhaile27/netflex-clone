import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Found-404.module.css"
import logo from "../../Assets/Image/logo.png"

const Found404 = () => {
    return (
        <div className={style.Found404}>
            <nav className={style.nav}>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </nav>
            <div className={style.text_area}>
                <div className={style.text}>
                    <h1>Lost your way?</h1>
                    <p>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
                    <Link to="/movies">
                        <button> Netflix Home </button>
                    </Link>
                    <span className={style.code}> Error Code <strong>NSES-404</strong></span>
                </div>
                <p className={style.name}>FROM <strong>LOST IN SPACE</strong></p>
            </div>
        </div>
    );
}

export default Found404;
