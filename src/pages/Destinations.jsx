import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import DestinationCard from '../components/DestinationCard';
import { Globe2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Destinations = () => {
    const { countries } = useData();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-navy text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(27,94,32,0.1),transparent)]"></div>
                    <div className="absolute -top-12 -left-12 w-64 md:w-96 h-64 md:h-96 bg-brandgreen/10 rounded-full blur-[80px] md:blur-[100px]"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-8xl font-black mb-6 md:mb-8 leading-tight"
                    >
                        Global <span className="text-brandgreen">Study Hubs</span>
                    </motion.h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Explore the world's most prestigious educational destinations. From the historic universities of the UK to the innovation hubs of the USA.
                    </p>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {countries.length > 0 ? (
                            countries.map((dest, index) => (
                                <motion.div
                                    key={dest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <DestinationCard {...dest} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <Globe2 className="mx-auto w-16 h-16 text-gray-200 mb-4" />
                                <p className="text-gray-400 font-bold">No destinations available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Custom CTA */}
            <section className="container-custom mb-16 md:mb-20">
                <div className="bg-navy p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <Globe2 size={400} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Need Help Choosing?</h2>
                        <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto font-medium">Our consultants can help you find the perfect match based on your academic profile and budget.</p>
                        <Link to="/contact" className="btn-primary inline-flex items-center gap-3 px-10 py-4 text-lg">
                            Get Free Consultation <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Destinations;
