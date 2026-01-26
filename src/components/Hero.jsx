import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Soft Aurora Effects - Refined */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-30 animate-float" />
                <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-30 animate-float" style={{ animationDelay: '3s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-10 group hover:border-primary/20 transition-all cursor-default"
                >
                    <Sparkles className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">Top Rated Web Development Agency</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-display text-4xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-tight mb-8 text-white"
                >
                    We Build <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Digital Excellence
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light"
                >
                    Transform your vision into a world-class digital experience. We craft high-performance websites and applications that drive real business growth.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <a
                        href="#contact"
                        className="w-full sm:w-auto min-w-[200px] px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-3 group"
                    >
                        Start Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                        href="#portfolio"
                        className="w-full sm:w-auto min-w-[200px] px-8 py-4 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white rounded-full font-semibold text-lg transition-all hover:-translate-y-1"
                    >
                        View Our Work
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
