import { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        try {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoading(false);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Auth state changed error:", error);
            setLoading(false);
        }
    }, []);

    const loginWithGoogle = async () => {
        if (!auth) {
            alert("Firebase is not configured. Please add your credentials in src/auth/firebase.js");
            return;
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    const loginWithEmail = async (email, password) => {
        if (!auth) {
            alert("Firebase is not configured.");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email Login Error:", error);
            throw error;
        }
    };

    const logout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const isAdmin = user && user.email === 'admin@blessingseduvisa.com'; // Example admin check

    return {
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        logout,
        isAdmin
    };
};
