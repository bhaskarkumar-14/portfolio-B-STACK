import { Home, FileQuestion } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white flex flex-col">
            <Navbar />

            <main className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
                {/* Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="glass-card p-12 md:p-16 rounded-[2.5rem] border border-white/10 text-center relative z-10 max-w-2xl mx-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                        <FileQuestion className="w-12 h-12" />
                    </div>

                    <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>

                    <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        The page you are looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>

                    <a
                        href="/"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                    >
                        <Home className="w-5 h-5" /> Back to Home
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
