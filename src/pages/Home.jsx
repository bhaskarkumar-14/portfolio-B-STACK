import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import { RevealOnScroll } from '../components/RevealOnScroll';

const Home = () => {
    return (
        <>
            <Hero />
            <RevealOnScroll><Services /></RevealOnScroll>
            <RevealOnScroll><Portfolio /></RevealOnScroll>
            <RevealOnScroll><Testimonials /></RevealOnScroll>
            <RevealOnScroll><Contact /></RevealOnScroll>
        </>
    );
};

export default Home;
