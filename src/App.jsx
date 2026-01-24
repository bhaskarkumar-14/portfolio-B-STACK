import { useState, useEffect, useContext } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';

import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';

import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLeads from './components/admin/AdminLeads';
import AdminOrders from './components/admin/AdminOrders';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import { RevealOnScroll } from './components/RevealOnScroll';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  // Simple spinner while checking auth status
  if (loading) return <div className="min-h-screen pt-32 text-center text-white">Loading...</div>;

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  if (adminOnly && user.role !== 'admin') {
    window.location.href = '/wallet'; // Redirect non-admins
    return null;
  }
  return children;
};

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);



  // Admin Routes (Protected)
  if (currentPath === '/admin') return <ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>;
  if (currentPath === '/admin/leads') return <ProtectedRoute adminOnly={true}><AdminLeads /></ProtectedRoute>;
  if (currentPath === '/admin/orders') return <ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>;

  // Blog Routes
  if (currentPath === '/blog') {
    return (
      <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
        <Navbar />
        <main><Blog /></main>
        <Footer />
      </div>
    );
  }

  // Simple check for /blog/ID
  if (currentPath.startsWith('/blog/') && currentPath.length > 6) {
    return (
      <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
        <Navbar />
        <main><BlogPost /></main>
        <Footer />
      </div>
    );
  }



  // Default Home Route
  return (
    <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <RevealOnScroll><Services /></RevealOnScroll>
      <RevealOnScroll><Portfolio /></RevealOnScroll>
      <RevealOnScroll><Testimonials /></RevealOnScroll>
      <RevealOnScroll><Contact /></RevealOnScroll>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
