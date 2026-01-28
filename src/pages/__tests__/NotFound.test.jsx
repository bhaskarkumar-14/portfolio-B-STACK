import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '../NotFound';

// Mock Navbar and Footer to render lighter
vi.mock('../../components/Navbar', () => ({ Navbar: () => <nav>Navbar</nav> }));
vi.mock('../../components/Footer', () => ({ default: () => <footer>Footer</footer> }));

describe('NotFound Page', () => {
    it('renders 404 message', () => {
        render(<NotFound />);
        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        expect(screen.getByText(/The page you are looking for doesn't exist/i)).toBeInTheDocument();
    });

    it('renders home link', () => {
        render(<NotFound />);
        expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
    });
});
