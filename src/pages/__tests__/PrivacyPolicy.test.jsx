import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PrivacyPolicy from '../PrivacyPolicy';

describe('PrivacyPolicy Page', () => {
    it('renders the title and content', () => {
        render(<PrivacyPolicy />);
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
        expect(screen.getByText('Introduction')).toBeInTheDocument();
        expect(screen.getByText('Information We Collect')).toBeInTheDocument();
    });

    it('renders contact email', () => {
        render(<PrivacyPolicy />);
        expect(screen.getByText('support@devagency.com')).toBeInTheDocument();
    });
});
