import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    LayoutDashboard, PlusCircle, LogOut, FileText,
    TrendingUp, Users, ShoppingBag, Trash2, Edit, ArrowRight
} from 'lucide-react';
import { API_URL } from '../../config';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ revenue: 0, leads: 0, orders: 0 });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');

                // 1. Fetch Stats
                const statsResponse = await fetch(`${API_URL}/api/admin/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const statsData = await statsResponse.json();
                if (statsData.success) setStats(statsData.stats);

                // 2. Fetch Blog Posts
                // Re-using the public API for listing, but in a real app might need admin-specific list
                const postsResponse = await fetch('/api/blog');
                const postsData = await postsResponse.json();
                if (postsData.success) setPosts(postsData.posts);

            } catch (error) {
                console.error("Dashboard Load Error", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        // TODO: Implement Delete API Call
        console.log("Deleting:", id);
        alert("Delete feature coming in next update!");
    };

    if (loading) return (
        <div className="min-h-screen bg-secondary flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-secondary">
            {/* Navbar */}
            <nav className="border-b border-white/10 bg-secondary/95 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground font-bold text-xl">
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        Admin Panel
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden sm:block">Welcome, Admin</span>
                        <button
                            onClick={handleLogout}
                            className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-red-400 transition-colors"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-foreground">â‚¹{(stats.revenue || 0).toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Leads</p>
                            <h3 className="text-2xl font-bold text-foreground">{stats.leads || 0}</h3>
                        </div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Completed Orders</p>
                            <h3 className="text-2xl font-bold text-foreground">{stats.orders || 0}</h3>
                        </div>
                    </div>
                </div>

                {/* Content Management Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" />
                        Blog Integration Status
                    </h2>
                </div>

                {/* Integration Notice */}
                <div className="glass-card border border-white/5 rounded-2xl p-8 text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Dev.to Live Feed Active</h3>
                    <p className="text-gray-400 max-w-lg mx-auto mb-6">
                        Your public blog is currently connected to the <strong>Dev.to API</strong>.
                        New articles tagged with 'webdev' will appear automatically on your website.
                        You do not need to manually create posts here.
                    </p>
                    <a
                        href="https://dev.to/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-medium transition-all"
                    >
                        Manage on Dev.to <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
