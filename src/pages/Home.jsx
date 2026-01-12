import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { useData } from '../context/DataContext';
import CountriesSection from '../components/CountriesSection';
import ServiceCard from '../components/ServiceCard';
import DestinationCard from '../components/DestinationCard';
import {
    CheckCircle2,
    Users,
    Globe2,
    BarChart3,
    ChevronRight,
    ArrowRight,
    ShieldCheck,
    Search,
    FileText,
    BadgeCheck,
    Headphones,
    Quote,
    Star,
    Mail,
    Phone,
    MapPin,
    Send,
    Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { db } from '../auth/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Home = () => {
    const { stats, testimonials, countries, contact } = useData();
    const [testimonialIndex, setTestimonialIndex] = useState(0);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const services = [
        {
            title: 'Career Counseling',
            desc: 'Expert guidance to help you choose the right course and career path based on your passion.',
            icon: Search
        },
        {
            title: 'University Admissions',
            desc: 'Comprehensive support in applying to top universities across the UK, USA, Canada, and Australia.',
            icon: CheckCircle2
        },
        {
            title: 'Visa Documentation',
            desc: 'Flawless visa application management with professional filing and mock interview sessions.',
            icon: FileText
        },
        {
            title: 'Test Preparation',
            desc: 'Specialized coaching for IELTS, PTE, and TOEFL to ensure you meet university standards.',
            icon: BadgeCheck
        }
    ];

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (db) {
                await addDoc(collection(db, "inquiries"), {
                    ...contactForm,
                    createdAt: serverTimestamp()
                });
            }
            setIsSubmitted(true);
            setContactForm({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const processSteps = [
        { title: 'Counseling', desc: 'Identify your goals and select the best career path.', icon: Search },
        { title: 'University Pick', desc: 'Find the institutions that match your budget and profile.', icon: CheckCircle2 },
        { title: 'Application', desc: 'We handle your documents and admission process.', icon: FileText },
        { title: 'Visa Success', desc: 'Expert visa filing and interview preparation.', icon: ShieldCheck }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-20"
        >
            <Hero />

            <CountriesSection />

            {/* Services Section */}
            <section className="section-padding bg-gray-50 border-y border-gray-100">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
                        <div className="space-y-3 md:space-y-4 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">Our Premium <br className="hidden md:block" /><span className="text-brandgreen">Consultancy Services</span></h2>
                            <div className="w-16 md:w-20 h-1.5 md:h-2 bg-brandgreen rounded-full mx-auto md:mx-0"></div>
                        </div>
                        <Link to="/services" className="text-brandgreen font-bold flex items-center gap-2 hover:underline text-base md:text-lg">
                            View All Services <ChevronRight size={18} />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding overflow-hidden">
                <div className="container-custom grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="absolute -inset-10 bg-brandgreen/5 rounded-full blur-[100px] -z-10"></div>
                        <h2 className="text-3xl md:text-6xl font-black text-navy mb-8 md:mb-10 leading-tight text-center md:text-left">Why Students Trust <br className="hidden md:block" /><span className="text-brandgreen">Blessings EduVisa</span></h2>
                        <div className="space-y-8">
                            {[
                                { title: `${stats.find(s => s.key === 'visa_success')?.value || '98%'} Visa Success Rate`, desc: 'Our expert documentation team ensures minimal rejection risk.' },
                                { title: `${stats.find(s => s.key === 'universities')?.value || '1000+'} Partner Universities`, desc: 'Wide range of options across all major study destinations.' },
                                { title: 'Free Career Consultation', desc: 'Personalized sessions to map out your academic journey.' },
                                { title: 'No Hidden Charges', desc: 'Transparent process with clear communication on all costs.' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 items-start group"
                                >
                                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-brandgreen group-hover:bg-brandgreen group-hover:text-white transition-all transform group-hover:scale-110">
                                        <CheckCircle2 size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-navy mb-2">{item.title}</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="grid grid-cols-2 gap-4 md:gap-6"
                    >
                        <div className="space-y-4 md:space-y-6 pt-6 md:pt-12">
                            <div className="bg-navy p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-2xl space-y-3 md:space-y-4">
                                <Globe2 size={32} className="md:w-10 md:h-10 text-gold" />
                                <p className="text-2xl md:text-3xl font-black">{stats.find(s => s.key === 'countries')?.value || '40+'}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Countries</p>
                            </div>
                            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-gray-50 space-y-3 md:space-y-4">
                                <Users size={32} className="md:w-10 md:h-10 text-navy" />
                                <p className="text-2xl md:text-3xl font-black text-navy">{stats.find(s => s.key === 'satisfied_students')?.value || '850+'}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Students</p>
                            </div>
                        </div>
                        <div className="space-y-4 md:space-y-6">
                            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-gray-50 space-y-3 md:space-y-4">
                                <BarChart3 size={32} className="md:w-10 md:h-10 text-navy" />
                                <p className="text-2xl md:text-3xl font-black text-navy">{stats.find(s => s.key === 'success_stories')?.value || '200+'}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Visa Rate</p>
                            </div>
                            <div className="bg-gold p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-navy shadow-2xl space-y-3 md:space-y-4">
                                <Headphones size={32} className="md:w-10 md:h-10 text-navy" />
                                <p className="text-2xl md:text-3xl font-black">24/7</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/60">Support</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Summary Section */}
            <section className="section-padding bg-white relative overflow-hidden">
                <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-navy mb-6 md:mb-8 leading-tight text-center md:text-left">Empowering Your <br className="hidden md:block" /><span className="text-gold">Education Dreams.</span></h2>
                        <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-8 text-center md:text-left">
                            At Blessings EduVisa, we believe in the power of global education. Our mission is to bridge the gap between talented students and world-class universities, ensuring a seamless journey from counseling to enrollment.
                        </p>
                        <div className="flex justify-center md:justify-start gap-8 md:gap-10">
                            <div className="space-y-1 md:space-y-2 text-center md:text-left">
                                <p className="text-2xl md:text-3xl font-black text-navy">{stats.find(s => s.key === 'years_excellence')?.value || '15+'}</p>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gold">Years Excellence</p>
                            </div>
                            <div className="space-y-1 md:space-y-2 text-center md:text-left">
                                <p className="text-2xl md:text-3xl font-black text-navy">{stats.find(s => s.key === 'universities')?.value || '1000+'}</p>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gold">Global Partners</p>
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start">
                            <Link to="/about" className="btn-secondary px-8 md:px-10 py-3.5 md:py-4 mt-8 md:mt-10 inline-block text-sm md:text-base">Read Our Full Story</Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                            alt="Team at work"
                            className="rounded-[3rem] shadow-2xl"
                        />
                        <div className="absolute -bottom-10 -right-10 bg-gold p-10 rounded-[2.5rem] shadow-2xl hidden md:block">
                            <Quote className="text-navy w-12 h-12 mb-4" />
                            <p className="text-navy font-bold text-lg max-w-[200px]">"Education is the most powerful weapon to change the world."</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Destinations Snippet */}
            <section className="section-padding container-custom px-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
                    <div className="space-y-3 md:space-y-4 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">Top Choice <br className="hidden md:block" /><span className="text-gold">Destinations</span></h2>
                        <div className="w-16 md:w-20 h-1.5 md:h-2 bg-gold rounded-full mx-auto md:mx-0"></div>
                    </div>
                    <Link to="/destinations" className="text-gold font-bold flex items-center gap-2 hover:underline text-base md:text-lg">
                        Explore All Countries <ChevronRight size={18} />
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {countries.slice(0, 3).map((dest, index) => (
                        <DestinationCard key={index} {...dest} />
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="section-padding bg-navy text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <Globe2 className="w-[800px] h-[800px] absolute -bottom-40 -left-40" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center mb-12 md:mb-20 space-y-3 md:space-y-4">
                        <h2 className="text-3xl md:text-6xl font-black">Our Simple <span className="text-gold">4-Step</span> Process</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">We've streamlined the complex study abroad process for you.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-[60px] left-0 w-full h-px bg-white/10 -z-0"></div>

                        {processSteps.map((step, i) => (
                            <div key={i} className="text-center space-y-4 md:space-y-6 group z-10">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-navy-light text-gold border-4 border-white/5 mx-auto flex items-center justify-center text-3xl md:text-4xl shadow-2xl scale-110 md:scale-125 group-hover:border-gold transition-all duration-500 bg-navy relative">
                                    <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold text-navy text-xs md:text-sm font-black flex items-center justify-center border-4 border-navy">{i + 1}</span>
                                    {(() => {
                                        const Icon = step.icon;
                                        if (!Icon) return <Search size={32} />;
                                        return <Icon size={32} className="md:w-10 md:h-10" />;
                                    })()}
                                </div>
                                <div className="pt-4 md:pt-6">
                                    <h4 className="text-xl md:text-2xl font-black mb-2 md:mb-3">{step.title}</h4>
                                    <p className="text-sm md:text-gray-400 font-medium px-2 md:px-4">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-lightgray overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-navy mb-4">Success <span className="text-gold">Stories</span></h2>
                        <p className="text-gray-500 font-medium tracking-tight uppercase text-xs tracking-[0.2em]">Hear from our global students</p>
                    </div>

                    <div className="max-w-4xl mx-auto relative px-4 md:px-10">
                        {testimonials.length > 0 ? (
                            <>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={testimonialIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border border-gray-50 flex flex-col items-center text-center"
                                    >
                                        <Quote className="text-gold/20 w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8" />
                                        <p className="text-lg md:text-2xl text-navy font-medium italic mb-8 md:mb-10 leading-relaxed">
                                            "{testimonials[testimonialIndex]?.text}"
                                        </p>
                                        <div className="flex gap-1 text-gold mb-4 md:mb-6">
                                            {[...Array(testimonials[testimonialIndex]?.rating || 5)].map((_, i) => <Star key={i} size={16} md:size={18} fill="currentColor" />)}
                                        </div>
                                        <h4 className="text-lg md:text-xl font-bold text-navy">{testimonials[testimonialIndex]?.name}</h4>
                                        <p className="text-gold text-[10px] md:text-xs font-black uppercase tracking-widest mt-1">Study in {testimonials[testimonialIndex]?.country}</p>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex justify-center gap-4 mt-12">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setTestimonialIndex(i)}
                                            className={`w-3 h-3 rounded-full transition-all ${i === testimonialIndex ? 'bg-gold w-8' : 'bg-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-400 font-bold py-10">No testimonials shared yet.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding container-custom px-4 md:px-6">
                <div className="bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-[45%] bg-navy p-10 md:p-16 text-white relative flex flex-col justify-center">
                        <div className="absolute inset-0 opacity-[0.03]">
                            <Globe2 className="w-full h-full scale-150 rotate-12" />
                        </div>
                        <div className="relative z-10 space-y-10 md:space-y-12">
                            <div className="space-y-4 text-center md:text-left">
                                <h2 className="text-3xl md:text-5xl font-black leading-tight">Connect With Our <br /><span className="text-gold">Global Experts</span></h2>
                                <p className="text-gray-400 font-medium max-w-md mx-auto md:mx-0">Have questions? We're here to help you navigate your journey with ease.</p>
                            </div>

                            <div className="space-y-5 md:space-y-6">
                                {[
                                    { icon: Phone, label: 'Call Support', value: contact.phone, href: `tel:${contact.phone}`, color: 'text-blue-400' },
                                    { icon: Mail, label: 'Email Inquiry', value: contact.email, href: `mailto:${contact.email}`, color: 'text-gold' },
                                    { icon: MapPin, label: 'Main Office', value: 'Lahore, Pakistan', href: 'https://maps.google.com/?q=Lahore,Pakistan', color: 'text-green-400' }
                                ].map((item, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-5 p-4 md:p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group transition-all"
                                    >
                                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                                            <item.icon size={24} md:size={28} />
                                        </div>
                                        <div className="space-y-0.5 overflow-hidden">
                                            <p className="text-[10px] uppercase font-black tracking-widest opacity-50">{item.label}</p>
                                            <p className="text-sm md:text-lg font-bold break-all md:break-normal">{item.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-12 md:p-20 bg-white">
                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Message</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-gold outline-none transition-all font-medium"
                                    placeholder="Tell us about your plans..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full btn-secondary py-5 text-lg flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : isSubmitted ? <CheckCircle2 className="text-navy" /> : <Send size={20} />}
                                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Submit Inquiry'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container-custom px-4 md:px-6 mt-8 md:mt-12 mb-16 md:mb-20">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="bg-gold p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-navy text-center relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Users size={300} md:size={400} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Ready to Start Your <br className="hidden md:block" />Educational Journey?</h2>
                        <p className="mb-8 md:mb-12 font-bold text-lg md:text-xl max-w-2xl mx-auto opacity-80">Don't wait for your dreams. Join {stats.find(s => s.key === 'satisfied_students')?.value || '500+'} successful students who made it to their dream careers with us.</p>
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                            <Link to="/apply" className="btn-primary flex items-center justify-center gap-3 px-10 md:px-12 py-4 md:py-5 text-lg md:text-xl shadow-xl hover:scale-105 transition-transform">
                                Apply Online Now <ArrowRight size={20} md:size={24} />
                            </Link>
                            <Link to="/contact" className="btn-outline flex items-center justify-center gap-3 px-10 md:px-12 py-4 md:py-5 text-lg md:text-xl bg-white/20 border-navy/20">
                                Speak to Experts
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default Home;
