import React from 'react';
import style from "./SignUp-Footer.module.css"

const SignUpFooter = () => {
    return (
        <div className={style.signup_foot}>
            <div className={style.signup_foot_list}>
                <a href="">Questions? Contact us.</a>
                <div className={style.row}>
                    <div className={style.col}><a href="">FAQ</a></div>
                    <div className={style.col}><a href="">Help Center</a></div>
                    <div className={style.col}><a href="">Netflix Shop</a></div>
                    <div className={style.col}><a href="">Terms of Use</a></div>
                    <div className={style.col}><a href="">Privacy</a></div>
                    <div className={style.col}><a href="">Cookie Preferences</a></div>
                    <div className={style.col}><a href="">Corporate Information</a></div>
                </div>
            </div>
        </div>
    );
}

export default SignUpFooter;
