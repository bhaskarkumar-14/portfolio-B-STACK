import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the same directory as this script (server folder)
dotenv.config({ path: path.join(__dirname, '.env') });

const updateAdmin = async () => {
    // 1. Get new credentials from arguments
    const newEmail = process.argv[2];
    const newPassword = process.argv[3];

    if (!newEmail || !newPassword) {
        console.log('❌ Usage: node updateAdmin.js <new_email> <new_password>');
        process.exit(1);
    }

    try {
        // 2. Connect to Database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to Database');

        // 3. Find and Update (or Create) Admin
        // We look for any user with isAdmin: true, OR the specific old admin email
        let admin = await User.findOne({ email: 'admin@b-stack.com' });

        if (!admin) {
            // Check if ANY admin exists to avoid locking out, otherwise create fresh
            admin = await User.findOne({ isAdmin: true });
        }

        if (admin) {
            // Update existing
            console.log(`Found admin account: ${admin.email}`);
            admin.email = newEmail;
            admin.password = newPassword; // Pre-save hook will hash this
            await admin.save();
            console.log(`✅ Admin credentials updated successfully!`);
            console.log(`   New Email: ${newEmail}`);
        } else {
            // Create new if doesn't exist
            admin = await User.create({
                name: 'Admin User',
                email: newEmail,
                password: newPassword,
                isAdmin: true
            });
            console.log(`✅ New Admin user created successfully!`);
        }

        process.exit();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateAdmin();
