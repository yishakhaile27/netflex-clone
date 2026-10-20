import React from 'react';
import style from './SkeletonLoader.module.css';

const SkeletonLoader = () => {
    return (
        <div className={style.skeletonContainer}>
            <div className={style.skeletonPoster}></div>
            <div className={style.skeletonTitle}></div>
            <div className={style.skeletonDuration}></div>
        </div>
    );
};

export default SkeletonLoader;
