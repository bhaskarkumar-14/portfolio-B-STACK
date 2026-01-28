import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Blog from '../Blog';

// Mock RevealOnScroll
vi.mock('../../components/RevealOnScroll', () => ({ RevealOnScroll: ({ children }) => <div>{children}</div> }));

// Mock global fetch
global.fetch = vi.fn();

describe('Blog Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders blog heading', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => [],
        });

        render(
            <BrowserRouter>
                <Blog />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Our Blog')).toBeInTheDocument();
        });
    });

    it('renders posts from Dev.to API', async () => {
        const mockDevToPosts = [
            {
                id: 123,
                title: 'Dev.to API Post',
                description: 'This is a description from Dev.to',
                cover_image: 'devto-image.jpg',
                published_at: new Date().toISOString(),
                user: { name: 'Dev Author' },
                body_html: '<p>Content</p>'
            }
        ];

        fetch.mockResolvedValueOnce({
            json: async () => mockDevToPosts,
        });

        render(
            <BrowserRouter>
                <Blog />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Dev.to API Post')).toBeInTheDocument();
            expect(screen.getByText('This is a description from Dev.to')).toBeInTheDocument();
            expect(screen.getByText('Dev Author')).toBeInTheDocument();
        });
    });

    it('handles API error gracefully', async () => {
        // Mock fetch failure
        fetch.mockRejectedValueOnce(new Error('Network error'));

        // Mock console.error to avoid cluttering test output
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <BrowserRouter>
                <Blog />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Our Blog')).toBeInTheDocument(); // Page still renders
            expect(screen.queryByText('Dev.to API Post')).not.toBeInTheDocument();
        });

        consoleSpy.mockRestore();
    });
});
