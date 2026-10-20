import React, { useState, useEffect } from 'react';
import style from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { IoIosArrowForward } from 'react-icons/io';
import { FaSpinner } from 'react-icons/fa';
import { auth, db } from '../../Services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEmail } from '../../Context/email_context';

function Signup() {
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();
    const firebaseAuth = getAuth();
    const { setEmail } = useEmail(); // Use the context

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
            if (user) {
                fetchUserData(user.uid); // Fetch user data if logged in
            }
        });
        return () => unsubscribe();
    }, [firebaseAuth]);

    const fetchUserData = async (userId) => {
        try {
            const docRef = doc(db, 'users', userId); // 'users' should match your Firestore collection name
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data());
            }
        } catch (error) {
            setAuthError('Failed to fetch user data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setEmail(value);
        setErrors({});
        setAuthError(null)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is invalid';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true); // Start loading
            try {
                // Check if email is already registered
                const signInMethods = await fetchSignInMethodsForEmail(firebaseAuth, formData.email);
                if (signInMethods.length === 0) {
                    // Email is not registered, navigate to registration
                    navigate('/signup/registration');
                } else {
                    // Email is already registered
                    setAuthError('Email already registered');
                }
            } catch (error) {
                console.error('Error checking email registration:', error);
                setAuthError('Failed to check email registration');
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };


    const handleNavigate = () => {
        navigate(isLoggedIn ? '/movies' : '/signin');
    };

    return (
        <div className={style.signup_form}>
            {isLoggedIn && userDetails ? (
                <>
                    <h2 className={`${style.info} ${style.welcome}`}>Welcome back, {userDetails.username}!</h2>
                    <div className={style.signup}>
                        <button className={style.submit} onClick={handleNavigate}>
                            Go to Homepage <div><IoIosArrowForward /></div>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className={style.info}>Ready to watch? Enter your email to create or restart your membership.</p>
                    <form className={style.signup} onSubmit={handleSubmit}>
                        <input
                            className={style.email}
                            style={{ borderColor: errors.email ? '#eb3841' : null }}
                            type="email"
                            placeholder="Email address"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <button className={`${style.submit} ${style.submitb1}`} type="submit" disabled={loading}>
                            {loading ? <FaSpinner className={style.spinner} /> : <>Get Started <div><IoIosArrowForward /></div></>}
                        </button>
                    </form>
                    {errors.email && <span className={style.errorText}>{errors.email}</span>}
                    {authError && <span className={style.errorText}>{authError}</span>}
                </>
            )}
        </div>
    );
}

export default Signup;
