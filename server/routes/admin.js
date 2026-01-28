import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Lead from '../models/Lead.js';
import Order from '../models/orderModel.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   GET /api/admin/stats
// @desc    Get dashboard stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    // Offline Mode Check
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: true,
            stats: {
                revenue: 145000,
                leads: 12,
                orders: 5
            }
        });
    }

    try {
        const leadCount = await Lead.countDocuments();
        const orders = await Order.find({ status: 'paid' });
        const revenue = orders.reduce((acc, order) => acc + (order.amount || 0), 0);
        const orderCount = orders.length;

        res.json({
            success: true,
            stats: {
                revenue,
                leads: leadCount,
                orders: orderCount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/admin/leads
// @desc    Get all leads
// @access  Private/Admin
router.get('/leads', protect, admin, async (req, res) => {
    // Offline Mode Check
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: true,
            leads: [
                { _id: '1', name: 'Alice Smith', email: 'alice@test.com', message: 'Need a website', date: Date.now() },
                { _id: '2', name: 'Bob Jones', email: 'bob@test.com', message: 'Pricing for app?', date: Date.now() }
            ]
        });
    }

    try {
        const leads = await Lead.find({}).sort({ date: -1 });
        res.json({ success: true, leads });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', protect, admin, async (req, res) => {
    // Offline Mode Check
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: true,
            orders: [
                { _id: '1', orderId: 'ord_123', plan: 'Enterprise', amount: 85000, status: 'paid', date: Date.now() },
                { _id: '2', orderId: 'ord_456', plan: 'Starter', amount: 14999, status: 'paid', date: Date.now() }
            ]
        });
    }

    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
