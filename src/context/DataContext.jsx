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
    // Initial State defaults
    const defaultStats = [
        { id: 1, label: 'Success Rate', value: '98%', key: 'visa_success' },
        { id: 2, label: 'Countries', value: '40+', key: 'countries' },
        { id: 3, label: 'Universities', value: '1000+', key: 'universities' },
        { id: 4, label: 'Visa Success Stories', value: '200+', key: 'success_stories' },
        { id: 5, label: 'Satisfied Students', value: '850+', key: 'satisfied_students' },
        { id: 6, label: 'Years of Excellence', value: '15+', key: 'years_excellence' },
    ];

    const defaultCountries = [
        {
            id: 1,
            name: 'United Kingdom',
            code: 'GB',
            flag: 'https://flagcdn.com/w80/gb.png',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
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
            image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800',
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
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
            description: 'Engineering excellence with zero or low tuition fees at public universities.',
            students: '40k+',
            rating: '4.6',
            benefits: ['Low tuition fees', 'Strong economy', 'Centrally located']
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
