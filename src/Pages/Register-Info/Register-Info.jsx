import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Register-Info.module.css"
import device from "../../Assets/Image/Devices.png"
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import SignUpFooter from '../../components/Register-Footer/SignUp-Footer';

const RegisterInfo = () => {
    return (
        <div>
            <SignUpNav />
            <div className={style.register_info}>
                <div className={style.register_info_container}>
                    <img src={device} alt="" />
                    <span>STEP 1 OF 3</span>
                    <h1>Finish setting up your account</h1>
                    <p>Netflix is personalized for you. Create a password to watch on any device at any time.</p>
                    <Link to="/signup/regform">
                        <button> Next </button>
                    </Link>
                </div>
            </div>
            <SignUpFooter />
        </div>
    );
}

export default RegisterInfo;
