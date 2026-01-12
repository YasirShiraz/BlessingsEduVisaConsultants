import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, GraduationCap, Star, Globe2 } from 'lucide-react';
import heroImg from '../assets/hero.png';
import { useData } from '../context/DataContext';

const Hero = () => {
    const { stats } = useData();
    return (
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white space-y-6 md:space-y-8 py-8 md:py-12"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-brandgreen/10 backdrop-blur-xl border border-brandgreen/20 text-brandgreen font-bold text-[10px] md:text-sm tracking-wide shadow-2xl"
                    >
                        <span className="relative flex h-2 md:h-3 w-2 md:w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandgreen opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 md:h-3 w-2 md:w-3 bg-brandgreen"></span>
                        </span>
                        AUTHORIZED GLOBAL PARTNER
                    </motion.div>

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] md:leading-[1.05] tracking-tight">
                        Design Your <br />
                        <span className="text-brandgreen bg-clip-text">Global Future</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed font-medium">
                        Navigating the complexities of international admissions. From selecting the perfect university to securing your visa, we are with you at every step.
                    </p>

                    <div className="flex flex-wrap gap-4 md:gap-5 pt-2 md:pt-4">
                        <Link to="/apply" className="group btn-secondary flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 text-base md:text-lg hover:scale-105 transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                            Apply Online <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/about" className="flex items-center gap-3 md:gap-4 text-white font-bold hover:text-gold transition-all px-2 group">
                            <div className="w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-gold/10 group-hover:border-gold transition-all">
                                <Play size={18} className="text-gold" fill="currentColor" />
                            </div>
                            <span className="text-sm md:text-base">How It Works</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10 border-t border-white/10">
                        <div>
                            <p className="text-3xl md:text-4xl font-black text-white">
                                {stats.find(s => s.key === 'universities')?.value || '500+'}
                            </p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                                {stats.find(s => s.key === 'universities')?.label || 'Partners'}
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-black text-white">
                                {stats.find(s => s.key === 'success_stories')?.value || '99.8%'}
                            </p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                                {stats.find(s => s.key === 'success_stories')?.label || 'Visa Rate'}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-4xl font-black text-white">
                                {stats.find(s => s.key === 'years')?.value || '15+'}
                            </p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                                {stats.find(s => s.key === 'years')?.label || 'Years XP'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    {/* Hero Image Frame */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gold/30 rounded-[3rem] blur-2xl group-hover:bg-gold/40 transition-all duration-500 opacity-50"></div>
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-navy-light">
                            <img
                                src={heroImg}
                                alt="Global Education"
                                className="w-full h-full object-cover aspect-[4/5] scale-105 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Floating Trust Labels */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 bg-white p-5 rounded-3xl shadow-2xl z-20 flex items-center gap-4 border border-gray-100"
                        >
                            <div className="bg-gold/10 p-3 rounded-2xl text-gold">
                                <Star size={28} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Student Rating</p>
                                <p className="text-xl font-black text-navy">4.9/5.0</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 bg-navy-dark border border-white/10 p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 backdrop-blur-2xl bg-white/5"
                        >
                            <div className="bg-navy p-3 rounded-2xl text-gold border border-white/5 shadow-inner">
                                <Globe2 size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Reach</p>
                                <p className="text-xl font-bold text-white tracking-tight">25+ Countries</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
