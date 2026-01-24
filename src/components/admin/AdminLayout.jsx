import { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, FileText, LogOut } from 'lucide-react';
import AuthContext from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    // In a real router, check location.pathname. 
    // Since we are simulating simple routing in App.jsx, we might not get full location support unless we import useLocation.
    // For this demo, we'll just implement the sidebar.

    const navItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
        { name: 'Leads', icon: Users, path: '/admin/leads' },
        { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
        // { name: 'Blog', icon: FileText, path: '/admin/blog' },
    ];

    return (
        <div className="min-h-screen bg-secondary flex">
            {/* Sidebar */}
            <aside className="w-64 bg-dark border-r border-white/10 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold text-white tracking-widest uppercase">Admin<span className="text-primary">Panel</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${window.location.pathname === item.path
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </a>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
