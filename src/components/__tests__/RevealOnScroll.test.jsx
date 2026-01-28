import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RevealOnScroll } from '../RevealOnScroll';

describe('RevealOnScroll Component', () => {
    it('renders children', () => {
        render(
            <RevealOnScroll>
                <div data-testid="test-child">Hello World</div>
            </RevealOnScroll>
        );
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
