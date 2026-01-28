import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Email or User ID
    balance: { type: Number, default: 0 },
    history: [
        {
            type: { type: String, enum: ['credit', 'debit'] },
            amount: Number,
            description: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

export default mongoose.model('Wallet', WalletSchema);
