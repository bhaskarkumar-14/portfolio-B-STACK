import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose'; // Fixed: Added missing import
import Order from '../models/orderModel.js';
import Wallet from '../models/Wallet.js';

const router = express.Router();

// Initialize Razorpay
// NOTE: Using placeholder keys. User must update .env for real payments.
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_PLACEHOLDER',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_PLACEHOLDER',
});

// @route   GET /api/payment/key
// @desc    Get Razorpay Key ID
router.get('/key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID || 'rzp_test_PLACEHOLDER' });
});

// @route   POST /api/payment/create-order
// @desc    Create a Razorpay order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, plan, currency = 'INR' } = req.body;

        // SIMULATION MODE: If keys are missing/dummy, fake the order
        if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes('PLACEHOLDER')) {
            console.log('⚠️ Simulation Mode: Creating Mock Order');
            const mockOrder = {
                id: `order_mock_${Date.now()}`,
                amount: amount * 100,
                currency,
                status: 'created'
            };

            // Save Mock Order (Only if DB connected)
            if (mongoose.connection.readyState === 1) {
                const newOrder = new Order({
                    plan,
                    amount,
                    currency,
                    orderId: mockOrder.id,
                    status: 'pending'
                });
                await newOrder.save();
            } else {
                console.log('⚠️ Offline Mode: Skipped Saving Order');
            }

            return res.json({ success: true, order: mockOrder, isMock: true });
        }

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Save initial order to DB
        const newOrder = new Order({
            plan,
            amount,
            currency,
            orderId: order.id,
            status: 'pending'
        });
        await newOrder.save();

        res.json({ success: true, order });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    }
});

// @route   POST /api/payment/verify
// @desc    Verify payment signature and top-up wallet
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email } = req.body;

        // SIMULATION MODE: Bypass signature check for mock orders
        if (razorpay_order_id.startsWith('order_mock_')) {
            console.log('⚠️ Simulation Mode: Verifying Mock Payment');

            // Simulating Success (Offline Safe)
            if (mongoose.connection.readyState === 1) {
                const order = await Order.findOne({ orderId: razorpay_order_id });
                if (order) {
                    order.status = 'paid';
                    order.paymentId = `pay_mock_${Date.now()}`;
                    await order.save();

                    // Top-up Wallet
                    let wallet = await Wallet.findOne({ userId: email });
                    if (!wallet) {
                        wallet = new Wallet({ userId: email });
                    }

                    wallet.balance += (order.amount);
                    wallet.history.push({
                        type: 'credit',
                        amount: order.amount,
                        description: `Added funds via Simulator`
                    });
                    await wallet.save();
                }
            } else {
                console.log('⚠️ Offline Mode: Skipped DB Update');
            }

            return res.json({ success: true, message: 'Mock Payment Verified' });
        }

        // Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_PLACEHOLDER')
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // 1. Update Order Status
            const order = await Order.findOne({ orderId: razorpay_order_id });
            if (order) {
                order.status = 'paid';
                order.paymentId = razorpay_payment_id;
                await order.save();

                // 2. Top-up Wallet
                let wallet = await Wallet.findOne({ userId: email });
                if (!wallet) {
                    wallet = new Wallet({ userId: email });
                }

                wallet.balance += order.amount;
                wallet.history.push({
                    type: 'credit',
                    amount: order.amount,
                    description: `Added funds via Razorpay (Order: ${razorpay_order_id})`
                });
                await wallet.save();

                res.json({ success: true, message: 'Payment verified and Wallet updated' });
            } else {
                res.status(404).json({ success: false, message: 'Order not found' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Invalid Signature' });
        }
    } catch (error) {
        console.error('Verify Payment Error:', error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
});

// @route   GET /api/payment/wallet/:email
// @desc    Get wallet balance
router.get('/wallet/:email', async (req, res) => {
    try {
        // Offline Mode Fallback
        if (mongoose.connection.readyState !== 1) {
            return res.json({
                balance: 14999,
                history: [
                    { type: 'credit', amount: 14999, description: 'Simulated Wallet Balance', date: new Date() }
                ]
            });
        }

        const wallet = await Wallet.findOne({ userId: req.params.email });
        if (!wallet) {
            return res.json({ balance: 0, history: [] });
        }
        res.json({ balance: wallet.balance, history: wallet.history });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
