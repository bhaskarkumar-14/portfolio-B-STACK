import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import SEO from './components/SEO';
import Footer from './components/Footer';

import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);


  // Blog Routes
  if (currentPath === '/blog') {
    return (
      <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
        <SEO title="Our Blog | B-STACK" description="Read our latest insights on web development and design." />
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



  // Privacy Policy Route
  if (currentPath === '/privacy') {
    return (
      <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
        <SEO title="Privacy Policy | B-STACK" description="Our commitment to protecting your privacy." />
        <Navbar />
        <main><PrivacyPolicy /></main>
        <Footer />
      </div>
    );
  }


  // Default Home Route
  return (
    <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
      <SEO />
      <Navbar />
      <Home />
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
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    window.lenis = lenis; // Expose for Navbar scrolling

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
    <div className="app-container">
      <AppContent />
    </div>
  );
}

export default App;
