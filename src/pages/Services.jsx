import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import {
    Search,
    MapPin,
    FileText,
    MessageSquare,
    BadgeCheck,
    Plane,
    GraduationCap,
    BookOpen,
    Globe2,
    Users,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const mainServices = [
        {
            title: 'IELTS/PTE Coaching',
            desc: 'Score your best with our certified trainers and mock test series for IELTS, PTE, and TOEFL.',
            icon: BookOpen,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'University Admissions',
            desc: 'Direct representation with 500+ universities. We help you find the best scholarships and placements.',
            icon: GraduationCap,
            color: 'text-gold-dark',
            bg: 'bg-gold/10'
        },
        {
            title: 'Visa Assistance',
            desc: 'End-to-end visa documentation, spouse visa filing, and expert visa interview preparation.',
            icon: ShieldCheck,
            color: 'text-green-600',
            bg: 'bg-green-50'
        },
        {
            title: 'Post-Landing Services',
            desc: 'Accommodation help, airport pick-up, and part-time job guidance for our students.',
            icon: Plane,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
        }
    ];

    const additionalSteps = [
        'Document Attestation',
        'Scholarship Guidance',
        'Finance & Fund Guidance',
        'Pre-Departure Briefing',
        'Travel Insurance',
        'SOP & Resume Writing'
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white"
        >
            {/* Header */}
            <div className="bg-navy py-12 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gold/5 rounded-full blur-[80px] md:blur-[120px]"></div>
                </div>
                <div className="container-custom relative z-10 px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">Our Premium <br className="hidden md:block" /><span className="text-gold">Services</span></h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">From your first counseling session to your flight abroad, we manage everything so you can focus on your future.</p>
                    </motion.div>
                </div>
            </div>

            {/* Main Services Grid */}
            <div className="section-padding container-custom px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    {mainServices.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all flex flex-col md:flex-row gap-6 md:gap-8 items-start"
                            >
                                <div className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-[1.5rem] md:rounded-3xl ${service.bg} ${service.color} flex items-center justify-center group-hover:scale-110 transition-all shadow-lg`}>
                                    <Icon size={32} md:size={40} className="md:w-10 md:h-10" />
                                </div>
                                <div className="space-y-3 md:space-y-4 text-left">
                                    <h3 className="text-2xl md:text-3xl font-black text-navy">{service.title}</h3>
                                    <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">{service.desc}</p>
                                    <ul className="flex flex-wrap gap-2 md:gap-4 pt-2 md:pt-4">
                                        {['Expert Advice', 'Fast Process', 'Success'].map((tag, i) => (
                                            <li key={i} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Additional Value */}
                <div className="mt-16 md:mt-24 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-6 md:space-y-8 text-center md:text-left"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">Every Detail <br className="hidden md:block" /><span className="text-gold">Taken Care Of.</span></h2>
                        <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed">We don't just stop at admissions. Our comprehensive support system covers every aspect of your international journey.</p>
                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                            {additionalSteps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-gold transition-colors group">
                                    <CheckCircle2 className="text-gold shrink-0" size={20} md:size={24} />
                                    <span className="font-bold text-navy text-sm md:text-base group-hover:text-gold transition-colors">{step}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-navy p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] text-white space-y-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Globe2 size={240} className="w-48 h-48 md:w-60 md:h-60" />
                        </div>
                        <div className="relative z-10 space-y-8 md:space-y-10 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center md:items-center gap-4">
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center text-gold border border-white/5">
                                    <Users size={28} md:size={32} />
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Happy Students</p>
                                    <p className="text-2xl md:text-3xl font-black">5000+</p>
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold leading-tight italic">"The transparency and speed of Blessings EduVisa is what makes them different."</h3>
                            <div className="pt-6 border-t border-white/10 w-full">
                                <Link to="/apply" className="btn-secondary px-8 md:px-10 py-4 inline-block text-center w-full sm:w-auto font-black uppercase tracking-widest text-xs md:text-sm translate-y-0 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all">
                                    Start Your Journey Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Services;
