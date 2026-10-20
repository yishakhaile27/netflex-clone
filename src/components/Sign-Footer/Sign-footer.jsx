import React from 'react';
import style from './Sign-footer.module.css'

const SignFooter = () => {
    return (
        <div>
            <footer className={style.foot}>
                <a className={style.questions}>Questions? Contact us.</a>
                <div className={style.container}>
                    <div className={style.row}>
                        <div className={style.col}><a>FAQ</a></div>
                        <div className={style.col}><a>Help Center</a></div>
                        <div className={style.col}><a>Terms of Use</a></div>
                        <div className={style.col}><a>Privacy</a></div>
                        <div className={style.col}><a>Cookie Preferences</a></div>
                        <div className={style.col}><a>Corporate Information</a></div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default SignFooter;
