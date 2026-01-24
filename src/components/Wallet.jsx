import { Navbar } from './Navbar';
import Footer from './Footer';

const Wallet = () => {
    return (
        <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="glass-card p-8 rounded-[2rem] border border-white/5 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Client Wallet</h1>
                    <p className="text-gray-400">This feature is currently under development.</p>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
