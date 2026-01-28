import { render, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../SEO';

describe('SEO Component', () => {
    it('updates document title', async () => {
        const title = "Test Title";
        render(
            <HelmetProvider>
                <SEO title={title} />
            </HelmetProvider>
        );

        await waitFor(() => {
            expect(document.title).toBe(title);
        });
    });

    // Note: Checking meta tags in jsdom can be slightly more involved as they are in the head.
    // We can rely on title check as proof of Helmet working.
});
