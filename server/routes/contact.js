import express from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a new contact form lead
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        // Basic Validation
        if (!firstName || !email || !message) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
        }

        const name = `${firstName} ${lastName || ''}`.trim();

        // Offline Safe Saving
        if (mongoose.connection.readyState === 1) {
            const newLead = new Lead({
                name,
                email,
                message
            });
            await newLead.save();
        } else {
            console.log('⚠️ Offline Mode: Skipped Saving Lead', { name, email, message });
        }

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Contact API Error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
