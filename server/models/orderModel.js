import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    plan: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    orderId: { type: String, required: true },
    paymentId: { type: String },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
