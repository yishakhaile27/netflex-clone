import React from 'react';
import { Link } from 'react-router-dom';
import style from './Package-Info.module.css'
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import SignUpFooter from '../../components/Register-Footer/SignUp-Footer';
import check from '../../Assets/Image/Checkmark.png'
import { PiCheck } from "react-icons/pi";

const PackageInfo = () => {
    return (
        <div>
            <SignUpNav />
            <div className={style.package_info}>
                <div className={style.package_info_container}>
                    <img src={check} alt="" />
                    <span>STEP 2 OF 3</span>
                    <h1>Choose your plan.</h1>
                    <ul className={style.check}>
                        <li><PiCheck /><p>No commitments, cancel anytime.</p></li>
                        <li><PiCheck /><p>Everything on Netflix for one low price.</p></li>
                        <li><PiCheck /><p>No ads and no extra fees. Ever.</p></li>
                    </ul>
                    <Link to="/expackage-choose">
                        <button>Next</button>
                    </Link>
                </div>
            </div>
            <SignUpFooter />
        </div>
    );
}

export default PackageInfo;
