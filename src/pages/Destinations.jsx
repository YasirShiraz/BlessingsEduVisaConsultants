import { motion } from 'framer-motion';
import DestinationCard from '../components/DestinationCard';
import { Globe2, GraduationCap, Plane, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Destinations = () => {
    const destinations = [
        {
            id: 'united-kingdom',
            name: 'United Kingdom',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
            description: 'Home to world-class universities like Oxford and Cambridge. Fast-track degrees and post-study work opportunities.',
            students: '120k+',
            rating: 4.8,
            benefits: ['Post-study work visa', 'Quality education', 'Rich heritage']
        },
        {
            id: 'canada',
            name: 'Canada',
            image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800',
            description: 'Top-ranked safety and multicultural environment. High demand for skilled graduates and PR pathways.',
            students: '90k+',
            rating: 4.9,
            benefits: ['Easy PR pathways', 'Work while studying', 'High quality of life']
        },
        {
            id: 'australia',
            name: 'Australia',
            image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
            description: 'Sun, sand, and superior education. Leading in technology, health sciences, and research.',
            students: '75k+',
            rating: 4.7,
            benefits: ['Vibrant campus life', 'High wages', 'Excellent weather']
        },
        {
            id: 'usa',
            name: 'USA',
            image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800',
            description: 'The global leader in innovation and research. Diverse range of universities and campus cultures.',
            students: '200k+',
            rating: 4.8,
            benefits: ['Innovation hub', 'Diverse culture', 'Extensive networks']
        },
        {
            id: 'germany',
            name: 'Germany',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
            description: 'Engineering excellence with zero or low tuition fees at public universities.',
            students: '40k+',
            rating: 4.6,
            benefits: ['Low tuition fees', 'Strong economy', 'Centrally located']
        },
        {
            id: 'europe',
            name: 'Europe (Schengen)',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
            description: 'Explore multiple cultures with a single visa. High-quality lifestyle and historic cities.',
            students: '50k+',
            rating: 4.5,
            benefits: ['Travel freedom', 'History & Arts', 'Affordable living']
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white pb-20"
        >
            {/* Header */}
            <div className="bg-navy py-12 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Globe2 className="w-64 h-64 md:w-96 md:h-96 absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 text-gold" />
                </div>
                <div className="container-custom relative z-10 px-4 md:px-6">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="max-w-3xl text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">Study In Your <br className="hidden md:block" /><span className="text-gold">Dream Destination</span></h1>
                        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto md:mx-0">We represent over 500+ universities across the globe. Choose the one that fits your career goals perfectly.</p>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="section-padding container-custom px-4 md:px-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer flex flex-col"
                        >
                            <DestinationCard {...dest} />
                            <div className="mt-4 md:mt-6 p-6 rounded-[2rem] md:rounded-3xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-2xl transition-all flex-grow">
                                <h4 className="font-bold text-navy flex items-center gap-2 mb-4 text-base md:text-lg">
                                    <GraduationCap size={18} md:size={20} className="text-gold" />
                                    Why {dest.name}?
                                </h4>
                                <ul className="space-y-3">
                                    {dest.benefits.map((b, i) => (
                                        <li key={i} className="text-xs md:text-sm text-gray-600 flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gold shrink-0" />
                                            <span className="font-medium">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-16 md:mt-24 p-10 md:p-20 rounded-[2.5rem] md:rounded-[3.5rem] bg-navy text-white text-center relative overflow-hidden border border-white/5 shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <ShieldCheck size={200} md:size={300} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Confused? Let Our <br className="hidden md:block" />Experts <span className="text-gold">Guide You.</span></h2>
                        <p className="text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto text-base md:text-xl font-medium">Every student has unique needs. We help you pick the best country based on your budget, profile, and long-term career aspirations.</p>
                        <Link to="/apply" className="btn-secondary inline-flex items-center gap-3 md:gap-4 px-10 md:px-12 py-4 md:py-5 text-lg md:text-xl hover:scale-105 transition-all shadow-xl">
                            Get Free Consultation <Plane size={20} md:size={24} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Destinations;
