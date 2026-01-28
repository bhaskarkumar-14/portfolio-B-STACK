import { Monitor, Smartphone, Search, Server, Shield, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
    {
        title: "Bespoke Web Design",
        desc: "Sites that stop the scroll. We design for impact, ensuring your brand looks exceptional on any screen.",
        icon: Monitor,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        title: "Robust Applications",
        desc: "From dashboards to SaaS platforms, we build the complex engine rooms that power your business logic.",
        icon: Layers,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    },
    {
        title: "Search Dominance",
        desc: "We don't just guess; we engineer your site to climb the ranks and get seen by the people who matter.",
        icon: Search,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        title: "Scalable Backends",
        desc: "Bulletproof APIs and database architectures that handle growth without breaking a sweat.",
        icon: Server,
        color: "text-red-400",
        bg: "bg-red-400/10"
    },
    {
        title: "Mobile First",
        desc: "Half your traffic is mobile. We ensure they get an experience just as rich as desktop users.",
        icon: Smartphone,
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    },
    {
        title: "Peace of Mind",
        desc: "Sleep easy knowing we’re handling the security updates, backups, and performance tuning.",
        icon: Shield,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10"
    }
];

const Services = () => {
    return (
        <section id="services" className="py-20 relative overflow-hidden bg-secondary">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        What We Do
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
                    >
                        Our Expertise
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light"
                    >
                        We don't just write code; we build solutions that solve real business problems.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-10 rounded-[2rem] group hover:bg-white/5 transition-all duration-500 border border-white/5"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.color} bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Services;
