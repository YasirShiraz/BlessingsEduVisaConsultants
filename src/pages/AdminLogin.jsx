import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, GraduationCap, ChevronRight, Globe2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginWithEmail, loginWithDemo } = useAuth();
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
        <div className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -ml-48 -mb-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl relative z-10">

                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-navy/40 border-r border-white/5 relative">
                    <div className="absolute inset-0 opacity-10">
                        <Globe2 className="w-[400px] h-[400px] absolute -bottom-20 -left-20" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative z-10"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-gold p-2 rounded-xl">
                                <GraduationCap size={32} className="text-navy" />
                            </div>
                            <span className="text-2xl font-black text-white">Blessings <span className="text-gold">EduVisa</span></span>
                        </div>
                        <h2 className="text-5xl font-black text-white leading-tight mb-6">
                            Global Access <br />
                            <span className="text-gold">Admin Portal</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xs leading-relaxed">
                            Join our network of expert consultants and help students achieve their international dreams.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6 relative z-10">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <ShieldCheck className="text-gold mb-2" size={24} />
                            <p className="text-white font-bold text-sm">Secure Sign-in</p>
                            <p className="text-gray-500 text-xs">256-bit Encryption</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                            <Globe2 className="text-gold mb-2" size={24} />
                            <p className="text-white font-bold text-sm">Real-time Data</p>
                            <p className="text-gray-500 text-xs">Global Sync</p>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-16 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="lg:hidden text-center mb-10">
                            <div className="bg-navy p-3 rounded-2xl inline-block mb-4 shadow-lg">
                                <GraduationCap size={40} className="text-gold" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-3xl font-black text-white mb-2">Welcome Back</h3>
                            <p className="text-gray-500 font-medium">Please enter your details to continue</p>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 text-red-400 p-4 rounded-2xl text-sm font-semibold mb-6 border border-red-500/20 italic"
                            >
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gold uppercase tracking-[0.2em] ml-1">Account Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus:border-gold outline-none transition-all text-white placeholder-white/20"
                                        placeholder="admin@blessingseduvisa.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gold uppercase tracking-[0.2em] ml-1">Security Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors" size={18} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-6 py-4 bg-white/5 rounded-2xl border border-white/10 focus:border-gold outline-none transition-all text-white placeholder-white/20"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gold hover:bg-white text-navy font-black py-4 rounded-2xl text-lg shadow-xl shadow-gold/10 flex justify-center items-center gap-3 transition-all active:scale-[0.98] group"
                            >
                                {loading ? 'Validating...' : (
                                    <>
                                        Authorize Access <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 flex flex-col items-center gap-6">
                            <div className="w-full flex items-center gap-4">
                                <div className="h-[1px] flex-grow bg-white/10"></div>
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Local Debug</span>
                                <div className="h-[1px] flex-grow bg-white/10"></div>
                            </div>

                            <button
                                onClick={() => {
                                    loginWithDemo();
                                    navigate('/admin');
                                }}
                                className="text-xs text-gray-400 hover:text-gold transition-colors font-bold uppercase tracking-wider flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                                Login with Demo Session
                            </button>

                            <button onClick={() => navigate('/')} className="text-sm text-white/40 hover:text-white transition-colors font-semibold">
                                ← Back to Main Site
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
