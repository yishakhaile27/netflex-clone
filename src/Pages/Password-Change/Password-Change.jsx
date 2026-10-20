import React, { useState } from 'react';
import style from './Password-Change.module.css'
import { auth } from '../../Services/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

function PasswordChange() {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [error, setError] = useState(null);
    const [authError, setAuthError] = useState(null);

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    };

    const toggleShowPassword = (field) => {
        setShowPasswords((prevShowPasswords) => ({
            ...prevShowPasswords,
            [field]: !prevShowPasswords[field]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            passwords.currentPassword
        );

        reauthenticateWithCredential(user, credential)
        .then(() => {
            return updatePassword(user, passwords.newPassword);
        })
        .then(() => {
            setPasswords({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        })
        .catch((error) => {
            setAuthError('Incorrect password');
        });
    };

    return (
        <div>
            <SignUpNav />
            <div className={`${'Quick'} ${style.Quick}`}>
                <h1>Change password</h1>
                <h2>Protect your account with a unique password at least 6 characters long.</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} className={`${'changepassword'} ${style.changepassword}`}>
                    <div className={`${'inputs'} ${style.inputs}`}>
                        <input
                            type={showPasswords.currentPassword ? "text" : "password"}
                            name="currentPassword"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                            required
                            placeholder='Current Password'
                        />
                        <button className={style.showpassword} type="button" onClick={() => toggleShowPassword('currentPassword')}>
                            {showPasswords.currentPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                        <div>
                            {authError && <p>{authError}</p>}
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                    </div>
                    <div className='inputs'>
                        <input
                            type={showPasswords.newPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            required
                            placeholder='New password (6-60 characters)'
                        />
                        <button className={style.showpassword} type="button" onClick={() => toggleShowPassword('newPassword')}>
                            {showPasswords.newPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <div className='inputs'>
                        <input
                            type={showPasswords.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwords.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder='Re-enter new password'
                        />
                        <button className={style.showpassword} type="button" onClick={() => toggleShowPassword('confirmPassword')}>
                            {showPasswords.confirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    <div>
                        <button className='save' type="submit" >Next</button>
                        <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordChange;
