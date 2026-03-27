import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // 🔥 loading states (important)
  const [loading, setLoading] = useState(true);


  const axiosPublic = useAxiosPublic();

  // ===============================
  // 🔐 SIGN UP
  // ===============================
  const signUp = async (email, password) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔐 SIGN IN (with remember me)
  // ===============================
  const signIn = async (email, password, rememberMe) => {
    setLoading(true);
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;

    try {
      await setPersistence(auth, persistence);
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔁 RESET PASSWORD
  // ===============================
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // ===============================
  // 🔐 GOOGLE LOGIN
  // ===============================
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // ===============================
  // 🚪 LOGOUT
  // ===============================
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => {
      setUser(null);
      setUserRole(null);
      setLoading(false);
    });
  };

  // ===============================
  // 👤 UPDATE PROFILE
  // ===============================
  const updateUserProfile = async (profileData) => {
    setLoading(true);
    try {
      return await updateProfile(auth.currentUser, profileData);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 🔄 AUTH STATE CHANGE + ROLE FETCH async
  // ===============================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
           setLoading(true);
            try {
                // ডাটাবেজ থেকে রোল এবং অন্যান্য তথ্য নিয়ে আসা
                const res = await axiosPublic.get(`/users/${currentUser.email}`);
                setUserRole(res.data);
            } catch (error) {
                console.error("Role fetch failed:", error);
                setUserRole({ role: "user" }); // এরর হলেও সেফ সাইড 'user'
            } finally {
                setLoading(false);
            }
       } else {
            setUserRole(null);
            setLoading(false);
        }

    });

    return () => unsubscribe();
  }, [axiosPublic]);

  // ===============================
  // 📦 CONTEXT VALUE
  // ===============================
  const authInfo = {
    user,
    setUser,
    userRole,
    loading,
    signUp,
    signIn,
    resetPassword,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


//propstype off

AuthProvider.propTypes = {
  children: PropTypes.node,
};
