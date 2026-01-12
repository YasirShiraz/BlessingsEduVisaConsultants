import { useData } from '../context/DataContext';

const CountriesSection = () => {
    const { countries } = useData();

    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="container-custom">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-navy mb-2">Study Opportunities in <span className="text-gold">40+ Countries</span></h3>
                    <p className="text-gray-500 text-sm">We process applications for all major study destinations.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {countries.map((country) => (
                        <div key={country.id} className="group flex flex-col items-center gap-3">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-50 shadow-lg overflow-hidden group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                                <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-bold text-navy text-sm md:text-base uppercase tracking-wide group-hover:text-gold transition-colors">{country.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CountriesSection;
