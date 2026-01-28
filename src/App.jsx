import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import ReactGA from 'react-ga4';

import PageTransition from './components/PageTransition';

import { Navbar } from './components/Navbar';
import SEO from './components/SEO';
import Footer from './components/Footer';

// ... (other imports stay same, but trying to minimize context needed)

import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import CreatePost from './pages/Admin/CreatePost';
import ProtectedRoute from './components/ProtectedRoute';

// Initialize GA4
ReactGA.initialize("G-LDGMDFTDK4");

function Layout({ children, seo }) {
  return (
    <div className="min-h-screen bg-secondary selection:bg-primary selection:text-white">
      {seo && <SEO {...seo} />}
      <Navbar />
      <main>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation();

  // Initialize Smooth Scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll to top & Track Analytics on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location.pathname, location.search]);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/index.html" element={<Layout><Home /></Layout>} />

          <Route path="/blog" element={
            <Layout seo={{ title: "Our Blog | B-STACK", description: "Read our latest insights on web development and design." }}>
              <Blog />
            </Layout>
          } />

          <Route path="/blog/:id" element={
            <Layout>
              <BlogPost />
            </Layout>
          } />

          <Route path="/privacy" element={
            <Layout seo={{ title: "Privacy Policy | B-STACK", description: "Our commitment to protecting your privacy." }}>
              <PrivacyPolicy />
            </Layout>
          } />

          {/* Admin Routes (No Layout/Different Layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-post" element={<CreatePost />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
