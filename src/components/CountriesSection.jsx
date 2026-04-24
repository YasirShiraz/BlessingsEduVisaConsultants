import { useData } from '../context/DataContext';

const CountriesSection = () => {
    const { countries } = useData();
    const half = Math.ceil(countries.length / 2);
    const row1 = countries.slice(0, half);
    const row2 = countries.slice(half);

    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="container-custom">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-navy mb-2">Study Opportunities in <span className="text-gold">40+ Countries</span></h3>
                    <p className="text-gray-500 text-sm">We process applications for all major study destinations.</p>
                </div>

                <div className="overflow-hidden w-full py-4 relative flex flex-col gap-6 md:gap-10">
                    {/* Row 1 */}
                    <div className="flex animate-marquee w-max">
                        <div className="flex shrink-0 gap-8 md:gap-12 pr-8 md:pr-12">
                            {row1.map((country) => (
                                <div key={`r1-1-${country.id}`} className="group flex flex-col items-center gap-3 shrink-0">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-50 shadow-md overflow-hidden group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                                        <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-bold text-navy text-sm md:text-base uppercase tracking-wide group-hover:text-gold transition-colors">{country.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex shrink-0 gap-8 md:gap-12 pr-8 md:pr-12" aria-hidden="true">
                            {row1.map((country) => (
                                <div key={`r1-2-${country.id}`} className="group flex flex-col items-center gap-3 shrink-0">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-50 shadow-md overflow-hidden group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                                        <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-bold text-navy text-sm md:text-base uppercase tracking-wide group-hover:text-gold transition-colors">{country.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex animate-marquee-reverse w-max mt-4">
                        <div className="flex shrink-0 gap-8 md:gap-12 pr-8 md:pr-12">
                            {row2.map((country) => (
                                <div key={`r2-1-${country.id}`} className="group flex flex-col items-center gap-3 shrink-0">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-50 shadow-md overflow-hidden group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                                        <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-bold text-navy text-sm md:text-base uppercase tracking-wide group-hover:text-gold transition-colors">{country.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex shrink-0 gap-8 md:gap-12 pr-8 md:pr-12" aria-hidden="true">
                            {row2.map((country) => (
                                <div key={`r2-2-${country.id}`} className="group flex flex-col items-center gap-3 shrink-0">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-50 shadow-md overflow-hidden group-hover:scale-110 group-hover:border-gold transition-all duration-300">
                                        <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="font-bold text-navy text-sm md:text-base uppercase tracking-wide group-hover:text-gold transition-colors">{country.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountriesSection;
