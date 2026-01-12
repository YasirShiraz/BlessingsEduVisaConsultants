import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    // Increment version when forcing a data update (e.g. adding new countries)
    const DATA_VERSION = '4.0';

    // Initial State defaults
    const defaultStats = [
        { id: 1, label: 'Success Rate', value: '98%', key: 'visa_success' },
        { id: 2, label: 'Countries', value: '40+', key: 'countries' },
        { id: 3, label: 'Universities', value: '1000+', key: 'universities' },
        { id: 4, label: 'Visa Success Stories', value: '200+', key: 'success_stories' },
        { id: 5, label: 'Satisfied Students', value: '500+', key: 'satisfied_students' },
        { id: 6, label: 'Years of Excellence', value: '5+', key: 'years_excellence' },
    ];

    const defaultCountries = [
        {
            id: 1,
            name: 'United Kingdom',
            code: 'GB',
            flag: 'https://flagcdn.com/w80/gb.png',
            image: 'https://plus.unsplash.com/premium_photo-1671734033306-02d572d42299?auto=format&fit=crop&q=80&w=800', // London
            description: 'Home to world-class universities like Oxford and Cambridge. Fast-track degrees and post-study work opportunities.',
            students: '120k+',
            rating: '4.8',
            benefits: ['Post-study work visa', 'Quality education', 'Rich heritage']
        },
        {
            id: 2,
            name: 'Canada',
            code: 'CA',
            flag: 'https://flagcdn.com/w80/ca.png',
            image: 'https://images.unsplash.com/photo-1517935703635-2717079c21eb?auto=format&fit=crop&q=80&w=800', // Toronto
            description: 'Top-ranked safety and multicultural environment. High demand for skilled graduates and PR pathways.',
            students: '90k+',
            rating: '4.9',
            benefits: ['Easy PR pathways', 'Work while studying', 'High quality of life']
        },
        {
            id: 3,
            name: 'Germany',
            code: 'DE',
            flag: 'https://flagcdn.com/w80/de.png',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800', // Neuschwanstein
            description: 'Engineering excellence with zero or low tuition fees at public universities.',
            students: '40k+',
            rating: '4.6',
            benefits: ['Low tuition fees', 'Strong economy', 'Centrally located']
        },
        {
            id: 4,
            name: 'Sweden',
            code: 'SE',
            flag: 'https://flagcdn.com/w80/se.png',
            image: 'https://images.unsplash.com/photo-1540339832862-4745a9805ad3?auto=format&fit=crop&q=80&w=800', // Stockholm
            description: 'Innovating for a sustainable future. World-leading research and unique learning environment.',
            students: '15k+',
            rating: '4.7',
            benefits: ['Innovating culture', 'Sustainability focus', 'Unique pedagogy']
        },
        {
            id: 5,
            name: 'Finland',
            code: 'FI',
            flag: 'https://flagcdn.com/w80/fi.png',
            image: 'https://images.unsplash.com/photo-1517582084472-e94987ba41b9?auto=format&fit=crop&q=80&w=800', // Helsinki
            description: 'The happiest country in the world. Exceptional education system and stunning nature.',
            students: '12k+',
            rating: '4.9',
            benefits: ['Happiest country', 'Free-thinking culture', 'Modern campuses']
        },
        {
            id: 6,
            name: 'Hungary',
            code: 'HU',
            flag: 'https://flagcdn.com/w80/hu.png',
            image: 'https://images.unsplash.com/photo-1565426960431-087a716299ad?auto=format&fit=crop&q=80&w=800', // Budapest
            description: 'Rich history with affordable European education. Great STEM and medicine programs.',
            students: '8k+',
            rating: '4.5',
            benefits: ['Affordable living', 'Medical excellence', 'Heart of Europe']
        },
        {
            id: 7,
            name: 'France',
            code: 'FR',
            flag: 'https://flagcdn.com/w80/fr.png',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', // Eiffel Tower
            description: 'Iconic culture and culinary excellence. Diverse degree programs and global recognition.',
            students: '35k+',
            rating: '4.7',
            benefits: ['Cultural hub', 'Culinary arts', 'Diverse programs']
        },
        {
            id: 8,
            name: 'Belgium',
            code: 'BE',
            flag: 'https://flagcdn.com/w80/be.png',
            image: 'https://images.unsplash.com/photo-1559113513-d5e09c88b581?auto=format&fit=crop&q=80&w=800', // Brussels
            description: 'Center of European politics and culture. Multilingual and diverse learning.',
            students: '10k+',
            rating: '4.6',
            benefits: ['Multilingual environment', 'Politics hub', 'Chocolate & Waffles']
        },
        {
            id: 9,
            name: 'Ireland',
            code: 'IE',
            flag: 'https://flagcdn.com/w80/ie.png',
            image: 'https://images.unsplash.com/photo-1590089215331-43b39228321d?auto=format&fit=crop&q=80&w=800', // Cliffs
            description: 'Rapidly growing tech hub. Excellent English-taught programs and career prospects.',
            students: '18k+',
            rating: '4.8',
            benefits: ['Tech hub', 'English speaking', 'Warm hospitality']
        },
        {
            id: 10,
            name: 'Malaysia',
            code: 'MY',
            flag: 'https://flagcdn.com/w80/my.png',
            image: 'https://images.unsplash.com/photo-1500041273356-3b388b7702bf?auto=format&fit=crop&q=80&w=800', // KL
            description: 'Affordable education in a multicultural tropical paradise. Branch campuses of global top unis.',
            students: '25k+',
            rating: '4.5',
            benefits: ['Low cost of living', 'Multicultural', 'Global degrees']
        },
        {
            id: 11,
            name: 'Turkiye',
            code: 'TR',
            flag: 'https://flagcdn.com/w80/tr.png',
            image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800', // Istanbul
            description: 'Bridge between East and West. Growing hub for international students with rich heritage.',
            students: '30k+',
            rating: '4.6',
            benefits: ['Rich history', 'Bridge of cultures', 'Modern infrastructure']
        },
        {
            id: 12,
            name: 'Dubai',
            code: 'AE',
            flag: 'https://flagcdn.com/w80/ae.png',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', // Burj Khalifa
            description: 'The future of innovation and luxury. World-class branch campuses and global hubs.',
            students: '20k+',
            rating: '4.8',
            benefits: ['Global business hub', 'Luxury lifestyle', 'Innovation first']
        }
    ];

    const defaultTestimonials = [
        {
            id: 1,
            name: 'Sarah Ahmed',
            country: 'UK',
            text: "Blessings EduVisa made my dream of studying in the UK a reality. Their team guided me through every step.",
            rating: 5
        },
        {
            id: 2,
            name: 'Rajiv Sharma',
            country: 'Canada',
            text: "I was confused about the visa process, but the consultants here were incredibly patient and professional.",
            rating: 5
        }
    ];

    const defaultContact = {
        phone: '0324-7569469',
        email: 'blessings.eduvisa@gmail.com',
        address: 'Office # 316, 3rd Floor, Al-Hafeez Executive, Block C3 Gulberg III, Lahore'
    };

    // Load from Local Storage or use defaults
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('blessings_stats');
        return saved ? JSON.parse(saved) : defaultStats;
    });

    const [countries, setCountries] = useState(() => {
        const saved = localStorage.getItem('blessings_countries');
        return saved ? JSON.parse(saved) : defaultCountries;
    });

    const [testimonials, setTestimonials] = useState(() => {
        const saved = localStorage.getItem('blessings_testimonials');
        return saved ? JSON.parse(saved) : defaultTestimonials;
    });

    const [contact, setContact] = useState(() => {
        const saved = localStorage.getItem('blessings_contact');
        return saved ? JSON.parse(saved) : defaultContact;
    });

    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem('blessings_applications');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to Local Storage whenever state changes
    useEffect(() => {
        localStorage.setItem('blessings_stats', JSON.stringify(stats));
    }, [stats]);

    useEffect(() => {
        localStorage.setItem('blessings_countries', JSON.stringify(countries));
    }, [countries]);

    useEffect(() => {
        localStorage.setItem('blessings_testimonials', JSON.stringify(testimonials));
    }, [testimonials]);

    useEffect(() => {
        localStorage.setItem('blessings_contact', JSON.stringify(contact));
    }, [contact]);

    useEffect(() => {
        localStorage.setItem('blessings_applications', JSON.stringify(applications));
    }, [applications]);

    // Force refresh if version changes
    useEffect(() => {
        const savedVersion = localStorage.getItem('blessings_data_version');
        if (savedVersion !== DATA_VERSION) {
            resetToDefaults();
            localStorage.setItem('blessings_data_version', DATA_VERSION);
        }
    }, []);

    // Update Functions
    const updateStat = (id, newValue) => {
        setStats(prev => prev.map(stat => stat.id === id ? { ...stat, value: newValue } : stat));
    };

    const addCountry = (newCountry) => {
        setCountries(prev => [...prev, { ...newCountry, id: Date.now() }]);
    };

    const removeCountry = (id) => {
        setCountries(prev => prev.filter(c => c.id !== id));
    };

    const addTestimonial = (newTestimonial) => {
        setTestimonials(prev => [...prev, { ...newTestimonial, id: Date.now() }]);
    };

    const removeTestimonial = (id) => {
        setTestimonials(prev => prev.filter(t => t.id !== id));
    };

    const updateContact = (field, value) => {
        setContact(prev => ({ ...prev, [field]: value }));
    };

    const addApplication = (applicationData) => {
        const newApp = {
            id: `APP${Date.now().toString().slice(-4)}`,
            ...applicationData,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };
        setApplications(prev => [newApp, ...prev]);
        return newApp;
    };

    const resetToDefaults = () => {
        setStats(defaultStats);
        setCountries(defaultCountries);
        setTestimonials(defaultTestimonials);
        setContact(defaultContact);
    };

    return (
        <DataContext.Provider value={{
            stats,
            countries,
            testimonials,
            contact,
            applications,
            updateStat,
            addCountry,
            removeCountry,
            addTestimonial,
            removeTestimonial,
            updateContact,
            addApplication,
            resetToDefaults
        }}>
            {children}
        </DataContext.Provider>
    );
};
