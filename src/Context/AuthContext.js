import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../Services/firebase'; // Update import path if necessary
import { arrayUnion, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    const addToMyList = async (movie) => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            try {
                await updateDoc(userRef, {
                    myList: arrayUnion(movie)
                });
            } catch (error) {
                console.error('Error adding to list:', error);
            }
        }
    };


    return (
        <AuthContext.Provider value={{ currentUser, addToMyList }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
