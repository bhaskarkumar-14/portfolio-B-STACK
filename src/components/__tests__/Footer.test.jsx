import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../Footer';

describe('Footer Component', () => {
    it('renders the branding and description', () => {
        render(<Footer />);
        expect(screen.getByText('B-STACK')).toBeInTheDocument();
        expect(screen.getByText(/Merging art with code/i)).toBeInTheDocument();
    });

    it('renders services and company links', () => {
        render(<Footer />);
        expect(screen.getByText('Web Design')).toBeInTheDocument();
        expect(screen.getByText('App Development')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('renders newsletter form', () => {
        render(<Footer />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
        render(<Footer />);
        const year = new Date().getFullYear();
        expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
    });
});

describe('Footer Functionality', () => {
    it('allows typing in newsletter email', () => {
        render(<Footer />);
        const input = screen.getByPlaceholderText('Email');
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(input.value).toBe('test@example.com');
    });

    it('renders social links with correct attributes', () => {
        render(<Footer />);
        // Find a social link - we know there are 4
        // Check filtering by href presence essentially
        const links = screen.getAllByRole('link');
        const socialLink = links.find(l => l.getAttribute('href')?.includes('twitter') || l.getAttribute('href')?.includes('x.com'));
        expect(socialLink).toBeDefined();
        expect(socialLink).toHaveAttribute('target', '_blank');
        expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});

describe('Footer Scroll Interactions', () => {
    let scrollToMock;

    beforeEach(() => {
        scrollToMock = vi.fn();
        window.lenis = { scrollTo: scrollToMock };
    });

    afterEach(() => {
        delete window.lenis;
        vi.clearAllMocks();
    });

    const linksToTest = [
        { text: 'Web Design', hash: '#services' },
        { text: 'App Development', hash: '#services' },
        { text: 'SEO Optimization', hash: '#services' },
        { text: 'Consulting', hash: '#contact' },
        { text: 'About Us', hash: '#home' },
        { text: 'Careers', hash: '#contact' },
    ];

    linksToTest.forEach(({ text, hash }) => {
        it(`scrolls to ${hash} when clicking ${text}`, () => {
            render(<Footer />);
            const link = screen.getByText(text);
            fireEvent.click(link);
            expect(scrollToMock).toHaveBeenCalledWith(hash, expect.anything());
        });
    });
});
