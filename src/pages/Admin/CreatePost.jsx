import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import { API_URL } from '../../config';

const CreatePost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        coverImage: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                navigate('/admin/dashboard');
            } else {
                alert(data.message || 'Failed to create post');
            }
        } catch (error) {
            console.error("Create Post Error", error);
            alert("Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary pb-20">
            {/* Header */}
            <header className="border-b border-white/10 bg-secondary/95 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h1 className="text-lg font-bold text-foreground">Create New Post</h1>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter a captivating title..."
                            className="w-full bg-transparent border-b border-white/10 py-4 text-3xl md:text-5xl font-bold text-foreground placeholder:text-gray-700 focus:outline-none focus:border-primary transition-colors"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Cover Image URL
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="url"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                placeholder="https://source.unsplash.com/..."
                                className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-mono text-sm"
                            />
                        </div>
                        {formData.coverImage && (
                            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-white/10 mt-4">
                                <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows="2"
                            placeholder="A short summary of the post..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                            required
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="15"
                            placeholder="Write your masterpiece here..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors font-serif text-lg leading-relaxed"
                            required
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-8 border-t border-white/10">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    <Save className="w-5 h-5" /> Publish Post
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default CreatePost;
