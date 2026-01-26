import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock Data for frontend demo - Removed dependency on localhost:5000
        const mockPosts = [
            {
                _id: '1',
                title: 'The Future of Web Design: Trends to Watch in 2026',
                excerpt: 'Explore the latest trends in immersive 3D graphics, AI-driven layouts, and hyper-personalized user experiences shaping the web.',
                coverImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2664&auto=format&fit=crop',
                createdAt: new Date().toISOString(),
                author: { name: 'Bhaskar' }
            },
            {
                _id: '2',
                title: 'Maximizing SEO: Beyond Keywords',
                excerpt: 'Learn why technical SEO, user intent, and core web vitals are more important than keyword stuffing in the modern search landscape.',
                coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop',
                createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                author: { name: 'Team B-STACK' }
            },
            {
                _id: '3',
                title: 'Why Speed Matters: Optimizing React Applications',
                excerpt: 'A deep dive into code splitting, lazy loading, and memoization techniques to ensure your React apps load lightning fast.',
                coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2669&auto=format&fit=crop',
                createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
                author: { name: 'Bhaskar' }
            }
        ];

        setPosts(mockPosts);
        setLoading(false);
    }, []);

    return (
        <section id="blog" className="min-h-screen pt-20 pb-20 relative bg-dark">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                        Latest Insights
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                        Our Blog
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                        Thoughts on technology, design, and digital transformation.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <RevealOnScroll key={post._id} delay={index * 0.1}>
                                    <article className="glass-card rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 group h-full flex flex-col hover:-translate-y-2 shadow-lg">
                                        <div className="relative h-60 overflow-hidden">
                                            <img
                                                src={post.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"} // Fallback image
                                                alt={post.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-xs font-medium text-primary/80 mb-4 uppercase tracking-wider">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                                {post.author && (
                                                    <span className="flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5" />
                                                        {post.author.name || 'Admin'}
                                                    </span>
                                                )}
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-white/5">
                                                <a
                                                    href={`/blog/${post._id}`}
                                                    className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-primary transition-colors group/link"
                                                >
                                                    Read Article <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                </RevealOnScroll>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                <p>No posts found. (Ensure backend is running)</p>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
