import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Services from '../Services';

describe('Services Component', () => {
    it('renders the section title', () => {
        render(<Services />);
        expect(screen.getByText(/What We Do/i)).toBeInTheDocument();
        expect(screen.getByText(/Our Expertise/i)).toBeInTheDocument();
    });

    it('renders all service cards', () => {
        render(<Services />);
        expect(screen.getByText('Bespoke Web Design')).toBeInTheDocument();
        expect(screen.getByText('Robust Applications')).toBeInTheDocument();
        expect(screen.getByText('Search Dominance')).toBeInTheDocument();
        expect(screen.getByText('Scalable Backends')).toBeInTheDocument();
        expect(screen.getByText('Mobile First')).toBeInTheDocument();
        expect(screen.getByText('Peace of Mind')).toBeInTheDocument();
    });

    it('renders service descriptions', () => {
        render(<Services />);
        expect(screen.getByText(/Sites that stop the scroll/i)).toBeInTheDocument();
    });
});
