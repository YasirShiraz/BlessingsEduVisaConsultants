import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const ProtectedRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-gold border-t-navy rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedRoute;
