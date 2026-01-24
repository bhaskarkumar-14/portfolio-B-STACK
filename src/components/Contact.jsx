import { Mail, Phone, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

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
                            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                        >
                            Let's Build Something <br /><span className="text-gray-500">Amazing</span> Together.
                        </motion.h2>

                        <p className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed font-light">
                            Have a project in mind? We'd love to hear about it. Send us a message and we'll reply as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-6 group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 font-medium mb-1">Email Us</div>
                                    <div className="text-xl font-bold text-white group-hover:text-primary transition-colors">bhaskarsingh8044@gmail.com</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6 group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400 font-medium mb-1">Call Us</div>
                                    <div className="text-xl font-bold text-white group-hover:text-primary transition-colors">+91 95089 07794</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-10 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-24 animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thanks for reaching out. We'll be in touch shortly.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-primary hover:text-white font-medium transition-colors border-b border-primary/30 hover:border-white pb-1"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            type="text"
                                            required
                                            className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all placeholder-gray-700"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all placeholder-gray-700"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                        className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all placeholder-gray-700"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="w-full bg-secondary/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all placeholder-gray-700 resize-none"
                                        placeholder="Tell us about your project..."
                                    ></textarea>
                                </div>
                                <button
                                    disabled={status === 'loading'}
                                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
