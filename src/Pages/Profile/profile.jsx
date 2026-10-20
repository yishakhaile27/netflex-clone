import React, { useState, useEffect } from 'react';
import style from './profile.module.css'
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../Services/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FaEdit } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaCircleUser } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { FiSmartphone } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { SlLock } from "react-icons/sl";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturename, setProfilePicturename] = useState(null);
    const [packageName, setpackageName] = useState(null);
    const [packageDate, setpackageDate] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfilePicture(data.avaterInfo?.picture);
                    setProfilePicturename(data.avaterInfo?.name);
                    setpackageName(data.packageInfo?.name);
                    setpackageDate(data.packageInfo?.selectedDate);
                    setUsername(data.username);
                    setEmail(data.email);
                }
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            fetchProfileData(user);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/logout');
    };

    const packageBackgrounds = {
        Premium: style.premiumBackground,
        Standard: style.standardBackground,
        Basic: style.basicBackground,
        Mobile: style.mobileBackground,
    };

    const handleDeleteAccount = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const confirmed = await Swal.fire({
                    title: 'Delete Account',
                    text: 'Are you sure you want to delete your account? This action cannot be undone.',
                    icon: 'warning',
                    iconColor:'#cd0a0a',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                });
                if (confirmed.isConfirmed) {
                    await deleteDoc(doc(db, 'users', user.uid));
                    await user.delete();
                    Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
                    navigate('/');
                }
            } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'Failed to delete your account.', 'error');
            }
        }
    };

    return (
        <div className={style.profile}>
            <SignUpNav />
            <ToastContainer />
            <div className={style.profile_container}>
                <Link className={style.back_arrow} to="/movies">
                    <FaArrowLeftLong /><p>Back To Netflix</p>
                </Link>
                <div className={style.profile_main_container}>
                    <h1>Setting</h1>
                    <div className={style.profile_img}>
                        <div className={style.edit}>
                            <Link to="picture" ><span><FaEdit /></span></Link>
                            <div>
                                {profilePicture ? (
                                    <div>
                                        <img src={profilePicture} alt="Profile" />
                                    </div>
                                ) : (
                                    <div className={style.profile_icon}><FaCircleUser /></div>
                                )}
                            </div>
                        </div>
                        <div className={style.profile_text}>
                            <h4>{username} {profilePicturename ? (<span>({profilePicturename})</span>) : (null)}</h4>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className={style.br}></div>
                    {packageDate && packageName ? (
                    <div className={style.membership}>
                        <h3>Membership Details</h3>
                        <div className={style.membership_box}>
                            <div className={`${style.membership_date} ${packageName ? packageBackgrounds[packageName] : ''}`}>
                                <p>Member since {packageDate}</p>
                            </div>
                            <div className={style.membership_text}>
                                <h2>{packageName} plan</h2>
                                <p>This is not a paid membership, it's just a sample of your choice.</p>
                                <div className={style.br}></div>
                                <Link to="/expackage-choose"><a>Change plan</a></Link>
                            </div>
                        </div>
                    </div>
                    ) : (null)}
                    <div className={style.quicklinks}>
                        <h3>Quick Links</h3>
                        <div className={style.quicklinks_box}>
                            <Link to="password"><p><SlLock /> Update password</p><RiArrowRightSLine /></Link>
                            <div className={style.br}></div>
                            <Link to="phonenumber"><p><FiSmartphone /> Add Phone Number</p><RiArrowRightSLine /></Link>
                            <div className={style.br}></div>
                            <Link to="username"><p><MdDriveFileRenameOutline /> Change Username</p><RiArrowRightSLine /></Link>
                            <div className={style.br}></div>
                            <Link to="picture"><p><FiUser /> Change Profile</p><RiArrowRightSLine /></Link>
                        </div>
                    </div>
                    <button className={style.signout} onClick={handleSignOut}>Sign Out</button>
                    <div className={style.brs}></div>
                    <button className={style.delete} onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
