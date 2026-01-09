import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import logo from '../assets/logo_final.png';

const Footer = () => {
    return (
        <footer className="bg-navy text-white pt-12 md:pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                {/* Brand Section */}
                <div className="space-y-4 md:space-y-6">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded-lg">
                            <img src={logo} alt="Blessings EduVisa" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                        </div>
                        <span className="font-bold text-lg md:text-xl tracking-tight text-white">
                            Blessings <span className="text-gold">EduVisa</span>
                        </span>
                    </Link>
                    <p className="text-sm md:text-base text-gray-400 font-medium">
                        Empowering students to achieve their dreams of studying abroad with expert guidance and seamless visa assistance.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/blessings.eduvisa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><Facebook size={18} /></a>
                        <a href="https://www.instagram.com/blessings.eduvisa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><Instagram size={18} /></a>
                        <a href="https://wa.me/923247569469" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><MessageCircle size={18} /></a>
                        <a href="https://www.linkedin.com/company/blessings-eduvisa/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy transition-all"><Linkedin size={18} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-lg mb-6 text-gold">Quick Links</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/destinations" className="hover:text-white transition-colors">Study Destinations</Link></li>
                        <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                        <li><Link to="/apply" className="hover:text-white transition-colors">Apply Online</Link></li>
                    </ul>
                </div>

                {/* Destinations */}
                <div>
                    <h3 className="font-bold text-lg mb-6 text-gold">Destinations</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/destinations" className="hover:text-white transition-colors">UK Education</Link></li>
                        <li><Link to="/destinations" className="hover:text-white transition-colors">Canada Study</Link></li>
                        <li><Link to="/destinations" className="hover:text-white transition-colors">Australia Admission</Link></li>
                        <li><Link to="/destinations" className="hover:text-white transition-colors">USA Universities</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div>
                    <h3 className="font-bold text-lg mb-6 text-gold">Contact Us</h3>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex items-start gap-3">
                            <MapPin size={20} className="text-gold shrink-0" />
                            <a href="https://maps.google.com/?q=Al-Hafeez+Executive+Gulberg+III+Lahore" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Office # 316, 3rd Floor, Al-Hafeez Executive, Block C3 Gulberg III, Lahore</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={20} className="text-gold shrink-0" />
                            <a href="tel:+923247569469" className="hover:text-white transition-colors">03247569469</a>
                        </li>
                        <li className="flex items-center gap-3 overflow-hidden">
                            <Mail size={20} className="text-gold shrink-0" />
                            <a href="mailto:blessings.eduvisa@gmail.com" className="hover:text-white transition-colors break-all md:break-normal">blessings.eduvisa@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 border-t border-gray-800/50 mt-12 md:mt-16 pt-8 text-center text-gray-500 text-xs md:text-sm">
                <p>&copy; {new Date().getFullYear()} Blessings EduVisa Consultants. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
