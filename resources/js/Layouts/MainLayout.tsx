import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { ScrollToTop } from '@/Components/ScrollToTop';
import Footer from '@/Components/Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
    isDark:boolean;
}


export default function MainLayout({ children, title = 'Home', isDark }: MainLayoutProps) {

    return (
        <div className={isDark ? 'dark' : ''}>
            <Head title={title} >
            </Head>

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
                    <Navbar isDark={isDark} />
                    <main className="transition-colors duration-300">
                        {children}
                    </main>
                    <Footer />
                    <ScrollToTop />
                </div>
            </div>
        </div>
    );
}
