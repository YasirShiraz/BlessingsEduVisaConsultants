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
            // Fallback to Demo Login for Local/Offline usage
            console.warn("Firebase not configured. Logging in as Demo User.");
            loginWithDemo();
            return;
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    const loginWithEmail = async (email, password) => {
        // Local Custom Credential Check
        if (email === 'shahzib@gmail.com' && password === 'shahzab@123') {
            const adminUser = {
                uid: 'custom-admin',
                email: 'shahzib@gmail.com', // Matches the isAdmin check expectation if updated
                displayName: 'Shahzaib Admin',
                photoURL: 'https://ui-avatars.com/api/?name=Shahzaib+Admin&background=random'
            };
            setUser(adminUser);
            setLoading(false);
            return;
        }

        if (!auth) {
            console.warn("Firebase is not configured. Redirecting to local fallback.");
            throw new Error("Firebase unavailable");
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Email Login Error:", error);
            throw error;
        }
    };

    const loginWithDemo = () => {
        const demoUser = {
            uid: 'demo-admin',
            email: 'admin@blessingseduvisa.com',
            displayName: 'Demo Admin',
            photoURL: 'https://ui-avatars.com/api/?name=Admin+User'
        };
        setUser(demoUser);
        setLoading(false);
    };

    const logout = async () => {
        if (!auth) {
            setUser(null);
            return;
        }
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const isAdmin = user && (
        user.email === 'admin@blessingseduvisa.com' ||
        user.email === 'shahzib@gmail.com'
    );

    return {
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        loginWithDemo,
        logout,
        isAdmin
    };
};
