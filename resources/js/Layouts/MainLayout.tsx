import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { ScrollToTop } from '@/Components/ScrollToTop';
import Footer from '@/Components/Footer';
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/Store/themeSlice";
interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
    isDashboard?:boolean;
}


export default function MainLayout({ children, title = 'Home', isDashboard = false }: MainLayoutProps) {

    const isDark = useSelector((state: any) => state.theme.isDark);
    const dispatch = useDispatch();

    return (
        <div className={isDark ? 'dark' : ''}>
            <Head title={title} >
            </Head>

            {/* Theme toggle */}
            <div className="fixed right-5 bottom-24 z-50">
                <button
                aria-label="Toggle theme"
                aria-pressed={isDark}
                onClick={() => dispatch(toggleTheme())}
                className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
                </button>
            </div>

            <div className="min-h-screen relative transition-colors duration-300">
                {/* Background with smooth transition */}
                <div className="fixed inset-0 transition-colors duration-300">
                    <div className={`absolute inset-0 ${
                        isDark
                            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                            : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
                    }`} />

                    {/* Optional: Add subtle texture */}
                    <div className="absolute inset-0 bg-pattern opacity-[0.02] pointer-events-none" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <Navbar />
                    <main className="transition-colors duration-300">
                        {children}
                    </main>
                    {!isDashboard && (
                        <Footer />
                    )}
                    <ScrollToTop />
                </div>
            </div>
        </div>
    );
}
