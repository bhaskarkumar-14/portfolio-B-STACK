import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Closed', 'Lost'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Lead', LeadSchema);
