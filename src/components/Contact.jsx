import { Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                setError(data.message || 'Failed to send message.');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <section id="contact" className="py-20 relative overflow-hidden bg-secondary">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                    <div className="glass-card p-10 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center py-24 animate-in fade-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground mb-2">Message Sent!</h3>
                        <p className="text-gray-500 dark:text-gray-400">Thanks for reaching out. We have received your message.</p>
                        <button
                            onClick={() => setSuccess(false)}
                            className="mt-8 text-primary hover:text-white font-medium transition-colors border-b border-primary/30 hover:border-white pb-1"
                        >
                            Send another message
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 relative overflow-hidden bg-secondary">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                        >
                            Get In Touch
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight"
                        >
                            Let's Build Something <br /><span className="text-gray-500">Amazing</span> Together.
                        </motion.h2>

                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 max-w-lg leading-relaxed font-light">
                            Have a project in mind? We'd love to hear about it. Send us a message and we'll reply as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-6 group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Email Us</div>
                                    <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">bhaskarsingh8044@gmail.com</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Call Us</div>
                                    <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">+91 95089 07794</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-10 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-gray-100 dark:bg-secondary/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-secondary/80 transition-all placeholder-gray-500 dark:placeholder-gray-700"
                                        placeholder="first name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-gray-100 dark:bg-secondary/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-secondary/80 transition-all placeholder-gray-500 dark:placeholder-gray-700"
                                        placeholder="last name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 dark:bg-secondary/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-secondary/80 transition-all placeholder-gray-500 dark:placeholder-gray-700"
                                    placeholder="@gmail.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 dark:bg-secondary/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-secondary/80 transition-all placeholder-gray-500 dark:placeholder-gray-700 resize-none"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>

                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Contact;
