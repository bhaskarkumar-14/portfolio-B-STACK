import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Hero Component', () => {
    it('renders the main headline', () => {
        render(<Hero />);
        expect(screen.getByText(/We Build/i)).toBeInTheDocument();
        expect(screen.getByText(/Digital Excellence/i)).toBeInTheDocument();
    });

    it('renders descriptive text', () => {
        render(<Hero />);
        expect(screen.getByText(/Transform your vision/i)).toBeInTheDocument();
    });

    it('renders CTA buttons', () => {
        render(<Hero />);
        expect(screen.getByRole('link', { name: /Start Project/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /View Our Work/i })).toBeInTheDocument();
    });

    it('renders top rated badge', () => {
        render(<Hero />);
        expect(screen.getByText(/Top Rated Web Development Agency/i)).toBeInTheDocument();
    });
});
