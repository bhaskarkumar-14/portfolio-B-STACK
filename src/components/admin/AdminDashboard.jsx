import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [stats, setStats] = useState({ revenue: 0, leads: 0, orders: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
                }
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchStats();
    }, [token]);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="glass-card p-6 rounded-2xl border border-white/5 shadow-xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            {/* Fake Trend Line */}
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-500/10 w-fit px-2 py-1 rounded-lg">
                <TrendingUp className="w-3 h-3" /> +12% this week
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back, Admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="blue"
                />
                <StatCard
                    title="Total Leads"
                    value={stats.leads}
                    icon={Users}
                    color="purple"
                />
                <StatCard
                    title="Active Orders"
                    value={stats.orders}
                    icon={ShoppingCart}
                    color="emerald"
                />
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="glass-card p-8 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Recent System Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <p className="text-gray-300">New user registered via Referral Link.</p>
                            <span className="ml-auto text-gray-500 text-sm">2m ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
