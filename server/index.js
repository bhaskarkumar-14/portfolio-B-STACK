import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import contactRoutes from './routes/contact.js';
import paymentRoutes from './routes/payment.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import blogRoutes from './routes/blog.js';

app.use('/api/contact', contactRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('DevAgency CRM Backend is Running');
});

// Database Connection
// Database Connection (Non-blocking)
if (process.env.MONGO_URI && process.env.MONGO_URI.includes('mongodb')) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log('MongoDB Connection Failed (Offline Mode Active)', err));
} else {
    console.log('ℹ️ No Valid MongoDB URI found. Starting in Offline/Demo Mode.');
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
