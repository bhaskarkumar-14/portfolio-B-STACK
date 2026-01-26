import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom'; // Note: In App.jsx we are not using react-router-dom fully correctly for params without complex setup. 
// However, since we are doing manual routing, we need a wrapper to extract ID from URL.

const BlogPost = () => {
    // Manual ID extraction since we aren't using <Route path="/blog/:id" /> properly in our simple AppContent
    // We will assume window.location.pathname is like /blog/123
    const id = window.location.pathname.split('/').pop();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock Data Lookup - Removed dependency on localhost:5000
        const mockPosts = [
            {
                _id: '1',
                title: 'The Future of Web Design: Trends to Watch in 2026',
                excerpt: 'Explore the latest trends in immersive 3D graphics, AI-driven layouts, and hyper-personalized user experiences shaping the web.',
                content: `Web design is constantly evolving, and 2026 is shaping up to be a revolutionary year. We are seeing a shift towards more immersive experiences...
                
                1. 3D Elements: More websites are integrating lightweight 3D objects using Spline and Three.js.
                2. AI-Driven Layouts: Interfaces that adapt to user behavior in real-time.
                3. Dark Mode Default: Dark aesthetics are becoming the standard for premium brands.`,
                coverImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2664&auto=format&fit=crop',
                createdAt: new Date().toISOString(),
                author: { name: 'Bhaskar' }
            },
            {
                _id: '2',
                title: 'Maximizing SEO: Beyond Keywords',
                excerpt: 'Learn why technical SEO, user intent, and core web vitals are more important than keyword stuffing in the modern search landscape.',
                content: `SEO is no longer just about keywords. Search engines are now smarter than ever...`,
                coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop',
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                author: { name: 'Team B-STACK' }
            },
            {
                _id: '3',
                title: 'Why Speed Matters: Optimizing React Applications',
                excerpt: 'A deep dive into code splitting, lazy loading, and memoization techniques to ensure your React apps load lightning fast.',
                content: `Performance is key. A slow website leads to high bounce rates...`,
                coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop',
                createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                author: { name: 'Bhaskar' }
            }
        ];

        const foundPost = mockPosts.find(p => p._id === id);

        if (foundPost) {
            setPost(foundPost);
        }
        setLoading(false);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-32 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    if (!post) return (
        <div className="min-h-screen pt-32 text-center text-white">
            <h1 className="text-2xl">Post Not Found</h1>
            <a href="/blog" className="text-primary mt-4 inline-block">Back to Blog</a>
        </div>
    );

    return (
        <article className="min-h-screen pt-32 pb-20">
            {post && <SEO title={post.title} description={post.excerpt} image={post.coverImage} />}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </a>

                <div className="glass-card rounded-3xl overflow-hidden border border-white/5 p-8 md:p-12">
                    <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        {post.author && (
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {post.author.name || 'Admin'}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        {/* 
                           In a real app, this would be a Markdown renderer. 
                           For now, we just display the text content.
                        */}
                        <p className="whitespace-pre-wrap leading-relaxed">
                            {post.content}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
