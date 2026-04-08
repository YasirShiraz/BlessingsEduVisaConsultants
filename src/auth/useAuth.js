import { useState } from 'react';

// ✅ Fully Local Auth — No Firebase Required
const ADMIN_CREDENTIALS = [
    { email: 'shahzaib@gmail.com', password: 'shahzaib@123', displayName: 'Shahzaib Admin' },
    { email: 'admin@blessingseduvisa.com', password: 'admin@123', displayName: 'Blessings Admin' },
];

export const useAuth = () => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('local_admin_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(false);

    const loginWithEmail = async (email, password) => {
        const matched = ADMIN_CREDENTIALS.find(
            (cred) => cred.email.trim() === email.trim() && cred.password.trim() === password.trim()
        );

        if (matched) {
            const adminUser = {
                uid: 'local-admin-' + Date.now(),
                email: matched.email,
                displayName: matched.displayName,
                photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(matched.displayName)}&background=random`
            };
            setUser(adminUser);
            localStorage.setItem('local_admin_user', JSON.stringify(adminUser));
            setLoading(false);
            return adminUser;
        } else {
            throw new Error('Invalid credentials');
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
        localStorage.setItem('local_admin_user', JSON.stringify(demoUser));
        setLoading(false);
    };

    const loginWithGoogle = () => {
        console.warn('Google login not configured. Using demo login.');
        loginWithDemo();
    };

    const logout = () => {
        localStorage.removeItem('local_admin_user');
        setUser(null);
    };

    const isAdmin = user && ADMIN_CREDENTIALS.some(c => c.email === user.email);

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
