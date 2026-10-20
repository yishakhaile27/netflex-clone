import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TabTitel } from '../components/Script/title';
import { EmailProvider } from '../Context/email_context';
import { ProtectedRoute } from './protected_route';
import { auth } from '../Services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Main from '../Pages/Home/Home';
import SignIn from '../Pages/SignIn/SignIn';
import Forgot from '../Pages/Forgot/Forgot';
import RegisterInfo from '../Pages/Register-Info/Register-Info';
import Register from '../Pages/Register-Form/Register-Form';
import PackageInfo from '../Pages/Package-Info/Package-Info';
import Package from '../Pages/Package/SignUp-Pack';
import ChooseAvater from '../Pages/Avater/Choose-Avater';
import Profile from '../Pages/Profile/profile';
import SignOut from '../Pages/SignOut/SignOut';
import Movie from '../Pages/Movie-Main/Movie_Main';
import Found404 from '../Pages/Found-404/Found-404';
import ProfileChange from '../Pages/Profile-Change/Profile-Change';
import OTPVerification from '../Pages/Phone-Number/Phone-Number';
import PasswordChange from '../Pages/Password-Change/Password-Change';
import UsernameChange from '../Pages/Username-Change/Username-Change';
import Trailer from '../Pages/Movie-Trailer & Info/Trailer';
import MyList from '../Pages/My-List/MyList';
import { AuthProvider } from '../Context/AuthContext';
import Filter from '../Pages/Movie-Filter/Movie-Filter';
import Film from '../Pages/film/Film';
import Tvshows from '../Pages/TV-Shows/TV-Shows';

const Routing = () => {
    TabTitel('Netflix');

    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setIsFetching(false);
        });

        return unsubscribe;
    }, []);

    if (isFetching) {
        return <div className="auth-loading" role="status">Loading Netflix...</div>;
    }

    return (
        <EmailProvider>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/forgot-password' element={<Forgot />} />
                    <Route path='/signup/registration' element={<RegisterInfo />} />
                    <Route path='/signup/regform' element={<Register />} />
                    <Route path='/expackage-info' element={<ProtectedRoute user={user}><PackageInfo /></ProtectedRoute>} />
                    <Route path='/expackage-choose' element={<ProtectedRoute user={user}><Package /></ProtectedRoute>} />
                    <Route path='/choose-avater' element={<ProtectedRoute user={user}><ChooseAvater /></ProtectedRoute>} />
                    <Route path='/profile' element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
                    <Route path='/profile/password' element={<ProtectedRoute user={user}><PasswordChange /></ProtectedRoute>} />
                    <Route path='/profile/phonenumber' element={<ProtectedRoute user={user}><OTPVerification /></ProtectedRoute>} />
                    <Route path='/profile/picture' element={<ProtectedRoute user={user}><ProfileChange /></ProtectedRoute>} />
                    <Route path='/profile/username' element={<ProtectedRoute user={user}><UsernameChange /></ProtectedRoute>} />
                    <Route path='/logout' element={<SignOut />} />
                    <Route path='/movies' element={<ProtectedRoute user={user}><Movie /></ProtectedRoute>} />
                    <Route path='/trailer/:type/:movieName' element={<ProtectedRoute user={user}><Trailer /></ProtectedRoute>} />
                    <Route path='/movies/my-list' element={<ProtectedRoute user={user}><MyList /></ProtectedRoute>} />
                    <Route path='/movies/filter' element={<ProtectedRoute user={user}><Filter /></ProtectedRoute>} />
                    <Route path='/movies/film' element={<ProtectedRoute user={user}><Film /></ProtectedRoute>} />
                    <Route path='/movies/tv' element={<ProtectedRoute user={user}><Tvshows /></ProtectedRoute>} />
                    <Route path='*' element={<Found404 />} />
                </Routes>
            </Router>
        </AuthProvider>
        </EmailProvider>
    );
}

export default Routing;
