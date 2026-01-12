import { motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ name, id, slug, image, students, rating }) => {
    const destinationId = id || slug || name.toLowerCase().replace(/\s+/g, '-');
    const displayMeta = students || '120K+ Students';
    const displayRating = rating || '4.8';

    return (
        <motion.div
            whileHover={{ y: -12 }}
            className="group relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[3/4] bg-navy"
        >
            {/* Image Layer */}
            <div className="absolute inset-0 z-0 scale-105 group-hover:scale-110 transition-transform duration-700">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"></div>
            </div>

            {/* Content Layer */}
            <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 z-20">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <span className="px-3 md:px-5 py-1.5 md:py-2 bg-brandgreen/90 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                        {displayMeta}
                    </span>
                    <span className="px-3 md:px-5 py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-brandgreen border border-white/10">
                        ★ {displayRating}
                    </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 tracking-tight">{name}</h3>

                <Link
                    to={`/destinations/${destinationId}`}
                    className="inline-flex items-center gap-3 md:gap-4 px-6 md:px-10 py-3.5 md:py-5 bg-navy/60 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl text-white font-black text-xs md:text-sm group/btn hover:bg-brandgreen hover:text-white hover:border-brandgreen transition-all duration-300"
                >
                    Explore <ArrowUpRight size={18} md:size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
            </div>

            {/* Hover Decorative Element (Top Right) */}
            <div className="absolute top-6 md:top-8 right-6 md:right-8">
                <div className="bg-brandgreen p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
                    <GraduationCap className="text-white" size={24} md:size={28} />
                </div>
            </div>
        </motion.div>
    );
};

export default DestinationCard;
