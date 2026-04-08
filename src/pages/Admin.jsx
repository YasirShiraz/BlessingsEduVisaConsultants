import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_final.png';
import {
    BarChart3,
    Users,
    FileText,
    Bell,
    Search,
    ChevronRight,
    TrendingUp,
    Settings,
    Globe2,
    Phone,
    Plus,
    Trash2,
    Save,
    LayoutDashboard,
    Briefcase,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Mail,
    MapPin,
    AlertCircle,
    Star,
    Quote,
    Image as ImageIcon,
    Target
} from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [contentTab, setContentTab] = useState('hero');
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
    const {
        stats,
        countries,
        testimonials,
        contact,
        applications,
        inquiries, // Added
        removeInquiry, // Added
        removeApplication, // Added
        heroData,
        services,
        updateStat,
        addCountry,
        removeCountry,
        addTestimonial,
        removeTestimonial,
        updateContact,
        updateContent,
        addService,
        removeService,
        processSteps,
        updateProcessStep,
        navLinks,
        addNavLink,
        removeNavLink,
        updateNavLink,
        resetToDefaults
    } = useData();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // New Country Form State (Expanded)
    const [newCountry, setNewCountry] = useState({
        name: '',
        code: '',
        flag: '',
        image: '',
        students: '',
        rating: '5.0',
        description: '',
        benefits: '' // Will split by comma
    });

    // New Testimonial Form State
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        country: '',
        text: '',
        rating: 5
    });

    // New Service Form State
    const [newService, setNewService] = useState({
        title: '',
        desc: '',
        icon: 'Search' // Default icon
    });

    // New Nav Link Form State
    const [newNavLink, setNewNavLink] = useState({
        name: '',
        path: '/'
    });

    // Hero Form State (Sync with heroData when loaded)
    const [heroForm, setHeroForm] = useState({
        title: '',
        subtitle: '',
        image: ''
    });

    // Stats Local State
    const [localStats, setLocalStats] = useState([]);

    useEffect(() => {
        if (heroData) {
            setHeroForm(heroData);
        }
    }, [heroData]);

    useEffect(() => {
        if (stats && stats.length > 0) {
            setLocalStats(stats);
        }
    }, [stats]);

    const handleUpdateHero = (e) => {
        e.preventDefault();
        updateContent('hero', heroForm);
    };

    const handleAddService = (e) => {
        e.preventDefault();
        if (newService.title && newService.desc) {
            addService(newService);
            setNewService({ title: '', desc: '', icon: 'Search' });
        }
    };

    const dashboardStats = [
        { label: 'Total Applications', value: applications.length, icon: FileText, change: '+12.5%', color: 'from-blue-500 to-blue-600' },
        { label: stats.find(s => s.key === 'visa_success')?.label || 'Successful Visas', value: stats.find(s => s.key === 'visa_success')?.value || '98%', icon: TrendingUp, change: '+2.1%', color: 'from-emerald-500 to-emerald-600' },
        { label: stats.find(s => s.key === 'satisfied_students')?.label || 'Active Students', value: stats.find(s => s.key === 'satisfied_students')?.value || '500', icon: Users, change: '+5.4%', color: 'from-gold to-orange-500' },
        { label: stats.find(s => s.key === 'universities')?.label || 'Global Partners', value: stats.find(s => s.key === 'universities')?.value || '1000+', icon: Globe2, change: '+8', color: 'from-indigo-500 to-purple-600' }
    ];

    const handleAddCountry = (e) => {
        e.preventDefault();
        if (newCountry.name && newCountry.flag) {
            const formattedCountry = {
                ...newCountry,
                benefits: newCountry.benefits.split(',').map(b => b.trim()).filter(b => b !== '')
            };
            addCountry(formattedCountry);
            setNewCountry({ name: '', code: '', flag: '', image: '', students: '', rating: '5.0', description: '', benefits: '' });
        }
    };

    const handleAddTestimonial = (e) => {
        e.preventDefault();
        if (newTestimonial.name && newTestimonial.text) {
            addTestimonial(newTestimonial);
            setNewTestimonial({ name: '', country: '', text: '', rating: 5 });
        }
    };

    const handleAddNavLink = (e) => {
        e.preventDefault();
        if (newNavLink.name && newNavLink.path) {
            addNavLink(newNavLink);
            setNewNavLink({ name: '', path: '/' });
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    // Close sidebar on mobile route change
    useEffect(() => {
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans relative overflow-x-hidden">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-navy/80 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 h-full z-50 bg-navy text-white transition-all duration-300 ease-in-out border-r border-white/5 shadow-2xl lg:shadow-none
                ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-24'}
            `}>
                <div className="p-8 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 overflow-hidden"
                            >
                                <div className="bg-white p-1 rounded-lg shrink-0 shadow-sm">
                                    <img src={logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                                </div>
                                <span className="font-black text-xl tracking-tight opacity-100 whitespace-nowrap">Blessings <span className="text-gold">Admin</span></span>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white p-1 rounded-lg mx-auto shadow-sm"
                            >
                                <img src={logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-grow px-4 mt-6 space-y-2">
                    {[
                        { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
                        { name: 'Applications', id: 'applications', icon: Briefcase },
                        { name: 'Inquiries', id: 'inquiries', icon: Mail }, // Added
                        { name: 'Content Settings', id: 'content', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative group
                                ${activeTab === item.id
                                    ? 'bg-gold text-navy font-bold shadow-xl shadow-gold/10'
                                    : 'text-white/50 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <div className={`${activeTab === item.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                <item.icon size={22} />
                            </div>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-sm tracking-wide"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute right-2 w-1.5 h-6 bg-navy rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-4 px-4 py-3 text-white/40 hover:text-white transition-colors text-sm rounded-xl"
                    >
                        <ExternalLink size={18} />
                        {isSidebarOpen && <span>View Website</span>}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all text-sm rounded-xl group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        {isSidebarOpen && <span>Logout Account</span>}
                    </button>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className={`flex-grow flex flex-col transition-all duration-300 min-h-screen ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>

                {/* Header */}
                <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:px-12 sticky top-0 z-20 backdrop-blur-md bg-white/80">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-gray-50 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-xl transition-all"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div className="flex items-center gap-3 lg:hidden leading-none">
                            <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-100">
                                <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-navy text-sm tracking-tight leading-none">Blessings <span className="text-brandgreen">EduVisa</span></span>
                                <span className="text-[8px] uppercase tracking-widest font-bold text-gray-400">Admin</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2.5 bg-gray-50 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-xl transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="h-10 w-[1px] bg-gray-100"></div>
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:block text-right">
                                <p className="text-sm font-black text-navy">{user?.displayName || 'Admin User'}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Admin Panel</p>
                            </div>
                            <img
                                src={user?.photoURL || "https://ui-avatars.com/api/?name=Admin+User&background=001F3F&color=fff"}
                                className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md"
                                alt="Admin"
                            />
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-8 lg:p-12 max-w-[1440px] mx-auto w-full">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h2 className="text-4xl font-black text-navy tracking-tight mb-2">Platform Overview</h2>
                                    <p className="text-gray-500 text-lg">Welcome back. Monitoring global student activity.</p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                                {dashboardStats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500"
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className={`p-4 rounded-[1.25rem] bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                                                {stat.change}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.15em]">{stat.label}</p>
                                            <h4 className="text-4xl font-black text-navy">{stat.value}</h4>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Recent Applications Preview */}
                            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center">
                                    <h3 className="text-2xl font-black text-navy">Recent Submissions</h3>
                                    <button
                                        onClick={() => setActiveTab('applications')}
                                        className="text-gold font-black text-xs uppercase tracking-widest"
                                    >
                                        View All Directory
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left min-w-[800px]">
                                        <thead>
                                            <tr className="bg-[#FBFCFD] text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                                <th className="px-6 md:px-10 py-6">ID</th>
                                                <th className="px-6 md:px-10 py-6">Student</th>
                                                <th className="px-10 py-6">Target</th>
                                                <th className="px-10 py-6">Status</th>
                                                <th className="px-10 py-6">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {applications.slice(0, 5).map((app) => (
                                                <tr key={app.id} className="hover:bg-gray-50/50">
                                                    <td className="px-10 py-7 text-xs font-black text-navy">#{app.id}</td>
                                                    <td className="px-10 py-7">
                                                        <div className="font-black text-navy">{app.fullName}</div>
                                                        <div className="text-xs text-gray-400">{app.email}</div>
                                                    </td>
                                                    <td className="px-10 py-7 text-sm font-bold text-gray-600 uppercase tracking-wide">{app.destination}</td>
                                                    <td className="px-10 py-7">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            app.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                                'bg-blue-50 text-blue-600 border-blue-100'
                                                            }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-7 text-xs text-gray-300">{app.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-navy tracking-tight">Full Applications List</h2>
                            <div className="grid gap-4">
                                {applications.length === 0 ? <p className="text-gray-400">No applications received yet.</p> : applications.map((app) => (
                                    <div key={app.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative group">
                                        <button
                                            onClick={() => removeApplication(app.id)}
                                            className="absolute top-6 right-6 p-2 text-red-400 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                                            title="Delete Application"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex gap-6 items-center">
                                            <div className="w-16 h-16 bg-navy text-gold rounded-2xl flex items-center justify-center font-black text-2xl uppercase">
                                                {app.fullName?.[0] || 'S'}
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-navy">{app.fullName}</h4>
                                                <div className="text-xs text-gray-400 flex flex-wrap gap-4 mt-1">
                                                    <span className="flex items-center gap-1"><Mail size={12} /> {app.email}</span>
                                                    <span className="flex items-center gap-1"><Phone size={12} /> {app.phone}</span>
                                                    <span className="flex items-center gap-1"><MapPin size={12} /> {app.destination}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-5 py-2 rounded-2xl text-[10px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100">{app.status}</span>
                                            <p className="text-[10px] text-gray-300 font-bold mt-2 uppercase">{app.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'inquiries' && (
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-navy tracking-tight">Contact Inquiries</h2>
                            <div className="grid gap-4">
                                {inquiries && inquiries.length > 0 ? inquiries.map((inq) => (
                                    <div key={inq.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative group">
                                        <button
                                            onClick={() => removeInquiry(inq.id)}
                                            className="absolute top-6 right-6 p-2 text-red-400 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                                            title="Delete Inquiry"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-navy text-lg">{inq.name}</h4>
                                                    <p className="text-xs text-gray-400">{inq.email}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-300 uppercase mr-8">{inq.date}</span>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-2xl">
                                            <p className="text-gray-600 text-sm leading-relaxed italic">"{inq.message}"</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100">
                                        <Mail size={48} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-gray-400 font-bold">No inquiries messages yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <h2 className="text-4xl font-black text-navy tracking-tight">Content Settings</h2>
                            </div>

                            {/* Sub-tabs Navigation */}
                            <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full overflow-x-auto">
                                {[
                                    { id: 'hero', label: 'Hero Section', icon: LayoutDashboard },
                                    { id: 'services', label: 'Services', icon: Briefcase },
                                    { id: 'destinations', label: 'Destinations', icon: Globe2 },
                                    { id: 'process', label: 'Process', icon: Settings },
                                    { id: 'testimonials', label: 'Reviews', icon: Quote },
                                    { id: 'navbar', label: 'Navbar', icon: Menu },
                                    { id: 'misc', label: 'Contact & Stats', icon: TrendingUp },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setContentTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${contentTab === tab.id
                                            ? 'bg-navy text-gold shadow-lg'
                                            : 'text-gray-400 hover:bg-gray-50 hover:text-navy'
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Hero Section Control */}
                            {contentTab === 'hero' && (
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-navy mb-6 flex items-center gap-3">
                                        <LayoutDashboard className="text-gold" /> Homepage Hero Section
                                    </h3>
                                    <form onSubmit={handleUpdateHero} className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Main Title</label>
                                            <input
                                                type="text"
                                                value={heroForm.title}
                                                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-gold outline-none"
                                                placeholder="Design Your Global Future"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Subtitle</label>
                                            <textarea
                                                rows={3}
                                                value={heroForm.subtitle}
                                                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-gold outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Hero Image URL</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={heroForm.image}
                                                    onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
                                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-gold outline-none"
                                                />
                                                <div className="w-20 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                                                    {heroForm.image && <img src={heroForm.image} alt="Preview" className="w-full h-full object-cover" />}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button type="submit" className="bg-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-navy/90 transition-all flex items-center gap-2">
                                                <Save size={18} /> Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            )}

                            {/* Services Control */}
                            {contentTab === 'services' && (
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3">
                                        <Briefcase className="text-gold" /> Services Management
                                    </h3>
                                    <form onSubmit={handleAddService} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-8 grid md:grid-cols-3 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Service Title"
                                            value={newService.title}
                                            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                            className="px-6 py-3 bg-white rounded-xl border border-gray-200 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={newService.desc}
                                            onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                                            className="px-6 py-3 bg-white rounded-xl border border-gray-200 outline-none"
                                        />
                                        <div className="flex gap-2">
                                            <select
                                                value={newService.icon}
                                                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                                                className="px-6 py-3 bg-white rounded-xl border border-gray-200 outline-none w-full appearance-none"
                                            >
                                                <option value="Search">Search</option>
                                                <option value="CheckCircle2">Check</option>
                                                <option value="FileText">File</option>
                                                <option value="BadgeCheck">Badge</option>
                                                <option value="ShieldCheck">Shield</option>
                                            </select>
                                            <button type="submit" className="bg-gold text-navy p-3 rounded-xl font-black hover:bg-navy hover:text-white transition-all shrink-0">
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    </form>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {services.map(s => (
                                            <div key={s.id} className="p-6 bg-white border border-gray-100 rounded-3xl flex justify-between items-start group shadow-sm hover:shadow-md transition-all">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-[10px] font-black uppercase text-gold bg-gold/10 px-2 py-1 rounded-lg">{s.icon}</span>
                                                        <h4 className="font-black text-navy">{s.title}</h4>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{s.desc}</p>
                                                </div>
                                                <button onClick={() => removeService(s.id)} className="text-red-400 hover:bg-red-50 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Process Steps Control */}
                            {contentTab === 'process' && (
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-navy mb-8 flex items-center gap-3">
                                        <Settings className="text-gold" /> Process Steps Configuration
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {processSteps.map((step) => (
                                            <div key={step.id} className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-black">
                                                        {step.id}
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Step Title</label>
                                                        <input
                                                            type="text"
                                                            value={step.title}
                                                            onChange={(e) => updateProcessStep(step.id, { title: e.target.value })}
                                                            className="w-full bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-navy outline-none focus:border-gold"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">Description</label>
                                                    <textarea
                                                        rows={2}
                                                        value={step.desc}
                                                        onChange={(e) => updateProcessStep(step.id, { desc: e.target.value })}
                                                        className="w-full bg-white px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-gold"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Misc: Stats and Contact */}
                            {/* Navbar Management */}
                            {contentTab === 'navbar' && (
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3">
                                        <Menu className="text-gold" /> Navbar Navigation Links
                                    </h3>
                                    <form onSubmit={handleAddNavLink} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 mb-8 grid md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Link Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Home"
                                                value={newNavLink.name}
                                                onChange={(e) => setNewNavLink({ ...newNavLink, name: e.target.value })}
                                                className="w-full px-6 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">Path</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. /about"
                                                value={newNavLink.path}
                                                onChange={(e) => setNewNavLink({ ...newNavLink, path: e.target.value })}
                                                className="w-full px-6 py-3 bg-white rounded-xl border border-gray-200 outline-none focus:border-gold"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button type="submit" className="w-full bg-navy text-gold p-3 rounded-xl font-black hover:bg-gold hover:text-navy transition-all flex items-center justify-center gap-2 mb-0.5">
                                                <Plus size={20} /> Add Link
                                            </button>
                                        </div>
                                    </form>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {navLinks.map(link => (
                                            <div key={link.id} className="p-6 bg-white border border-gray-100 rounded-3xl flex justify-between items-center group shadow-sm hover:shadow-md transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                                                        <ExternalLink size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-navy">{link.name}</h4>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{link.path}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeNavLink(link.id)} className="text-red-400 hover:bg-red-50 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {contentTab === 'misc' && (
                                <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                        <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3">
                                            <TrendingUp className="text-gold" /> Website Numbers
                                        </h3>
                                        <div className="space-y-6">
                                            {localStats.map((stat, i) => (
                                                <div key={stat.id || i} className="grid gap-2">
                                                    <div className="flex gap-4">
                                                        <div className="flex-1">
                                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Label Name</label>
                                                            <input
                                                                type="text"
                                                                value={stat.label}
                                                                onChange={(e) => {
                                                                    const newStats = [...localStats];
                                                                    newStats[i] = { ...newStats[i], label: e.target.value };
                                                                    setLocalStats(newStats);
                                                                }}
                                                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-gold outline-none font-bold text-gray-600 text-sm"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Value</label>
                                                            <input
                                                                type="text"
                                                                value={stat.value}
                                                                onChange={(e) => {
                                                                    const newStats = [...localStats];
                                                                    newStats[i] = { ...newStats[i], value: e.target.value };
                                                                    setLocalStats(newStats);
                                                                }}
                                                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-gold outline-none font-black text-navy text-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    onClick={() => {
                                                        localStats.forEach(stat => updateStat(stat.id, { label: stat.label, value: stat.value }));
                                                        alert('Stats Updated!'); // Simple feedback
                                                    }}
                                                    className="bg-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-navy/90 transition-all flex items-center gap-2 text-sm"
                                                >
                                                    <Save size={16} /> Save Stats
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                    <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                        <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3">
                                            <Phone className="text-gold" /> Contact Information
                                        </h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Hotline Number</label>
                                                <input
                                                    type="text"
                                                    value={contact.phone}
                                                    onChange={(e) => updateContact('phone', e.target.value)}
                                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Support Email</label>
                                                <input
                                                    type="email"
                                                    value={contact.email}
                                                    onChange={(e) => updateContact('email', e.target.value)}
                                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">HQ Address</label>
                                                <textarea
                                                    value={contact.address}
                                                    onChange={(e) => updateContact('address', e.target.value)}
                                                    rows={4}
                                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100"
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {/* Testimonials Control */}
                            {contentTab === 'testimonials' && (
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3 lowercase">
                                        <Quote className="text-gold" /> student testimonials
                                    </h3>
                                    <form onSubmit={handleAddTestimonial} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-navy p-8 rounded-[2.5rem] mb-10 items-end">
                                        <div>
                                            <label className="text-[10px] font-black text-gold uppercase mb-2 block tracking-widest px-2">Student Name</label>
                                            <input type="text" placeholder="e.g. Ali Khan" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="w-full px-6 py-3 bg-white/10 rounded-xl border-none outline-none text-white focus:ring-2 focus:ring-gold" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gold uppercase mb-2 block tracking-widest px-2">Country</label>
                                            <input type="text" placeholder="e.g. UK" value={newTestimonial.country} onChange={(e) => setNewTestimonial({ ...newTestimonial, country: e.target.value })} className="w-full px-6 py-3 bg-white/10 rounded-xl border-none outline-none text-white focus:ring-2 focus:ring-gold" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gold uppercase mb-2 block tracking-widest px-2">Content</label>
                                            <input type="text" placeholder="Review text..." value={newTestimonial.text} onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })} className="w-full px-6 py-3 bg-white/10 rounded-xl border-none outline-none text-white focus:ring-2 focus:ring-gold" />
                                        </div>
                                        <button type="submit" className="w-full bg-gold text-navy font-black py-3 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-xs">Add Story</button>
                                    </form>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {testimonials.map(t => (
                                            <div key={t.id} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 relative group">
                                                <Quote className="text-gold/20 mb-4" size={32} />
                                                <p className="text-sm italic text-gray-600 mb-6 leading-relaxed">"{t.text}"</p>
                                                <h5 className="font-black text-navy">{t.name}</h5>
                                                <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Study in {t.country}</p>
                                                <button onClick={() => removeTestimonial(t.id)} className="absolute top-6 right-6 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 rounded-xl">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Destinations Control */}
                            {contentTab === 'destinations' && (
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3">
                                        <Globe2 className="text-gold" /> Detailed Destinations
                                    </h3>
                                    <form onSubmit={handleAddCountry} className="bg-navy p-10 rounded-[3rem] mb-12 space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            <div>
                                                <label className="text-[10px] font-black text-gold uppercase mb-3 block px-2">Country Name & Flag</label>
                                                <div className="flex gap-2">
                                                    <input type="text" placeholder="Name" value={newCountry.name} onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })} className="w-2/3 px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                                    <input type="text" placeholder="Flag URL" value={newCountry.flag} onChange={(e) => setNewCountry({ ...newCountry, flag: e.target.value })} className="w-1/3 px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gold uppercase mb-3 block px-2">Visual Style (Unsplash URL)</label>
                                                <input type="text" placeholder="City Display Image" value={newCountry.image} onChange={(e) => setNewCountry({ ...newCountry, image: e.target.value })} className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-gold uppercase mb-3 block px-2">Stats (e.g. 50k+ / 4.9)</label>
                                                <div className="flex gap-2">
                                                    <input type="text" placeholder="Students" value={newCountry.students} onChange={(e) => setNewCountry({ ...newCountry, students: e.target.value })} className="w-1/2 px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                                    <input type="text" placeholder="Rating" value={newCountry.rating} onChange={(e) => setNewCountry({ ...newCountry, rating: e.target.value })} className="w-1/2 px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gold uppercase mb-3 block px-2">Benefits (Comma separated)</label>
                                            <input type="text" placeholder="e.g. Work Visa, Quality Education, Beautiful Nature" value={newCountry.benefits} onChange={(e) => setNewCountry({ ...newCountry, benefits: e.target.value })} className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-gold uppercase mb-3 block px-2">Short Professional Description</label>
                                            <textarea rows={3} placeholder="Describe কেন choose করবে..." value={newCountry.description} onChange={(e) => setNewCountry({ ...newCountry, description: e.target.value })} className="w-full px-6 py-4 bg-white/10 rounded-2xl border-none outline-none text-white" />
                                        </div>
                                        <button type="submit" className="w-full bg-gold text-navy font-black py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest shadow-xl">Register Global Destination</button>
                                    </form>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {countries.map(c => (
                                            <div key={c.id} className="bg-gray-50 rounded-[2.5rem] border border-gray-100 overflow-hidden relative group">
                                                <img src={c.image || "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"} className="w-full h-40 object-cover opacity-80" />
                                                <div className="p-8">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <img src={c.flag} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                                                        <h5 className="font-black text-navy">{c.name}</h5>
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 line-clamp-2 italic mb-4">"{c.description}"</p>
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-gold">
                                                        <span>{c.students} Students</span>
                                                        <span className="flex items-center gap-1"><Star size={10} fill="currentColor" /> {c.rating}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeCountry(c.id)} className="absolute top-4 right-4 p-2.5 bg-white text-red-500 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="flex justify-start pt-10 border-t border-gray-100">
                                <button onClick={resetToDefaults} className="text-[10px] font-black uppercase text-red-500 hover:bg-red-50 px-8 py-4 rounded-2xl transition-all border border-red-100">Reset System to Defaults</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Admin;
