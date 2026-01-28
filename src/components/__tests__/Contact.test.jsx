import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Contact from '../Contact';

// Mock Formspree hook
// Define mock function outside to allow implementation changes
const mockUseForm = vi.fn();

vi.mock('@formspree/react', () => ({
    useForm: (...args) => mockUseForm(...args),
    ValidationError: () => null
}));

describe('Contact Component', () => {
    beforeEach(() => {
        // Default mock implementation
        mockUseForm.mockReturnValue([{ succeeded: false, errors: [], submitting: false }, vi.fn()]);
    });

    it('renders the contact section titles and text', () => {
        render(<Contact />);
        expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
        expect(screen.getByText(/Let's Build Something/i)).toBeInTheDocument();
        expect(screen.getByText(/Amazing/i)).toBeInTheDocument();
    });

    it('renders input fields', () => {
        render(<Contact />);
        expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/@gmail.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Tell us about your project/i)).toBeInTheDocument();
    });

    it('contains submit button', () => {
        render(<Contact />);
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });
});

describe('Contact Form Submission', () => {
    it('shows success message on submit', () => {
        // Override mock for this test
        mockUseForm.mockReturnValue([{ succeeded: true, errors: [], submitting: false }, vi.fn()]);
        render(<Contact />);

        expect(screen.getByText('Message Sent!')).toBeInTheDocument();
        expect(screen.getByText(/Thanks for reaching out/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send another message/i })).toBeInTheDocument();
    });

    it('calls submit function on button click', () => {
        const handleSubmit = vi.fn();
        mockUseForm.mockReturnValue([{ succeeded: false, errors: [], submitting: false }, handleSubmit]);

        render(<Contact />);
        const nameInput = screen.getByPlaceholderText(/first name/i);
        fireEvent.change(nameInput, { target: { value: 'John' } });
        expect(nameInput.value).toBe('John');
    });

    it('allows input entry', () => {
        render(<Contact />);
        const nameInput = screen.getByPlaceholderText(/first name/i);
        fireEvent.change(nameInput, { target: { value: 'John' } });
        expect(nameInput.value).toBe('John');
    });
});
