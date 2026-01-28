import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CTO, TechFlow",
        content: "Honestly, I was skeptical at first, but B-STACK didn't just 'update' our site—they completely reimagined how we talk to our customers. Our metrics are through the roof.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder, StartupX",
        content: "They have this rare mix of artistic flair and engineering grit. It’s not just a pretty face; the backend is rock solid. Best investment we made this year.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        rating: 5
    },
    {
        id: 3,
        name: "Emma Davis",
        role: "Marketing Director, GlobalCo",
        content: "Reliable, communicative, and extremely talented. We threw some really weird requirements at them, and they didn't blink. The final product speaks for itself.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 relative bg-dark overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Client Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                    >
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Industry Leaders</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 rounded-[2rem] border border-white/5 relative group hover:bg-white/5 transition-colors"
                        >
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-black/5 dark:text-white/5 group-hover:text-primary/10 transition-colors" />

                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-gray-500 dark:text-gray-300 mb-8 leading-relaxed relative z-10">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                                />
                                <div>
                                    <h4 className="text-foreground font-bold text-sm tracking-wide">{testimonial.name}</h4>
                                    <p className="text-primary text-xs font-medium uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
