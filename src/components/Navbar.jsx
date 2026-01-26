import { useState, useEffect } from 'react';
import { Menu, X, Code, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle Scroll for Glass Effect - Optimized
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                if (!scrolled) setScrolled(true);
            } else {
                if (scrolled) setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Handle Active Section Tracking
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% is visible
                rootMargin: "-100px 0px -100px 0px" // Shrink the viewport box to ensure center focus
            }

        );

        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const navLinks = [
        { name: 'Home', href: '/#home', id: 'home' },
        { name: 'Services', href: '/#services', id: 'services' },
        { name: 'Work', href: '/#portfolio', id: 'portfolio' },
        { name: 'Blog', href: '/blog', id: 'blog' },
        { name: 'Contact', href: '/#contact', id: 'contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'top-4' : 'top-0'
                }`}
        >
            <div className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 ease-in-out ${scrolled
                ? 'glass rounded-full py-3 shadow-2xl bg-black/50 backdrop-blur-xl border border-white/10 ring-1 ring-white/5'
                : 'bg-transparent py-6'
                }`}>
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" onClick={(e) => {
                        e.preventDefault();
                        if (window.location.pathname === '/' || window.location.pathname === '') {
                            window.lenis?.scrollTo('#home', { duration: 1.5 });
                        } else {
                            window.location.href = '/#home';
                        }
                    }} className="flex items-center gap-2 pl-2 group">
                        <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl">
                            <img src="/logo.jpg" alt="B-STACK Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <span className="font-display text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300">B-STACK</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/5">
                        {navLinks.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.href.startsWith('/#')) {
                                            e.preventDefault();
                                            const targetId = item.href.replace('/', '');
                                            // Check if we are on the homepage or need to navigate first
                                            if (window.location.pathname === '/' || window.location.pathname === '') {
                                                window.lenis?.scrollTo(targetId, { duration: 1.5 });
                                            } else {
                                                // If on another page, let the default behavior happen (it will navigate to /#section)
                                                // But we want to SPA navigate if possible, or force href
                                                window.location.href = item.href;
                                            }
                                        } else if (item.href.startsWith('/') && !item.href.includes('#')) {
                                            // Simple reliable navigation for pages like /blog, /privacy
                                            window.location.href = item.href;
                                        }
                                    }}
                                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full -z-10 shadow-lg shadow-primary/30"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {item.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right Side: CTA Button (Desktop) */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                window.lenis?.scrollTo('#contact', { duration: 1.5 });
                            }}
                            className="bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            Start Project <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>



                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden pr-1">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none p-2"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden absolute top-24 left-4 right-4 glass rounded-[2rem] p-6 border border-white/10 shadow-2xl bg-dark/95"
                    >
                        <div className="flex flex-col space-y-2">
                            {/* Mobile Links */}
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${activeSection === item.id
                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                            {/* Mobile CTA */}
                            <a
                                href="/#contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center px-4 py-3 rounded-xl text-base font-bold bg-primary text-white hover:bg-blue-600 transition-all mt-4"
                            >
                                Start Project
                            </a>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
