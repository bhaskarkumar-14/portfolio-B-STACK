import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../Home';

// Mock child components to simplify integration test
vi.mock('../../components/Hero', () => ({ default: () => <div data-testid="hero">Hero</div> }));
vi.mock('../../components/Services', () => ({ default: () => <div data-testid="services">Services</div> }));
vi.mock('../../components/Portfolio', () => ({ default: () => <div data-testid="portfolio">Portfolio</div> }));
vi.mock('../../components/Testimonials', () => ({ default: () => <div data-testid="testimonials">Testimonials</div> }));
vi.mock('../../components/Contact', () => ({ default: () => <div data-testid="contact">Contact</div> }));
vi.mock('../../components/RevealOnScroll', () => ({ RevealOnScroll: ({ children }) => <div>{children}</div> }));

describe('Home Page', () => {
    it('renders all sections', () => {
        render(<Home />);
        expect(screen.getByTestId('hero')).toBeInTheDocument();
        expect(screen.getByTestId('services')).toBeInTheDocument();
        expect(screen.getByTestId('portfolio')).toBeInTheDocument();
        expect(screen.getByTestId('testimonials')).toBeInTheDocument();
        expect(screen.getByTestId('contact')).toBeInTheDocument();
    });
});
