import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Testimonials from '../Testimonials';

describe('Testimonials Component', () => {
    it('renders the section title', () => {
        render(<Testimonials />);
        expect(screen.getByText(/Client Stories/i)).toBeInTheDocument();
        expect(screen.getByText(/Trusted by/i)).toBeInTheDocument();
    });

    it('renders testimonials content', () => {
        render(<Testimonials />);
        expect(screen.getByText(/Sarah Johnson/i)).toBeInTheDocument();
        expect(screen.getByText(/Michael Chen/i)).toBeInTheDocument();
        expect(screen.getByText(/Emma Davis/i)).toBeInTheDocument();

        expect(screen.getByText(/CTO, TechFlow/i)).toBeInTheDocument();
    });

    it('renders rating stars', () => {
        render(<Testimonials />);
        // Checking if stars are rendered - we can check for svg or just ensure no crash.
        // Or check loop count if we add test-ids, but text content is usually enough for "it works" verification here.
        // We can check if images are present
        const images = screen.getAllByRole('img');
        expect(images.length).toBeGreaterThanOrEqual(3);
    });
});
