import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import style from './home_nav.module.css';
import logo from '../../Assets/Image/logo.png';

const HomeNav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/logout');
    };

    return (
        <div className={style.navs}>
            <nav>
                <abbr title='Natflix Home'>
                    <img className={style.logo} src={logo} alt="logo" />
                </abbr>
                {isLoggedIn ? (
                    <button className={style.sign} onClick={handleSignOut}>Sign Out</button>
                ) : (
                    <Link to="/signin">
                        <button className={style.sign}>Sign In</button>
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default HomeNav;
