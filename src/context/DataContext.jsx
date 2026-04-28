import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../auth/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import heroImg from '../assets/hero.png';

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export const DataProvider = ({ children }) => {
    // defaults
    const defaultStats = [
        { id: '1', label: 'Success Rate', value: '98%', key: 'visa_success' },
        { id: '2', label: 'Countries', value: '40+', key: 'countries' },
        { id: '3', label: 'Universities', value: '1000+', key: 'universities' },
        { id: '4', label: 'Visa Success Stories', value: '200+', key: 'success_stories' },
        { id: '5', label: 'Satisfied Students', value: '500+', key: 'satisfied_students' },
        { id: '6', label: 'Years of Excellence', value: '5+', key: 'years_excellence' },
    ];

    const defaultCountries = [
        {
            id: '1',
            name: 'Sweden',
            code: 'SE',
            flag: 'https://flagcdn.com/w80/se.png',
            image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&q=80&w=800',
            description: 'High-quality education with a strong focus on innovation, research, and a great student lifestyle.',
            students: '35k+',
            rating: '4.8',
            benefits: ['Innovative environment', 'High quality of life', 'Post-study work rights']
        },
        {
            id: '2',
            name: 'Finland',
            code: 'FI',
            flag: 'https://flagcdn.com/w80/fi.png',
            image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&q=80&w=800',
            description: 'Known for its world-leading education system, safe environment, and beautiful nature.',
            students: '20k+',
            rating: '4.9',
            benefits: ['Top education system', 'Extremely safe', 'Beautiful nature']
        },
        {
            id: '3',
            name: 'Germany',
            code: 'DE',
            flag: 'https://flagcdn.com/w80/de.png',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
            description: 'Engineering excellence with zero or low tuition fees at public universities.',
            students: '40k+',
            rating: '4.6',
            benefits: ['Low tuition fees', 'Strong economy', 'Centrally located']
        },
        {
            id: '4',
            name: 'Hungary',
            code: 'HU',
            flag: 'https://flagcdn.com/w80/hu.png',
            image: 'https://images.unsplash.com/photo-1549877452-9c387286dcb1?auto=format&fit=crop&q=80&w=800',
            description: 'Affordable world-class education located in the heart of Europe.',
            students: '30k+',
            rating: '4.7',
            benefits: ['Affordable living', 'Central location', 'Rich history']
        },
        {
            id: '5',
            name: 'Cyprus',
            code: 'CY',
            flag: 'https://flagcdn.com/w80/cy.png',
            image: 'https://images.unsplash.com/photo-1579781845112-9c3f15ec66fa?auto=format&fit=crop&q=80&w=800',
            description: 'An excellent standard of education in a fantastic Mediterranean climate with a low cost of living.',
            students: '15k+',
            rating: '4.5',
            benefits: ['Mediterranean climate', 'Affordable', 'English widely spoken']
        },
        {
            id: '6',
            name: 'Turkey',
            code: 'TR',
            flag: 'https://flagcdn.com/w80/tr.png',
            image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800',
            description: 'Transcontinental country offering rich culture, modern campuses, and very affordable tuition fees.',
            students: '50k+',
            rating: '4.6',
            benefits: ['Affordable tuition', 'Rich culture', 'Strategic location']
        },
        {
            id: '7',
            name: 'Malaysia',
            code: 'MY',
            flag: 'https://flagcdn.com/w80/my.png',
            image: 'https://images.unsplash.com/photo-1500041273356-3b388b7702bf?auto=format&fit=crop&q=80&w=800',
            description: 'Affordable education in a multicultural tropical paradise. Branch campuses of global top unis.',
            students: '25k+',
            rating: '4.5',
            benefits: ['Low cost of living', 'Multicultural', 'Global degrees']
        }
    ];

    const defaultTestimonials = [
        {
            id: '1',
            name: 'Sarah Ahmed',
            country: 'UK',
            text: "Blessings EduVisa made my dream of studying in the UK a reality. Their team guided me through every step.",
            rating: 5
        },
        {
            id: '2',
            name: 'Rajiv Sharma',
            country: 'Canada',
            text: "I was confused about the visa process, but the consultants here were incredibly patient and professional.",
            rating: 5
        }
    ];

    const defaultServices = [
        {
            id: '1',
            title: 'Career Counseling',
            desc: 'Expert guidance to help you choose the right course and career path based on your passion.',
            icon: 'Search'
        },
        {
            id: '2',
            title: 'University Admissions',
            desc: 'Comprehensive support in applying to top universities across the UK, USA, Canada, and Australia.',
            icon: 'CheckCircle2'
        },
        {
            id: '3',
            title: 'Visa Documentation',
            desc: 'Flawless visa application management with professional filing and mock interview sessions.',
            icon: 'FileText'
        },
        {
            id: '4',
            title: 'Test Preparation',
            desc: 'Specialized coaching for IELTS, PTE, and TOEFL to ensure you meet university standards.',
            icon: 'BadgeCheck'
        }
    ];

    const defaultProcessSteps = [
        { id: '1', title: 'Counseling', desc: 'Identify your goals and select the best career path.', icon: 'Search' },
        { id: '2', title: 'University Pick', desc: 'Find the institutions that match your budget and profile.', icon: 'CheckCircle2' },
        { id: '3', title: 'Application', desc: 'We handle your documents and admission process.', icon: 'FileText' },
        { id: '4', title: 'Visa Success', desc: 'Expert visa filing and interview preparation.', icon: 'ShieldCheck' }
    ];

    const defaultInquiries = [
        {
            id: '1',
            name: 'Ali Raza',
            email: 'ali.raza@example.com',
            message: 'I am interested in studying Computer Science in the UK. Please guide me about the requirements.',
            date: new Date().toLocaleDateString(),
            status: 'New'
        },
        {
            id: '2',
            name: 'Fatima Noor',
            email: 'fatima.noor@example.com',
            message: 'Do you offer scholarships for Australian universities? I have a CGPA of 3.8.',
            date: new Date().toLocaleDateString(),
            status: 'New'
        }
    ];

    const defaultNavLinks = [
        { id: '1', name: 'Home', path: '/' },
        { id: '2', name: 'About', path: '/about' },
        { id: '3', name: 'Destinations', path: '/destinations' },
        { id: '4', name: 'Services', path: '/services' },
        { id: '5', name: 'Testimonials', path: '/testimonials' },
        { id: '6', name: 'Contact', path: '/contact' },
    ];

    const defaultContact = {
        phone: '0324-7569469',
        email: 'blessings.eduvisa@gmail.com',
        address: 'Office # 316, 3rd Floor, Al-Hafeez Executive, Block C3 Gulberg III, Lahore'
    };

    const defaultHero = {
        title: 'Design Your Global Future',
        subtitle: 'Navigating the complexities of international admissions. From selecting the perfect university to securing your visa, we are with you at every step.',
        image: heroImg
    };

    // Helper to load or use default
    const loadState = (key, fallback) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    };

    // State
    const [stats, setStats] = useState(() => loadState('stats', defaultStats));
    const [countries, setCountries] = useState(() => {
        const saved = loadState('countries', defaultCountries);
        if (saved && saved.length !== 7) {
            localStorage.setItem('countries', JSON.stringify(defaultCountries));
            return defaultCountries;
        }
        return saved;
    });
    const [testimonials, setTestimonials] = useState(() => loadState('testimonials', defaultTestimonials));
    const [contact, setContact] = useState(() => loadState('contact', defaultContact));
    const [applications, setApplications] = useState(() => loadState('applications', []));
    const [inquiries, setInquiries] = useState(() => loadState('inquiries', defaultInquiries));
    const [services, setServices] = useState(() => loadState('services', defaultServices));
    const [processSteps, setProcessSteps] = useState(() => loadState('processSteps', defaultProcessSteps));
    const [heroData, setHeroData] = useState(() => {
        const saved = loadState('heroData', defaultHero);
        if (saved && saved.image === 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800') {
            localStorage.setItem('heroData', JSON.stringify(defaultHero));
            return defaultHero;
        }
        return saved;
    });
    const [navLinks, setNavLinks] = useState(() => loadState('navLinks', defaultNavLinks));
    const [adminCredentials, setAdminCredentials] = useState(() => loadState('adminCredentials', { email: 'shahzaib@gmail.com', password: 'shahzaib@123' }));

    // Persist effects
    useEffect(() => localStorage.setItem('stats', JSON.stringify(stats)), [stats]);
    useEffect(() => localStorage.setItem('countries', JSON.stringify(countries)), [countries]);
    useEffect(() => localStorage.setItem('testimonials', JSON.stringify(testimonials)), [testimonials]);
    useEffect(() => localStorage.setItem('contact', JSON.stringify(contact)), [contact]);
    useEffect(() => localStorage.setItem('applications', JSON.stringify(applications)), [applications]);
    useEffect(() => localStorage.setItem('inquiries', JSON.stringify(inquiries)), [inquiries]);
    useEffect(() => localStorage.setItem('services', JSON.stringify(services)), [services]);
    useEffect(() => localStorage.setItem('processSteps', JSON.stringify(processSteps)), [processSteps]);
    useEffect(() => localStorage.setItem('heroData', JSON.stringify(heroData)), [heroData]);
    useEffect(() => localStorage.setItem('navLinks', JSON.stringify(navLinks)), [navLinks]);
    useEffect(() => localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials)), [adminCredentials]);


    // Firebase Sync Effect
    useEffect(() => {
        if (!db) return;

        console.log("Setting up Firebase listeners for admin applications...");
        
        try {
            const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
            const unsubscribeApps = onSnapshot(q, (snapshot) => {
                const appsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    date: doc.data().createdAt?.toDate().toLocaleDateString() || new Date().toLocaleDateString()
                }));
                setApplications(appsData);
            }, (error) => {
                console.warn("Firebase listener failed (falling back to local storage):", error);
            });

            return () => unsubscribeApps();
        } catch (error) {
             console.warn("Firebase query setup failed:", error);
        }
    }, []);


    // Update Functions (Synchronous Local Updates)
    const updateStat = (id, data) => {
        setStats(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
    };

    const addCountry = (newCountry) => {
        setCountries(prev => [...prev, { ...newCountry, id: Date.now().toString() }]);
    };

    const removeCountry = (id) => {
        setCountries(prev => prev.filter(c => c.id !== id));
    };

    const addTestimonial = (newTestimonial) => {
        setTestimonials(prev => [...prev, { ...newTestimonial, id: Date.now().toString() }]);
    };

    const removeTestimonial = (id) => {
        setTestimonials(prev => prev.filter(t => t.id !== id));
    };

    const updateContact = (field, value) => {
        setContact(prev => ({ ...prev, [field]: value }));
    };

    const updateAdminCredentials = (email, password) => {
        setAdminCredentials({ email, password });
    };

    const addApplication = (applicationData) => {
        const newApp = {
            ...applicationData,
            id: Date.now().toString(),
            status: 'Pending',
            date: new Date().toLocaleDateString()
        };
        setApplications(prev => [newApp, ...prev]);
        return Promise.resolve(newApp); // Keep Promise signature for compatibility
    };

    const removeApplication = (id) => {
        setApplications(prev => prev.filter(app => app.id !== id));
    };

    const addInquiry = (inquiryData) => {
        const newInquiry = {
            ...inquiryData,
            id: Date.now().toString(),
            status: 'New',
            date: new Date().toLocaleDateString()
        };
        setInquiries(prev => [newInquiry, ...prev]);
        return Promise.resolve(newInquiry);
    };

    const removeInquiry = (id) => {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
    };

    const updateApplicationStatus = (id, newStatus) => {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    };

    const updateContent = (docId, data) => {
        if (docId === 'hero') {
            setHeroData(data);
        }
    };

    const addService = (service) => {
        setServices(prev => [...prev, { ...service, id: Date.now().toString() }]);
    };

    const removeService = (id) => {
        setServices(prev => prev.filter(s => s.id !== id));
    };

    const updateProcessStep = (id, data) => {
        setProcessSteps(prev => prev.map(step => step.id === id ? { ...step, ...data } : step));
    };

    const addNavLink = (link) => {
        setNavLinks(prev => [...prev, { ...link, id: Date.now().toString() }]);
    };

    const removeNavLink = (id) => {
        setNavLinks(prev => prev.filter(l => l.id !== id));
    };

    const updateNavLink = (id, data) => {
        setNavLinks(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
    };

    const resetToDefaults = () => {
        if (confirm('Are you sure you want to reset all data to factory defaults?')) {
            localStorage.clear();
            setStats(defaultStats);
            setCountries(defaultCountries);
            setTestimonials(defaultTestimonials);
            setContact(defaultContact);
            setServices(defaultServices);
            setProcessSteps(defaultProcessSteps);
            setHeroData(defaultHero);
            setApplications([]);
            setInquiries(defaultInquiries); // Ensure inquiries are reset to defaults
            window.location.reload();
        }
    };

    return (
        <DataContext.Provider value={{
            stats,
            countries,
            testimonials,
            contact,
            applications,
            inquiries,
            heroData,
            services,
            processSteps,
            updateStat,
            addCountry,
            removeCountry,
            addTestimonial,
            removeTestimonial,
            updateContact,
            addApplication,
            removeApplication, // Added
            addInquiry,
            removeInquiry, // Added
            updateApplicationStatus,
            updateContent,
            addService,
            removeService,
            updateProcessStep,
            navLinks,
            addNavLink,
            removeNavLink,
            updateNavLink,
            adminCredentials,
            updateAdminCredentials,
            resetToDefaults
        }}>
            {children}
        </DataContext.Provider>
    );
};
