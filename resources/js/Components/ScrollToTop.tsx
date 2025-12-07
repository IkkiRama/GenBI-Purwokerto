import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '@/Hooks/useTheme';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { isDark } = useTheme();

    const toggleVisibility = () => {
        setIsVisible(window.pageYOffset > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    onClick={scrollToTop}
                    className={`
                        fixed bottom-[25px] lg:bottom-[25px] right-4 md:bottom-8 md:right-8 z-50
                        p-3 rounded-full shadow-lg cursor-pointer
                        transition-all duration-300 ease-in-out group
                        ${isDark
                            ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }
                        hover:shadow-xl
                    `}
                    aria-label="Scroll to top"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronUp
                        className={`h-6 w-6 transition-transform duration-300
                            group-hover:-translate-y-1
                            ${isDark ? 'text-blue-400' : 'text-white'}`}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
