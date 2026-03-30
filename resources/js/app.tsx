import './bootstrap';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ThemeProvider } from './Contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/Store/themeSlice";
import { useSelector } from "react-redux";
import { fetchUser } from "@/Store/authSlice";

function AppWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    dispatch(fetchUser());

    if (stored) {
      dispatch(setTheme(stored === "dark"));
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dispatch(setTheme(prefersDark));
    }
  }, []);

  return children;
}

export function ThemeSync() {
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return null;
}


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
                    <Provider store={store}>
                        <AppWrapper>
                            <ThemeSync />
                            <App {...props} />
                        </AppWrapper>
                    </Provider>
                </ThemeProvider>
            </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
