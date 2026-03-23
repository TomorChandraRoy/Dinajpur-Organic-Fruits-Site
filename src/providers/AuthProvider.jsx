import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,GoogleAuthProvider,signInWithPopup, updateProfile,sendPasswordResetEmail, browserLocalPersistence, browserSessionPersistence, setPersistence,signOut} from 'firebase/auth';
import auth from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] =useState(null);
    //loading spanner
    const [loading, setLoading] =useState(false);

    //CREATE AUTH
    const signUp = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        .finally(() => setLoading(false));
    };

    // LOGIN AUTH
    const signIn = async (email, password,rememberMe)=>{
        setLoading(true);
        // যদি rememberMe true হয় তবে local, নয়তো session
        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        return setPersistence(auth, persistence).then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    })
    .finally(() => setLoading(false));
    }
    //PassWord Reset
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

   //  Google login
   const signInWithGoogle =()=>{
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
   }

   const logOut = () =>{
    setLoading(true);
    return signOut(auth);
   }

    // AuthProvider.jsx এর ভেতরে এটি ব্যবহার করুন
    const updateUserProfile = (profileData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profileData)
        .finally(() => setLoading(false));
    };

   useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser);
        setLoading(false);
    });
    return () =>{
        unSubscribe();
    }
   },[]);

    const authInfo = {
     user,
     setUser,
     updateUserProfile,
     signUp,
     signIn,
     resetPassword,
     signInWithGoogle,
     logOut,
     loading,
    }

    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};
export default AuthProvider;

AuthProvider.propTypes ={
    children:PropTypes.node
}


