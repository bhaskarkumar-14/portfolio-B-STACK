import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Contact from '../Contact';

// Mock API_URL
vi.mock('../../config', () => ({
    API_URL: 'http://localhost:5000'
}));

describe('Contact Component', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the contact section titles and text', () => {
        render(<Contact />);
        expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
        expect(screen.getByText(/Let's Build Something/i)).toBeInTheDocument();
    });

    it('renders input fields', () => {
        render(<Contact />);
        expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Tell us about your project/i)).toBeInTheDocument();
    });

    it('handles form submission successfully', async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({ success: true, message: 'Message sent successfully!' }),
        });

        render(<Contact />);

        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/@gmail.com/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Tell us about your project/i), { target: { value: 'New project' } });

        fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

        await waitFor(() => {
            expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        });

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/contact', expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                message: 'New project'
            })
        }));
    });

    it('handles API error', async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({ success: false, message: 'Server error' }),
        });

        render(<Contact />);

        fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByPlaceholderText(/@gmail.com/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Tell us about your project/i), { target: { value: 'Error test' } });

        fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

        await waitFor(() => {
            expect(screen.getByText('Server error')).toBeInTheDocument();
        });
    });
});
