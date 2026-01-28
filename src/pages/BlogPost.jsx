import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom'; // Added Link too
import SEO from '../components/SEO';

const BlogPost = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetch single article from Dev.to
                const response = await fetch(`https://dev.to/api/articles/${id}`);
                const data = await response.json();

                if (response.ok && data.id) {
                    setPost({
                        _id: data.id,
                        title: data.title,
                        content: data.body_html, // HTML content
                        excerpt: data.description,
                        coverImage: data.cover_image || data.social_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
                        createdAt: data.published_at,
                        author: { name: data.user.name }
                    });
                } else {
                    console.error('Post not found:', data.error);
                    setPost(null);
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-32 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    if (!post) return (
        <div className="min-h-screen pt-32 text-center text-foreground">
            <h1 className="text-2xl">Post Not Found</h1>
            <Link to="/blog" className="text-primary mt-4 inline-block">Back to Blog</Link>
        </div>
    );

    return (
        <article className="min-h-screen pt-32 pb-20">
            {post && <SEO title={post.title} description={post.excerpt} image={post.coverImage} />}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

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

                    <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div
                        className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
