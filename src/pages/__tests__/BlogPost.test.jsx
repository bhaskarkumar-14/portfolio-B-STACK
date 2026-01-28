import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BlogPost from '../BlogPost';

// Mock SEO
vi.mock('../../components/SEO', () => ({ default: () => null }));

// Mock global fetch
global.fetch = vi.fn();

describe('BlogPost Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders post content from Dev.to API', async () => {
        const mockDevToPost = {
            id: 999,
            title: 'My Dev.to Post',
            description: 'Post Description',
            body_html: '<div data-testid="content">Allowed HTML Content</div>',
            cover_image: 'test.jpg',
            published_at: new Date().toISOString(),
            user: { name: 'Dev User' }
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockDevToPost,
        });

        render(
            <MemoryRouter initialEntries={['/blog/999']}>
                <Routes>
                    <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
            </MemoryRouter>
        );

        // Check for loading state first (optional, but good practice)
        // Then wait for success
        expect(await screen.findByText('My Dev.to Post', {}, { timeout: 3000 })).toBeInTheDocument();
        expect(screen.getByTestId('content')).toHaveTextContent('Allowed HTML Content');
        expect(screen.getByText('Dev User')).toBeInTheDocument();
    });

    it('renders not found when API returns error', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Not Found' }),
        });

        render(
            <MemoryRouter initialEntries={['/blog/invalid-id']}>
                <Routes>
                    <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Post Not Found')).toBeInTheDocument();
        });
    });
});
