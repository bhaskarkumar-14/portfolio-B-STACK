import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: 'https://images.unsplash.com/photo-1499750310159-5254f181555f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // For offline mode or simple setup
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Post', PostSchema);
