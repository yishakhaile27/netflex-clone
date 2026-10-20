import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import style from "./SignUp-Nav.module.css"
import logo from "../../Assets/Image/logo.png"

const SignUpNav = () => {
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
        <div className={style.signup}>
            <nav>
                <Link to="/">
                        <img src={logo} alt="" />
                </Link>
                {isLoggedIn ? (
                    <a className={style.sign} onClick={handleSignOut}>Sign Out</a>
                ) : (
                    <Link to="/signin">
                        <a className={style.sign}>Sign In</a>
                    </Link>
                )}
            </nav>
        </div>
    );
}

export default SignUpNav;
