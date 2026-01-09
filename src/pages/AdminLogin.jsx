import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, GraduationCap } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginWithEmail } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await loginWithEmail(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Invalid credentials or unauthorized access.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <div className="bg-navy p-3 rounded-2xl inline-block mb-4 shadow-lg">
                        <GraduationCap size={40} className="text-gold" />
                    </div>
                    <h1 className="text-3xl font-bold text-navy">Admin Portal</h1>
                    <p className="text-gray-500 mt-2">Sign in to manage applications</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold mb-6 border border-red-100 italic">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-gold outline-none transition-all"
                                placeholder="admin@blessingseduvisa.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-navy uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-gold outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-5 text-lg shadow-lg flex justify-center items-center gap-3"
                    >
                        {loading ? 'Authenticating...' : 'Sign In Now'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-navy transition-colors font-semibold">
                        ← Return to Main Website
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
