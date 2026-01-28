import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    {
        id: 1,
        title: "Digital Campus Core",
        category: "EdTech",
        desc: "A complete digital nervous system for modern universities, handling everything from biometrics to grading.",
        tags: ["React", "Node.js", "MongoDB", "Auth"],
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
        size: "large",
        link: "https://pce-purnea.vercel.app/"
    },
    {
        id: 2,
        title: "Neon Commerce",
        category: "E-Commerce",
        desc: "Data visualization that actually makes sense. Tracking millions in revenue with zero lag.",
        tags: ["Next.js", "Stripe"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 3,
        title: "Luxury Estate",
        category: "Real Estate",
        desc: "Immersive 3D property showcases that make you feel like you're already home.",
        tags: ["React", "Three.js"],
        image: "https://images.unsplash.com/photo-1600596542815-e25fa1108638?q=80&w=1000&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 4,
        title: "Vault Fintech",
        category: "Finance",
        desc: "Bank-grade security meets consumer-grade UX. Fast, fluid, and bulletproof.",
        tags: ["TypeScript", "D3.js"],
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
        size: "medium"
    }
];

const ProjectCard = ({ project }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => project.link && window.open(project.link, '_blank')}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`group relative rounded-[2rem] overflow-hidden bg-secondary border border-white/5 cursor-pointer shadow-2xl shadow-black/50 ${project.size === 'large' ? 'md:col-span-2 md:row-span-2 aspect-[16/10]' : 'aspect-square'
                }`}
        >
            {/* Image */}
            <div
                style={{ transform: "translateZ(0px)" }}
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110 will-change-transform"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            {/* Content Content - Floats in 3D */}
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none"
            >
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex justify-between items-center mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                            {project.category}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-lg mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-500">
                        {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-500">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] md:text-xs font-medium text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Portfolio = () => {
    return (
        <section id="portfolio" className="py-20 relative bg-secondary">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                        >
                            Selected Work
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground"
                        >
                            Featured <br /> <span className="text-gray-600">Projects.</span>
                        </motion.h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(350px,auto)]">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <a href="#" className="inline-flex items-center gap-2 text-gray-400 border-b border-gray-700 pb-1 hover:text-white hover:border-white transition-all group text-lg">
                        View Complete Case Studies <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
