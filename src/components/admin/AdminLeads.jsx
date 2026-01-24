import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import { Mail, Search, Trash2 } from 'lucide-react';

const AdminLeads = () => {
    const { token } = useContext(AuthContext);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/admin/leads', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setLeads(data.leads);
                }
            } catch (err) {
                console.error("Failed to fetch leads", err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchLeads();
    }, [token]);

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Leads Manager</h1>
                    <p className="text-gray-400">Manage contact form submissions.</p>
                </div>
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-primary w-64"
                    />
                </div>
            </div>

            <div className="glass-card overflow-hidden rounded-2xl border border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-300 border-b border-white/5">
                            <tr>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Name</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Email</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Message</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Date</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <div className="font-bold text-white">{lead.name}</div>
                                    </td>
                                    <td className="p-6 text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3 h-3 text-primary" /> {lead.email}
                                        </div>
                                    </td>
                                    <td className="p-6 text-gray-400 max-w-xs truncate">{lead.message}</td>
                                    <td className="p-6 text-gray-500 text-sm">
                                        {new Date(lead.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {leads.length === 0 && !loading && (
                    <div className="p-12 text-center text-gray-500">No leads found.</div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminLeads;
