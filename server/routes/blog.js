import express from 'express';
import Post from '../models/Post.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import mongoose from 'mongoose';

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    // Offline / Mock Data
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: true,
            posts: [
                {
                    _id: '1',
                    title: 'The Future of Web Development in 2026',
                    excerpt: 'Discover the latest trends dominating the industry, from AI-driven UI to WebAssembly.',
                    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1352&q=80',
                    createdAt: Date.now()
                },
                {
                    _id: '2',
                    title: 'Why Your Business Needs a Custom CRM',
                    excerpt: 'Stop relying on spreadsheets. Here is how a custom solution saves you hours every week.',
                    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1151&q=80',
                    createdAt: Date.now()
                },
                {
                    _id: '3',
                    title: 'Optimizing React for Performance',
                    excerpt: 'Deep dive into code splitting, lazy loading, and memoization techniques.',
                    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1350&q=80',
                    createdAt: Date.now()
                }
            ]
        });
    }

    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/blog/:id
// @desc    Get single post
// @access  Public
router.get('/:id', async (req, res) => {
    // Offline Mock
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: true,
            post: {
                _id: req.params.id,
                title: 'Mock Article Title',
                content: 'This is the full content of the article. It would be much longer in a real scenario, likely containing markdown or HTML.',
                coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1352&q=80',
                createdAt: Date.now(),
                author: { name: 'Admin' }
            }
        });
    }

    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
        if (post) {
            res.json({ success: true, post });
        } else {
            res.status(404).json({ success: false, message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   POST /api/blog
// @desc    Create a post
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, content, excerpt, coverImage } = req.body;

        if (mongoose.connection.readyState !== 1) {
            return res.json({
                success: true,
                post: { _id: 'mock_new_post', title, content, excerpt, coverImage },
                message: "Mock Post Created"
            });
        }

        const post = new Post({
            title,
            content,
            excerpt,
            coverImage,
            author: req.user._id
        });

        const createdPost = await post.save();
        res.status(201).json({ success: true, post: createdPost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
