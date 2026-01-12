import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Globe2, Facebook, Instagram, Linkedin, Users } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../context/DataContext';

const Contact = () => {
    const [status, setStatus] = useState('');
    const { contact, countries } = useData();

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Sending...');
        setTimeout(() => {
            setStatus('Message Sent! We will contact you soon.');
            e.target.reset();
        }, 1500);
    };

    const contactInfo = [
        {
            title: 'Call Us',
            details: [contact.phone],
            href: `tel:${contact.phone}`,
            icon: Phone,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            title: 'Email Us',
            details: [contact.email],
            href: `mailto:${contact.email}`,
            icon: Mail,
            color: 'text-gold-dark',
            bg: 'bg-gold/10'
        },
        {
            title: 'Head Office',
            details: [contact.address],
            href: `https://maps.google.com/?q=${contact.address}`,
            icon: MapPin,
            color: 'text-green-500',
            bg: 'bg-green-50'
        }
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
                <div className="absolute inset-0 opacity-[0.03]">
                    <MessageSquare className="w-64 h-64 md:w-[500px] md:h-[500px] absolute -top-10 md:-top-20 -right-10 md:-right-20" />
                </div>
                <div className="container-custom relative z-10 px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">Let's <span className="text-brandgreen">Connect</span></h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">Have questions about studying abroad? Our expert counselors are ready to help you every step of the way.</p>
                    </motion.div>
                </div>
            </div>

            {/* Contact Information Cards */}
            <div className="section-padding container-custom px-4 md:px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-12 md:mb-20">
                    {contactInfo.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.a
                                key={i}
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : undefined}
                                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group flex flex-col items-center text-center"
                            >
                                <div className={`w-16 h-16 md:w-20 md:h-20 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                                    <Icon size={28} md:size={36} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-navy mb-3 md:mb-4">{item.title}</h3>
                                <div className="space-y-1 overflow-hidden w-full">
                                    {item.details.map((detail, idx) => (
                                        <p key={idx} className="text-sm md:text-base text-gray-500 font-bold break-all md:break-normal">{detail}</p>
                                    ))}
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Form & Map Section */}
                <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-navy p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden flex flex-col"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <Globe2 size={240} className="w-48 h-48 md:w-60 md:h-60" />
                        </div>
                        <div className="relative z-10 flex-grow text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight">Send Us a <br className="hidden md:block" /><span className="text-brandgreen">Direct Message</span></h2>
                            <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-12 font-medium leading-relaxed">Our typical response time is within 4 working hours. We are here to listen and help you achieve your goals.</p>

                            <div className="space-y-8 md:space-y-10">
                                {[
                                    { label: 'Work Hours', value: 'Mon - Sat: 10AM - 6PM', icon: Clock },
                                    { label: 'Follow Us', value: 'Stay connected with us', icon: Users }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-center">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center text-brandgreen">
                                            {(() => {
                                                const SideIcon = item.icon;
                                                if (!SideIcon) return null;
                                                return <SideIcon size={20} md:size={24} />;
                                            })()}
                                        </div>
                                        <div className="space-y-0.5 md:space-y-1 text-center md:text-left">
                                            <p className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-brandgreen opacity-80">{item.label}</p>
                                            <p className="text-lg md:text-xl font-black">{item.value}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-center md:justify-start gap-3 md:gap-4 pt-4">
                                    {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                                        <a key={idx} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-brandgreen hover:text-navy hover:scale-110 transition-all">
                                            <Icon size={18} md:size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-navy opacity-60">Full Name</label>
                                    <input type="text" required className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 focus:border-gold outline-none transition-all font-bold text-sm md:text-base" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-navy opacity-60">Email Address</label>
                                    <input type="email" required className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 focus:border-gold outline-none transition-all font-bold text-sm md:text-base" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-navy opacity-60">Target Destination</label>
                                <div className="relative">
                                    <select className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 focus:border-gold outline-none transition-all font-bold text-sm md:text-base appearance-none">
                                        <option value="">Select Country</option>
                                        {countries.map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        ▼
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-navy opacity-60">Your Message</label>
                                <textarea required rows="4" className="w-full px-5 md:px-6 py-3 md:py-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 focus:border-gold outline-none transition-all font-bold text-sm md:text-base resize-none" placeholder="Tell us about your requirements..."></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary py-4 md:py-5 text-base md:text-lg flex items-center justify-center gap-3 shadow-xl">
                                Send Message <Send size={18} md:size={20} />
                            </button>
                            {status && <p className="text-center font-black text-gold animate-bounce italic text-sm md:text-base">{status}</p>}
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="section-padding container-custom px-4 md:px-6 pb-20 md:pb-40">
                <div className="bg-gray-100 w-full h-[350px] md:h-[500px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-gray-200 shadow-inner relative group">
                    <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-all duration-700 flex items-center justify-center">
                        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-3 md:gap-4 scale-90 md:scale-100 group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                            <MapPin className="text-gold w-8 h-8 md:w-10 md:h-10" />
                            <div>
                                <p className="text-[10px] md:text-sm font-black text-navy uppercase tracking-widest">Head Office</p>
                                <p className="text-xs md:text-base font-bold text-gray-500 w-full truncate">{contact.address}</p>
                            </div>
                        </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" alt="Map Location" className="w-full h-full object-cover" />
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;
