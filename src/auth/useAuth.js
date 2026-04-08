import { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth';

export const useAuth = () => {
    // Initialize from localStorage if present to survive refreshes
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('local_admin_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        try {
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                if (firebaseUser) {
                    setUser(firebaseUser);
                    localStorage.removeItem('local_admin_user'); // Prefer Firebase user if active
                } else {
                    // Start: Persist fix - only clear if we don't have a local admin
                    const localUser = localStorage.getItem('local_admin_user');
                    if (!localUser) {
                        setUser(null);
                    }
                }
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
        console.log("Attempting login with:", email);

        if (email.trim() === 'shahzaib@gmail.com' && password.trim() === 'shahzaib@123') {
            console.log("Local admin matched");
            const adminUser = {
                uid: 'custom-admin',
                email: 'shahzaib@gmail.com',
                displayName: 'Shahzaib Admin',
                photoURL: 'https://ui-avatars.com/api/?name=Shahzaib+Admin&background=random'
            };
            setUser(adminUser);
            localStorage.setItem('local_admin_user', JSON.stringify(adminUser)); // Persist session
            setLoading(false);
            return;
        } else {
            console.log("Local creds did not match", email, password);
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
        localStorage.setItem('local_admin_user', JSON.stringify(demoUser)); // Persist session
        setLoading(false);
    };

    const logout = async () => {
        localStorage.removeItem('local_admin_user'); // Clear local session
        if (!auth) {
            setUser(null);
            return;
        }
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const isAdmin = user && (
        user.email === 'admin@blessingseduvisa.com' ||
        user.email === 'shahzaib@gmail.com'
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
