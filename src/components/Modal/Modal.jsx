// Modal.js
import React from 'react';
import style from './Model.module.css';

function Modal({ show, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
