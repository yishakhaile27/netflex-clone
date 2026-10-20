import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../Services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import logo from "../../Assets/Image/logo.png";
import style from "./Forgot.module.css";
import { FaSpinner } from 'react-icons/fa';
import SignFooter from '../../components/Sign-Footer/Sign-footer';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setEmail(e.target.value.trim());
        setError('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError('Enter the email address associated with your account.');
            return;
        }

        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, trimmedEmail);
            setMessage('If an account exists for this email, a password reset link has been sent. Check your inbox.');
        } catch (error) {
            console.error('Password reset request failed:', error);
            if (error.code === 'auth/invalid-email') {
                setError('Enter a valid email address.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please wait a few minutes and try again.');
            } else {
                setError('We could not send the reset email. Check your connection and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.forgot}>
            <div className={style.forgot_form}>
                <Link to="/">
                    <img className={style.net} src={logo} alt="Logo" />
                </Link>
                <div className={style.form}>
                    <div className={style.reset}>
                        <h1>Password Reset</h1>
                        <p className={style.description}>Enter your email address and we’ll send you a link to reset your password.</p>
                        <form className={style.forms} onSubmit={handleSubmit}>
                            <input
                                className={style.input}
                                type='email'
                                name="email"
                                autoComplete="email"
                                aria-label="Email address"
                                aria-invalid={Boolean(error)}
                                aria-describedby={error ? 'forgot-error' : message ? 'forgot-message' : undefined}
                                placeholder='Email address'
                                value={email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                            <button className={style.submit} type='submit' disabled={loading || !email.trim()}>
                                {loading ? <FaSpinner className={style.spinner} /> : 'Submit'}
                            </button>
                        </form>
                        {message && <p id="forgot-message" className={style.message} role="status">{message}</p>}
                        {error && <p id="forgot-error" className={style.error} role="alert">{error}</p>}
                        <Link className={style.backToSignIn} to="/signin">Back to sign in</Link>
                    </div>
                </div>
                <SignFooter />
            </div>
        </div>
    );
}

export default Forgot;
