import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from './SignIn.module.css';
import '../../style/checkbox.css';
import logo from '../../Assets/Image/logo.png';
import { auth } from '../../Services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FaSpinner } from 'react-icons/fa';
import SignFooter from '../../components/Sign-Footer/Sign-footer';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [authError, setAuthError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSecondParagraph, setShowSecondParagraph] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({});
        setAuthError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Email is invalid';
        }
        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password should be between 6 and 60 characters.';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            try {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                navigate(from, { replace: true }); // Redirect back to the page user came from
            } catch (error) {
                console.error('Sign in error:', error);
                setAuthError('Email or password is incorrect');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleShowSecondParagraph = () => {
        setShowSecondParagraph(true);
    };

    return (
        <div className={style.signin}>
            <div className={style.signin_form}>
                <Link to="/">
                    <img className={style.net} src={logo} alt="Logo" />
                </Link>
                <div className={style.form}>
                    <div className={style.login}>
                        <h1>Sign In</h1>
                        <form className={style.forms} onSubmit={handleSubmit}>
                            <input
                                className={style.input}
                                style={errors.email ? { borderColor: '#ba312f' } : null}
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                value={formData.email}
                                disabled={loading}
                            />
                            {errors.email && <span className={style.errorText}>{errors.email}</span>}
                            <input
                                className={style.input}
                                style={errors.password ? { borderColor: '#ba312f' } : null}
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                disabled={loading}
                            />
                            {errors.password && <span className={style.errorText}>{errors.password}</span>}
                            {authError && <span className={style.errorText}>{authError}</span>}
                            <button className={style.submit} type="submit" disabled={loading}>
                                {loading ? <FaSpinner className={style.spinner} /> : 'Sign In'}
                            </button>
                            <Link to="/forgot-password">Forgot password?</Link>
                            <div className={style.checkbox}>
                                <input className="checkmark" type="checkbox" id="rememberMe" defaultChecked />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                        </form>
                        <div>
                            <h4>New to Netflix? <Link to="/signup/registration">Sign up now.</Link></h4>
                            <p className={style.show}>
                                This page is protected by Google reCAPTCHA to ensure you're not a bot.
                                {!showSecondParagraph && (
                                    <span className={style.show_click} onClick={handleShowSecondParagraph}> Learn more.</span>
                                )}
                            </p>
                            {showSecondParagraph && (
                                <p className={style.show}>
                                    The information collected by Google reCAPTCHA is subject to the Google
                                    <a href="#"> Privacy Policy</a> and <a href="#"> Terms of Service</a>, and is used for providing, maintaining,
                                    and improving the reCAPTCHA service and for general security purposes (it is not used for personalized
                                    advertising by Google).
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SignFooter />
        </div>
    );
};

export default SignIn;
