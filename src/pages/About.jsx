import { motion } from 'framer-motion';
import { ShieldCheck, Target, Users, Award, CheckCircle2, Globe2, Heart, Zap } from 'lucide-react';

const About = () => {
    const stats = [
        { label: 'Success Rate', value: '99.8%', icon: ShieldCheck },
        { label: 'Students Placed', value: '5000+', icon: Users },
        { label: 'Partner Universities', value: '500+', icon: Award },
        { label: 'Countries', value: '25+', icon: Globe2 },
    ];

    const values = [
        { title: 'Integrity', desc: 'Transparent advice and honest guidance throughout your journey.', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
        { title: 'Excellence', desc: 'Striving for perfection in every application and visa filing.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
        { title: 'Student-First', desc: 'Your career and dreams are our top priority, always.', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white"
        >
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-navy text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.1),transparent)]"></div>
                    <div className="absolute -bottom-12 md:-bottom-24 -right-12 md:-right-24 w-64 md:w-96 h-64 md:h-96 bg-gold/10 rounded-full blur-[80px] md:blur-[100px]"></div>
                </div>

                <div className="container-custom relative z-10 px-4 md:px-6 text-center">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-8xl font-black mb-6 md:mb-8 leading-tight"
                    >
                        Empowering Your <br className="hidden md:block" />
                        <span className="text-gold">Study Abroad</span> Dreams
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Blessings EduVisa Consultants is a premium study abroad consultancy dedicated to helping students find their way to the world's best educational institutions.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-100">
                <div className="container-custom px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white shadow-lg border border-gray-100 text-gold mb-4 md:mb-6 group-hover:bg-gold group-hover:text-white transition-all transform group-hover:-translate-y-2">
                                        {(() => {
                                            const Icon = stat.icon;
                                            return <Icon size={24} md:size={32} />;
                                        })()}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-black text-navy mb-1 md:mb-2">{stat.value}</h3>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">{stat.label}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding container-custom px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-8 md:space-y-10 text-center md:text-left"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">Our Professional <br /><span className="text-gold">Commitment</span></h2>
                            <div className="w-20 h-2 bg-gold rounded-full mx-auto md:mx-0"></div>
                        </div>

                        <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                            We understand that choosing to study abroad is a life-changing decision. Our mission is to simplify this process by providing comprehensive, honest, and expert guidance at every step of the journey.
                        </p>

                        <div className="space-y-4 md:space-y-6">
                            {[
                                'Expert counseling for course & country selection',
                                'End-to-end documentation & admission support',
                                'Comprehensive visa interview preparation',
                                'Post-landing support & guidance'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                                    <CheckCircle2 className="text-gold shrink-0 md:mt-1" size={20} md:size={24} />
                                    <p className="font-bold text-navy text-sm md:text-base group-hover:text-gold transition-colors text-left">{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-navy p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] text-white space-y-10 md:space-y-12 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                            <ShieldCheck size={200} className="w-48 h-48 md:w-64 md:h-64" />
                        </div>
                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gold flex flex-col md:flex-row items-center gap-3">
                                <Target size={28} md:size={32} /> Our Vision
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                                "To become the most trusted name in global education consultancy, bridging the gap between ambitious students and their dreams of world-class education with 100% transparency and success."
                            </p>
                        </div>

                        <div className="relative z-10 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gold flex flex-col md:flex-row items-center gap-3">
                                <ShieldCheck size={28} md:size={32} /> Our Goal
                            </h3>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                                "To ensure every student receives personalized attention and the most accurate information to make an informed decision about their future."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="section-padding bg-gray-50 border-y border-gray-100 px-4 md:px-6">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">The Core Values That <br className="hidden md:block" /><span className="text-gold">Drive Us</span></h2>
                        <div className="w-20 h-2 bg-gold rounded-full mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl transition-all"
                                >
                                    <div className={`w-16 h-16 md:w-20 md:h-20 ${v.bg} ${v.color} rounded-[1.5rem] md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform`}>
                                        {(() => {
                                            const Icon = v.icon;
                                            return <Icon size={32} md:size={40} />;
                                        })()}
                                    </div>
                                    <h4 className="text-xl md:text-2xl font-bold text-navy mb-3 md:mb-4">{v.title}</h4>
                                    <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{v.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;
