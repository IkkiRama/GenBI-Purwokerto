import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const appName = import.meta.env.VITE_APP_NAME || 'GenBI Purwokerto';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Initial theme setup with type safety
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme ?? (systemDark ? 'dark' : 'light');

        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
        document.documentElement.style.setProperty('color-scheme', initialTheme);

        root.render(
            <BrowserRouter>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
