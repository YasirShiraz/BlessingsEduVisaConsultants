import { motion } from 'framer-motion';
import React from 'react';

const ServiceCard = ({ title, description, desc, icon: Icon }) => {
    const displayDesc = description || desc;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full group"
        >
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 text-navy group-hover:bg-brandgreen group-hover:text-navy transition-all duration-300 shadow-sm border border-gray-50">
                {(() => {
                    if (!Icon) return <span className="text-3xl">✨</span>;
                    if (React.isValidElement(Icon)) return Icon;
                    return <Icon size={32} />;
                })()}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-navy group-hover:text-brandgreen transition-colors">{title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{displayDesc}</p>
        </motion.div>
    );
};

export default ServiceCard;
