import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useState } from 'react';
import { useData } from '../context/DataContext';

const Testimonials = () => {
    const { testimonials } = useData();
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-lightgray section-padding overflow-hidden"
        >
            <div className="container-custom px-4 md:px-6">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-navy mb-4 md:mb-6 leading-tight">Success Stories</h1>
                    <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                        Hear from our students who are already pursuing their dreams across the globe with our help.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 md:px-12">
                    {testimonials.length > 0 ? (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col items-center text-center relative"
                                >
                                    <Quote className="text-gold w-12 h-12 md:w-16 md:h-16 opacity-10 md:opacity-20 mb-6 md:mb-8" />
                                    <p className="text-lg md:text-2xl text-navy font-medium italic mb-8 md:mb-10 leading-relaxed">
                                        "{testimonials[index]?.text}"
                                    </p>

                                    <div className="flex gap-1 text-gold mb-6">
                                        {[...Array(testimonials[index]?.rating || 5)].map((_, i) => <Star key={i} size={18} md:size={20} fill="currentColor" />)}
                                    </div>

                                    <div className="flex flex-col items-center gap-3 md:gap-4">
                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-navy rounded-full flex items-center justify-center text-white font-black text-2xl md:text-3xl shadow-lg border-4 border-gold/20">
                                            {testimonials[index]?.name?.[0] || 'S'}
                                        </div>
                                        <div className="text-center">
                                            <h4 className="text-xl md:text-2xl font-black text-navy">{testimonials[index]?.name}</h4>
                                            <p className="text-gold font-bold uppercase tracking-widest text-[10px] md:text-sm mt-1">
                                                Study in {testimonials[index]?.country}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation */}
                            <button
                                onClick={prev}
                                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-100 rounded-full items-center justify-center text-navy shadow-lg hover:bg-gold hover:text-white transition-all z-10"
                            >
                                ←
                            </button>
                            <button
                                onClick={next}
                                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white border border-gray-100 rounded-full items-center justify-center text-navy shadow-lg hover:bg-gold hover:text-white transition-all z-10"
                            >
                                →
                            </button>

                            {/* Mobile Navigation */}
                            <div className="flex md:hidden justify-center gap-6 mt-8">
                                <button
                                    onClick={prev}
                                    className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-navy shadow-lg active:scale-90 transition-all"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={next}
                                    className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center text-navy shadow-lg active:scale-90 transition-all"
                                >
                                    →
                                </button>
                            </div>

                            {/* Indicators */}
                            <div className="flex justify-center gap-3 mt-12">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-gold w-8' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl">
                            <Quote className="mx-auto text-gold/20 w-16 h-16 mb-6" />
                            <p className="text-gray-400 font-bold">No success stories shared yet. Check back soon!</p>
                        </div>
                    )}
                </div>

                {/* Success Quote */}
                <div className="mt-16 md:mt-20 text-center bg-navy text-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden">
                    <Quote className="absolute top-0 right-0 w-32 h-32 text-white/5 -translate-y-1/2 translate-x-1/4" />
                    <p className="text-xl md:text-3xl font-light italic text-gray-400 relative z-10 leading-relaxed">
                        "The beautiful thing about learning is that no one can take it away from you."
                    </p>
                    <p className="mt-4 md:mt-6 font-black text-gold uppercase tracking-widest text-[10px] md:text-sm relative z-10">— B.B. King</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Testimonials;
