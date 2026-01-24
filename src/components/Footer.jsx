import { Code, Twitter, Linkedin, Github, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark pt-20 pb-10 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                                <Code className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">DevAgency</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                            Crafting digital masterpieces for forward-thinking businesses. We build the future of the web.
                        </p>
                        <div className="flex space-x-3">
                            {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Web Design</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">App Development</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">SEO Optimization</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Consulting</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">Newsletter</h4>
                        <p className="text-gray-400 mb-4 text-sm">Subscribe to get the latest design trends and news.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white w-full text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600" />
                            <button className="bg-primary hover:bg-blue-600 text-white p-2.5 rounded-lg transition-colors">
                                <Code className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
                    <p>&copy; {new Date().getFullYear()} DevAgency. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
