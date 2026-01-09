import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../auth/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import {
    BarChart3,
    Users,
    FileText,
    Bell,
    Search,
    Download,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    Loader2
} from 'lucide-react';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('applications');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!db) {
            const mockDocs = [
                { id: 'APP001', fullName: 'Sarah Ahmed', destination: 'UK', course: 'Computer Science', status: 'Pending', date: '2024-03-10' },
                { id: 'APP002', fullName: 'Rajiv Sharma', destination: 'Canada', course: 'MBA', status: 'Approved', date: '2024-03-08' },
                { id: 'APP003', fullName: 'Emily Chen', destination: 'USA', course: 'Data Science', status: 'In Review', date: '2024-03-07' }
            ];
            setApplications(mockDocs);
            setLoading(false);
            return;
        }

        const q = query(collection(db, "applications"), orderBy("createdAt", "desc"), limit(20));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: doc.data().createdAt?.toDate().toLocaleDateString() || 'Recent'
            }));
            setApplications(docs);
            setLoading(false);
        }, (error) => {
            console.error("Firebase Error:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const stats = [
        { label: 'Total Applications', value: applications.length, icon: FileText, change: '+12%', color: 'text-blue-600' },
        { label: 'Active Students', value: '92', icon: Users, change: '+5%', color: 'text-green-600' },
        { label: 'Visa Success', value: '99.2%', icon: TrendingUp, change: '+0.4%', color: 'text-gold' },
        { label: 'New Reviews', value: '24', icon: Bell, change: '+18%', color: 'text-purple-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-navy text-white hidden lg:flex flex-col">
                <div className="p-8 pb-12">
                    <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Admin Hub</h2>
                </div>
                <nav className="flex-grow px-4 space-y-2">
                    {[
                        { name: 'Dashboard', id: 'dashboard', icon: BarChart3 },
                        { name: 'Applications', id: 'applications', icon: FileText },
                        { name: 'Students', id: 'students', icon: Users },
                        { name: 'Settings', id: 'settings', icon: Bell }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-gold text-navy font-bold shadow-lg' : 'text-gray-400 hover:bg-white/5'
                                }`}
                        >
                            {(() => {
                                const NavIcon = item.icon;
                                return <NavIcon size={20} />;
                            })()}
                            {item.name}
                        </button>
                    ))}
                </nav>
                <div className="p-8 border-t border-white/10">
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">Logout Account</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 lg:p-12 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
                        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input type="text" placeholder="Search..." className="pl-12 pr-6 py-3 bg-white rounded-xl border border-gray-200 outline-none w-full md:w-80 shadow-sm" />
                        </div>
                        <button className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50"><Bell size={20} /></button>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-gray-50 ${stat.color}`}>
                                    {(() => {
                                        const StatIcon = stat.icon;
                                        return <StatIcon size={24} />;
                                    })()}
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.change}</span>
                            </div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-black text-navy mt-1">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tables / List */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-navy">Recent Applications</h3>
                        <button className="flex items-center gap-2 text-gold font-bold text-sm hover:underline">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-bold">
                                    <th className="px-8 py-4">ID</th>
                                    <th className="px-8 py-4">Student</th>
                                    <th className="px-8 py-4">Destination</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Date</th>
                                    <th className="px-8 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-5 text-sm font-bold text-navy">{app.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xs">{(app.fullName || 'S')[0]}</div>
                                                <p className="text-sm font-semibold">{app.fullName || 'Student'}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-gray-600">{app.destination}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${app.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                                app.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                                    app.status === 'In Review' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-sm text-gray-400">{app.date}</td>
                                        <td className="px-8 py-5">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors group-hover:shadow-sm">
                                                <MoreVertical size={16} className="text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;
