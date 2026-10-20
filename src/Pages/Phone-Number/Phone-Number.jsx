import React, { useState } from 'react';
import style from './Phone-Number.module.css';
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import LocationTracker from '../../components/Script/location_tracker';
import { doc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { auth, db } from '../../Services/firebase';

const PhoneNumber = () => {
    const navigate = useNavigate();
    const { countryCode } = LocationTracker();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (value) => {
        setPhoneNumber(value);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!phoneNumber.trim()) {
            validationErrors.phonenumber = 'Phone number is required';
        } else if (!/^\+?[1-9]\d{9,14}$/.test(phoneNumber)) {
            validationErrors.phonenumber = 'Phone number is invalid';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            try {
                const user = auth.currentUser;
                const userDoc = doc(db, 'users', user.uid);
                await setDoc(userDoc, { phoneNumber: phoneNumber }, { merge: true });
                navigate('/profile');
            } catch (error) {
                console.error('Error saving phone number:', error);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div>
            <SignUpNav />
            <div className={`${'Quick'} ${style.Quick}`}>
                <h1>Add your mobile number</h1>
                <h2>Netflix uses your mobile number to text you important account messages, like texts to help you access and recover your account. Next, we'll send you a code to verify it.</h2>
                <form onSubmit={handleSubmit}>
                    <PhoneInput
                        country={countryCode}
                        onChange={handleChange}
                        value={phoneNumber}
                        inputProps={{
                            name: 'phonenumber',
                            required: true,
                        }}
                        containerClass={style.phoneInputContainer}
                    />
                    <span>Message and data rates may apply. Message frequency is variable.</span>
                    <div>
                        <button className='save' type="submit" disabled={loading}>Next</button>
                        <Link to='/profile'><button className='cancel'>Cancel</button></Link>
                    </div>
                    {errors.phonenumber && <p style={{ color: 'red' }}>{errors.phonenumber}</p>}
                </form>
            </div>
        </div>
    );
}

export default PhoneNumber;
