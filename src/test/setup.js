import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion
globalThis.IntersectionObserver = class IntersectionObserver {
    constructor(cb, options) {
        this.cb = cb;
        this.options = options;
    }

    observe() { }
    unobserve() { }
    disconnect() { }
};
