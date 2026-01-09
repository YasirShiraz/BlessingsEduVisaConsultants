import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    Globe2,
    Users,
    GraduationCap,
    FileText,
    ShieldCheck,
    Send,
    ChevronLeft
} from 'lucide-react';
import { destinationsData } from '../data/destinationsData';

const DestinationDetail = () => {
    const { id } = useParams();
    const destination = destinationsData[id];
    const [openFaq, setOpenFaq] = useState(0);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-navy mb-4">Destination Not Found</h2>
                    <Link to="/destinations" className="text-gold font-bold flex items-center justify-center gap-2 hover:underline">
                        <ChevronLeft size={20} /> Back to Destinations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-20"
        >
            {/* Hero Header */}
            <section className="bg-navy py-8 md:py-12 border-b border-white/5">
                <div className="container-custom">
                    <h1 className="text-center text-3xl md:text-6xl font-black text-white">{destination.name}</h1>
                </div>
            </section>

            <div className="container-custom py-20 px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content (Left) */}
                    <div className="lg:w-2/3 space-y-16">
                        {/* Intro Section */}
                        <div className="space-y-6 md:space-y-10">
                            <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight text-center md:text-left">
                                Why Choose To <br className="hidden md:block" />
                                <span className="text-gold">Study In {destination.name}?</span>
                            </h2>
                            <img
                                src={destination.contentImage}
                                alt={`Study in ${destination.name}`}
                                className="w-full h-[250px] md:h-[400px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl"
                            />
                            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed text-center md:text-left">
                                {destination.whyChoose}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {destination.benefits.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-gold transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <p className="font-bold text-navy leading-tight">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-6 md:space-y-10">
                            <div className="flex justify-center md:justify-start">
                                <div className="bg-gold/10 inline-block px-6 md:px-8 py-2 md:py-3 rounded-full">
                                    <h3 className="text-navy font-black text-lg md:text-xl uppercase tracking-widest text-center">Frequently Asked Questions</h3>
                                </div>
                            </div>

                            {/* FAQ Accordion */}
                            <div className="space-y-3 md:space-y-4">
                                {destination.faqs.map((faq, i) => (
                                    <div key={i} className="border border-gray-100 rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                            className={`w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors ${openFaq === i ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-gray-50'}`}
                                        >
                                            <span className="text-base md:text-lg font-bold pr-4">{faq.q}</span>
                                            {openFaq === i ? <ChevronUp size={18} md:size={20} className="shrink-0" /> : <ChevronDown size={18} md:size={20} className="shrink-0" />}
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="bg-white"
                                                >
                                                    <div className="p-6 md:p-8 text-gray-500 text-sm md:text-base font-medium leading-relaxed border-t border-gray-50">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Checklist */}
                        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden sticky top-32">
                            <div className="bg-gold py-6 text-center">
                                <h4 className="text-navy font-black text-xl tracking-tight">Check List</h4>
                            </div>
                            <div className="p-8 space-y-4">
                                {destination.checklist.map((item, i) => (
                                    <div key={i} className="flex gap-4 items-center group">
                                        <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-all">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <p className="text-sm font-bold text-navy/80">{item}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Extra Info Boxes */}
                            <div className="px-8 pb-8 space-y-4">
                                <div className="bg-navy p-8 rounded-[2rem] text-white">
                                    <h5 className="text-xl font-black mb-4 flex items-center gap-3">
                                        International <br /> Students
                                    </h5>
                                    <p className="text-xs text-gray-400 font-medium">Over 500,000+ students choose {destination.name} every year for high quality education.</p>
                                </div>
                                <div className="bg-gold p-8 rounded-[2rem] text-navy">
                                    <h5 className="text-xl font-black mb-4 flex items-center gap-3">
                                        Pakistani <br /> Students
                                    </h5>
                                    <p className="text-xs text-navy/60 font-medium">Special scholarships and visa processing benefits available for Pakistani residents.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Subscription */}
            <section className="container-custom px-4 md:px-6 mt-12 md:mt-20">
                <div className="bg-navy rounded-[3rem] md:rounded-[4rem] p-8 md:p-20 relative overflow-hidden flex flex-col items-center justify-between gap-8 md:gap-12">
                    <div className="absolute inset-0 opacity-5">
                        <Globe2 className="w-full h-full scale-150 rotate-12" />
                    </div>
                    <div className="relative z-10 w-full text-center md:text-left">
                        <div className="bg-gold/20 inline-block px-4 py-1 rounded-lg mb-4 md:mb-6 text-gold text-[10px] md:text-xs font-black uppercase tracking-widest">Subscribe Newsletter</div>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3 md:mb-4">
                            Stay Updated On <br className="hidden md:block" />
                            <span className="text-gold">Study Opportunities</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-400 font-medium">Join our community and get the latest updates about scholarships and visas.</p>
                    </div>
                    <div className="relative z-10 w-full">
                        <form className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address..."
                                className="flex-grow bg-white/10 border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 text-sm md:text-base text-white outline-none focus:border-gold transition-colors"
                            />
                            <button className="bg-gold text-navy font-black px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl hover:bg-white transition-colors text-sm md:text-base uppercase">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default DestinationDetail;
