import React, { useState, useEffect } from 'react';
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Services/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential, onAuthStateChanged } from 'firebase/auth';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const UsernameChange = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [currentUsername, setCurrentUsername] = useState('');
    const [formData, setFormData] = useState({ newUsername: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const reauthenticate = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            const credential = EmailAuthProvider.credential(user.email, password);
            try {
                await reauthenticateWithCredential(user, credential);
                setStep(2);
                setErrors({});
            } catch (error) {
                setErrors({ message: error.message });
            }
        }
    };

    useEffect(() => {
        const fetchProfileData = async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setCurrentUsername(data.username || '');
                    }
                } catch (error) {
                    console.error("Error fetching profile data:", error.message);
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, fetchProfileData);
        return () => unsubscribe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { newUsername } = formData;

        if (!newUsername.trim()) {
            setErrors({ newUsername: 'Username is required' });
            return;
        }

        if (newUsername === currentUsername) {
            setErrors({ message: 'New username must be different from the current one' });
            return;
        }

        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                await setDoc(userDocRef, { username: newUsername }, { merge: true });
                navigate('/profile');
            }
        } catch (error) {
            setErrors({ message: 'Failed to change username' });
            console.error("Error changing username:", error.message);
        }
    };

    return (
        <div>
            <SignUpNav />
            <div className='Quick'>
                <h1>Change Username</h1>
                {step === 1 && (
                    <form onSubmit={reauthenticate} className='reauthenticate'>
                    <h2>Protect your account with a unique password.</h2>
                        <div className='inputs'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                placeholder='Current Password'
                            />
                            <button className='showpassword' type='button' onClick={toggleShowPassword}>
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                        <div>
                            <button className='save' type='submit'>Next</button>
                            <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleSubmit} className='changepassword'>
                        <h2>Complete your New Username.</h2>
                        <div className='inputs'>
                            <input
                                type='text'
                                name='currentUsername'
                                value={currentUsername}
                                placeholder='Current Username'
                                disabled
                            />
                        </div>
                        <div className='inputs'>
                            <input
                                type='text'
                                name='newUsername'
                                value={formData.newUsername}
                                onChange={handleChange}
                                placeholder='New Username'
                            />
                        </div>
                        <div>
                            <button className='save' type='submit'>Save</button>
                            <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                        </div>
                        {errors.message && <p className='error'>{errors.message}</p>}
                        {errors.newUsername && <p className='error'>{errors.newUsername}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default UsernameChange;
