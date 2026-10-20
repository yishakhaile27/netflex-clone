import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './SignOut.module.css';
import SignFooter from '../../components/Sign-Footer/Sign-footer';
import HomeNav from '../../components/Home-Nav/home_nav';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 30000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={style.logout}>
            <HomeNav />
            <div className={style.logout_container}>
                <div className={style.logout_info}>
                    <h1 className={style.title}>Leaving So Soon?</h1>
                    <p className={style.text}>Just so you know, you don't always need to sign out of Netflix. It's only necessary if you're on a shared or public computer.</p>
                    <p>You'll be redirected to Netflix.com in 30 seconds.</p>
                    <Link to="/">
                        <button>Go Now</button>
                    </Link>
                </div>
            </div>
            <SignFooter />
        </div>
    );
}

export default SignOut;
