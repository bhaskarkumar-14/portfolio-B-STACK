// Configuration for API URL
// In development, Vite proxy handles '/api' -> 'http://localhost:5000'
// In production (Vercel), we need to point directly to the backend URL

const isDevelopment = import.meta.env.MODE === 'development';

export const API_URL = isDevelopment
    ? ''  // Rely on Vite Proxy in dev
    : import.meta.env.VITE_API_URL || "https://your-backend-url.onrender.com"; // Fallback placeholder
