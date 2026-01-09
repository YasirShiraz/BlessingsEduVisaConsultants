import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, User, LogOut } from 'lucide-react';
import logo from '../assets/logo_final.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../auth/useAuth';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, loginWithGoogle, logout, isAdmin } = useAuth();
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Services', path: '/services' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Contact', path: '/contact' },
    ];

    if (location.pathname === '/admin') return null;

    return (
        <nav className="bg-white/80 backdrop-blur-xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] sticky top-0 z-[100] border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center h-24">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-white p-1 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-gray-100">
                            <img src={logo} alt="Blessings EduVisa" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-2xl tracking-tighter text-navy leading-none">
                                Blessings <span className="text-gold">EduVisa</span>
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mt-1">Consultants</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-black uppercase tracking-widest transition-all relative py-2 group ${location.pathname === link.path ? 'text-gold' : 'text-navy/60 hover:text-navy'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold transition-transform duration-300 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                            </Link>
                        ))}

                        <div className="flex items-center gap-6 ml-6 border-l border-gray-200 pl-8">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    {isAdmin && (
                                        <Link to="/admin" className="text-xs font-black uppercase tracking-widest text-gold hover:text-navy transition-colors">
                                            Admin
                                        </Link>
                                    )}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100"
                                    >
                                        <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                                        <button onClick={logout} className="text-[10px] font-black uppercase tracking-widest text-navy flex items-center gap-2">
                                            Logout <LogOut size={12} className="text-gold" />
                                        </button>
                                    </motion.div>
                                </div>
                            ) : (
                                <button
                                    onClick={loginWithGoogle}
                                    className="flex items-center gap-2 text-navy font-black uppercase tracking-widest text-xs hover:text-gold transition-colors"
                                >
                                    Login
                                </button>
                            )}
                            <Link to="/apply" className="btn-secondary px-8 py-3.5 text-sm font-black uppercase tracking-widest shadow-lg hover:shadow-gold/20 translate-y-0 active:translate-y-0.5">
                                Apply
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="lg:hidden text-navy" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-[-1] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-screen w-[300px] bg-white shadow-2xl z-[150] lg:hidden flex flex-col pt-24 pb-12 px-8"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-8 right-8 text-navy p-2 bg-gray-50 rounded-xl"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className={`text-2xl font-black tracking-tight ${location.pathname === link.path ? 'text-gold' : 'text-navy'}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto flex flex-col gap-6 border-t border-gray-100 pt-10">
                                {user ? (
                                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                                            <span className="font-bold text-navy truncate max-w-[120px]">{user.displayName}</span>
                                        </div>
                                        <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <LogOut size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={loginWithGoogle}
                                        className="btn-outline w-full flex justify-center items-center gap-2 py-4"
                                    >
                                        <User size={20} /> Student Login
                                    </button>
                                )}
                                <Link
                                    to="/apply"
                                    className="btn-secondary text-center py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-gold/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Apply Online
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
