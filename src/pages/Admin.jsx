import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {
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

    const dashboardStats = [
        { label: 'Total Applications', value: applications.length, icon: FileText, change: '+12.5%', color: 'from-blue-500 to-blue-600' },
        { label: 'Successful Visas', value: stats.find(s => s.key === 'visa_success')?.value || '98%', icon: TrendingUp, change: '+2.1%', color: 'from-emerald-500 to-emerald-600' },
        { label: 'Active Students', value: stats.find(s => s.key === 'satisfied_students')?.value || '850', icon: Users, change: '+5.4%', color: 'from-gold to-orange-500' },
        { label: 'Global Partners', value: stats.find(s => s.key === 'partners')?.value || '120+', icon: Globe2, change: '+8', color: 'from-indigo-500 to-purple-600' }
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

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar */}
            <aside className={`
                ${isSidebarOpen ? 'w-72' : 'w-24'} 
                bg-navy text-white flex flex-col fixed h-full z-30 transition-all duration-500 ease-in-out border-r border-white/5
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
                                <div className="bg-gold p-1.5 rounded-lg shrink-0">
                                    <Globe2 size={24} className="text-navy" />
                                </div>
                                <span className="font-black text-xl tracking-tight opacity-100 whitespace-nowrap">Blessings <span className="text-gold">Admin</span></span>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gold p-1.5 rounded-lg mx-auto"
                            >
                                <Globe2 size={24} className="text-navy" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <nav className="flex-grow px-4 mt-6 space-y-2">
                    {[
                        { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
                        { name: 'Applications', id: 'applications', icon: Briefcase },
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
            <div className={`flex-grow flex flex-col transition-all duration-500 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'}`}>

                {/* Header */}
                <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:px-12 sticky top-0 z-20 backdrop-blur-md bg-white/80">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-gray-50 text-gray-400 hover:text-navy hover:bg-gray-100 rounded-xl transition-all"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
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

                <main className="p-8 md:p-12 max-w-[1440px] mx-auto w-full">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h2 className="text-4xl font-black text-navy tracking-tight mb-2">Platform Overview</h2>
                                    <p className="text-gray-500 text-lg">Welcome back. Monitoring global student activity.</p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
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
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-[#FBFCFD] text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                                <th className="px-10 py-6">ID</th>
                                                <th className="px-10 py-6">Student</th>
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
                                {applications.map((app) => (
                                    <div key={app.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex gap-6 items-center">
                                            <div className="w-16 h-16 bg-navy text-gold rounded-2xl flex items-center justify-center font-black text-2xl uppercase">
                                                {app.fullName[0]}
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

                    {activeTab === 'content' && (
                        <div className="space-y-12">
                            <h2 className="text-4xl font-black text-navy tracking-tight">System Content Management</h2>

                            {/* Top Grid: Stats and Contact */}
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Statistics Control */}
                                <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-black text-navy mb-10 flex items-center gap-3">
                                        <TrendingUp className="text-gold" /> Website Numbers
                                    </h3>
                                    <div className="space-y-6">
                                        {stats.map((stat) => (
                                            <div key={stat.id}>
                                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">{stat.label}</label>
                                                <input
                                                    type="text"
                                                    value={stat.value}
                                                    onChange={(e) => updateStat(stat.id, e.target.value)}
                                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-gold outline-none font-black text-navy text-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Branding Contact Control */}
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

                            {/* Expanded Testimonials Control */}
                            <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
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

                            {/* Expanded Global Destinations Control */}
                            <section className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
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

                            <div className="flex justify-start">
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
