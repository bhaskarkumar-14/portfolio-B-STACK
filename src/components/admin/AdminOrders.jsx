import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import { CreditCard, CheckCircle } from 'lucide-react';

const AdminOrders = () => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/admin/orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchOrders();
    }, [token]);

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Order History</h1>
                <p className="text-gray-400">View all transactions.</p>
            </div>

            <div className="glass-card overflow-hidden rounded-2xl border border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-300 border-b border-white/5">
                            <tr>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Order ID</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Plan</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Amount</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider">Status</th>
                                <th className="p-6 font-bold uppercase text-xs tracking-wider text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 text-gray-400 font-mono text-sm">
                                        {order.orderId}
                                    </td>
                                    <td className="p-6">
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
                                            {order.plan}
                                        </span>
                                    </td>
                                    <td className="p-6 text-white font-bold">
                                        ₹{order.amount.toLocaleString()}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                                            <CheckCircle className="w-4 h-4" /> Paid
                                        </div>
                                    </td>
                                    <td className="p-6 text-right text-gray-500 text-sm">
                                        {new Date(order.date || order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminOrders;
