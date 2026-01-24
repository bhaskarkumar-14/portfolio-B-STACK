import { useState, useEffect } from 'react';
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
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/blog/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPost(data.post);
                }
            } catch (err) {
                console.error("Failed to fetch blog post", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPost();
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
