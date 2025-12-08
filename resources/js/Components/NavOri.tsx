import { useState, useEffect, useCallback, memo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaHome, FaInfoCircle, FaBuilding, FaTimes, FaBars,
    FaUser, FaEnvelope, FaUserCircle, FaSignOutAlt,
    FaTachometerAlt, FaFolder,
    FaStar, FaPodcast,
    FaNetworkWired,
    FaHistory
} from 'react-icons/fa';
import { useAuth } from '@/Hooks/useAuth';
import { useTheme } from '@/Hooks/useTheme';
import { BookOpen } from 'lucide-react';
import { IconGallery } from '@irsyadadl/paranoid';

const NAV_ITEMS = [
    { path: '/', label: 'Beranda', icon: FaHome },
    { path: '/event', label: 'Event', icon: FaNetworkWired },
    {
        id: 'about',
        label: 'Tentang Kami',
        icon: FaInfoCircle,
        dropdown: [
            { path: '/genbi-point', label: 'GenBI Point', icon: FaStar },
            { path: '/tentang', label: 'Tentang GenBI', icon: FaInfoCircle },
            { path: '/organisasi', label: 'Organisasi', icon: FaBuilding },
            { path: '/sejarah-kepengurusan', label: 'Sejarah Kepengurusan', icon: FaHistory }
        ]
    },
    {
        id: 'media',
        label: 'Media',
        icon: FaFolder,
        dropdown: [
            { path: '/artikel', label: 'Artikel', icon: BookOpen },
            { path: '/podcast', label: 'Podcast', icon: FaPodcast },
            { path: '/galeri', label: 'Galeri', icon: IconGallery }
        ]
    },
    { path: '/contact', label: 'Kontak', icon: FaEnvelope }
];

// const BOTTOM_NAV_ITEMS = [
//     { path: '/', label: 'Beranda', icon: FaHome },
//     {
//         id: 'about',
//         label: 'Tentang',
//         icon: FaInfoCircle,
//         dropdown: [
//             { path: '/genbi-point', label: 'GenBI Point', icon: FaStar },
//             { path: '/tentang', label: 'Tentang GenBI', icon: FaInfoCircle },
//             { path: '/organisasi', label: 'Organisasi', icon: FaBuilding }
//         ]
//     },
//     {
//         id: 'media',
//         label: 'Media',
//         icon: FaFolder,
//         dropdown: [
//             { path: '/artikel', label: 'Artikel', icon: BookOpen },
//             { path: '/podcast', label: 'Podcast', icon: FaPodcast }
//         ]
//     },
//     { path: '/contact', label: 'Kontak', icon: FaEnvelope }
// ];

// Memoized Components
//@ts-ignore
const MobileMenuItem = memo(({ href, icon: Icon, label, isDark, onClick, isActive }) => (
    <Link
    //@ts-ignore
        href={href}
        className={`flex items-center space-x-3 p-3 rounded-xl ${
            isActive
                ? 'bg-blue-600 text-white'
                : isDark
                    ? 'text-gray-300 hover:bg-gray-800/60'
                    : 'text-gray-700 hover:bg-gray-100'
        } transition-all duration-200`}
        onClick={onClick}
    >
        <div className={`size-9 rounded-xl flex items-center justify-center ${
            isActive
                ? 'bg-blue-500'
                : isDark ? 'bg-gray-800/80' : 'bg-gray-100'
        }`}>
            <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium">{label}</span>
    </Link>
));

// Desktop Navigation Item
//@ts-ignore
const DesktopNavItem = memo(({ item, isActive, isDark, activeDropdown, onDropdownToggle }) => {
    const hasDropdown = item.dropdown;

    if (hasDropdown) {
        return (
            <div className="relative">
                <button
                    onClick={() => onDropdownToggle(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                        isActive
                            ? 'bg-blue-600 text-white'
                            : isDark
                                ? 'text-gray-300 hover:bg-gray-700'
                                : 'text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <item.icon className="mr-2" />
                    {item.label}
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === item.id ? 'rotate-180' : ''
                    }`} />
                </button>

                <AnimatePresence>
                    {activeDropdown === item.id && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`absolute left-0 mt-2 w-48 rounded-xl shadow-lg py-1 border ${
                                isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                            }`}
                        >
                            {item.dropdown.map((dropItem) => (
                                <Link
                                    key={dropItem.path}
                                    href={dropItem.path}
                                    className={`flex items-center space-x-3 px-4 py-2 text-sm ${
                                        isDark
                                            ? 'text-gray-300 hover:bg-gray-700'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <dropItem.icon className="w-4 h-4" />
                                    <span>{dropItem.label}</span>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <Link
            href={item.path}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                isActive
                    ? 'bg-blue-600 text-white'
                    : isDark
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
            <item.icon className="mr-2" />
            {item.label}
        </Link>
    );
});

// Bottom Navigation Item
// const BottomNavItem = memo(({ item, isActive, isDark, onItemClick }) => {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const hasDropdown = item.dropdown;

//     const handleClick = (e) => {
//         if (hasDropdown) {
//             e.preventDefault();
//             setShowDropdown(!showDropdown);
//         } else {
//             onItemClick?.();
//         }
//     };

//     return (
//         <div className="relative">
//             <Link
//                 href={item.path}
//                 onClick={handleClick}
//                 className="flex flex-col items-center py-2 transition-all duration-300 relative group"
//             >
//                 {isActive && (
//                     <motion.div
//                         layoutId="bottomNav"
//                         className="absolute -top-1 w-8 h-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
//                         transition={{
//                             type: "spring",
//                             stiffness: 300,
//                             damping: 30
//                         }}
//                     />
//                 )}

//                 <div className={`
//                     p-1.5 rounded-xl transition-all duration-300
//                     ${isActive
//                         ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20'
//                         : isDark
//                             ? 'text-gray-400 hover:text-blue-400 group-hover:bg-gray-800/50'
//                             : 'text-gray-500 hover:text-blue-600 group-hover:bg-gray-100/50'
//                     }
//                 `}>
//                     <item.icon className={`
//                         h-4 w-4 transition-transform duration-300
//                         ${isActive ? 'scale-110' : 'group-hover:scale-110'}
//                     `} />
//                 </div>

//                 <span className={`
//                     text-[10px] font-medium transition-all duration-300
//                     ${isActive
//                         ? isDark ? 'text-blue-400' : 'text-blue-600'
//                         : isDark
//                             ? 'text-gray-400 group-hover:text-blue-400'
//                             : 'text-gray-500 group-hover:text-blue-600'
//                     }
//                 `}>
//                     {item.label}
//                 </span>
//             </Link>

//             {/* Dropdown Menu */}
//             <AnimatePresence>
//                 {showDropdown && hasDropdown && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: 10 }}
//                         className={`
//                             absolute bottom-full mb-16 left-1/2 -translate-x-1/2 w-48
//                             rounded-xl shadow-lg overflow-hidden border
//                             ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//                         `}
//                     >
//                         {item.dropdown.map((dropItem) => (
//                             <Link
//                                 key={dropItem.path}
//                                 href={dropItem.path}
//                                 className={`
//                                     flex items-center space-x-3 p-3 text-sm
//                                     ${isDark
//                                         ? 'text-gray-300 hover:bg-gray-700'
//                                         : 'text-gray-700 hover:bg-gray-50'
//                                     }
//                                 `}
//                                 onClick={() => {
//                                     setShowDropdown(false);
//                                     onItemClick?.();
//                                 }}
//                             >
//                                 <div className={`
//                                     size-8 rounded-lg flex items-center justify-center
//                                     ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
//                                 `}>
//                                     <dropItem.icon className="w-4 h-4" />
//                                 </div>
//                                 <span className="font-medium">{dropItem.label}</span>
//                             </Link>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// });

const Navbar = () => {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { user } = useAuth();
    const { isDark } = useTheme();

    // Check if current path matches any dropdown item
    const isDropdownItemActive = useCallback((dropdownItems) => {
        return dropdownItems?.some(item => url.startsWith(item.path));
    }, [url]);

    // Check if path is active
    const isPathActive = useCallback((path) => {
        return  path === '/' ? url === path : url.startsWith(path);
    }, [url]);

    // Scroll handler with debounce
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > 20);
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
        if (isProfileOpen) setIsProfileOpen(false);
        setActiveDropdown(null);
    }, [isProfileOpen]);

    const toggleDropdown = useCallback((dropdownId) => {
        setActiveDropdown(prev => prev === dropdownId ? null : dropdownId);
    }, []);

    const handleItemClick = useCallback(() => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setIsProfileOpen(false);
    }, []);

    return (
        <>
            {/* Main Navbar */}
            <motion.nav
                className={`fixed w-full z-50 top-0 transition-all duration-300 ${
                    isScrolled
                        ? isDark
                            ? 'bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-800'
                            : 'bg-white/80 backdrop-blur-md shadow-md'
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href={route('home')} className="flex items-center">
                                <img
                                    src="/images/genbi-logo.png"
                                    alt="GenBI Logo"
                                    className="h-8 md:h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex">
                            <div className={`flex space-x-1 ${
                                isDark
                                    ? 'bg-gray-800/80'
                                    : 'bg-white/80'
                                } backdrop-blur-md rounded-full p-1 shadow-lg`}>
                                {NAV_ITEMS.map((item) => (
                                    <DesktopNavItem
                                        key={item.id || item.path}
                                        //@ts-ignore
                                        item={item}
                                        isActive={item.dropdown
                                            ? isDropdownItemActive(item.dropdown)
                                            : isPathActive(item.path)
                                        }
                                        isDark={isDark}
                                        activeDropdown={activeDropdown}
                                        onDropdownToggle={toggleDropdown}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Auth Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Theme Toggle */}
                            {/* <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-200 ${
                                    isDark
                                        ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-700'
                                        : 'bg-white/80 text-blue-600 hover:bg-gray-100'
                                } shadow-lg`}
                                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                            >
                                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button> */}

                            {user ? (
                                <div className="relative">
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            href={route('admin.dashboard')}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                                                isDark
                                                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                                                    : 'bg-white/80 text-gray-700 hover:bg-gray-100'
                                            } shadow-lg`}
                                        >
                                            <FaTachometerAlt className="mr-2" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                                                isDark
                                                    ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                                                    : 'bg-white/80 text-blue-600 hover:bg-blue-50'
                                            } shadow-lg`}
                                        >
                                            <FaUserCircle className="w-5 h-5" />
                                            <span>{user.name}</span>
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg py-2 border ${
                                                    isDark
                                                        ? 'bg-gray-800 border-gray-700'
                                                        : 'bg-white border-gray-100'
                                                }`}
                                            >
                                                <Link
                                                    href="/profile"
                                                    className={`block px-4 py-2 text-sm ${
                                                        isDark
                                                            ? 'text-gray-300 hover:bg-gray-700'
                                                            : 'text-gray-700 hover:bg-blue-50'
                                                    }`}
                                                >
                                                    <FaUser className="inline-block mr-2" />
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    className={`block w-full text-left px-4 py-2 text-sm ${
                                                        isDark
                                                            ? 'text-red-400 hover:bg-red-900/30'
                                                            : 'text-red-600 hover:bg-red-50'
                                                    }`}
                                                >
                                                    <FaSignOutAlt className="inline-block mr-2" />
                                                    Logout
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        isDark
                                            ? 'bg-gray-800 text-blue-400 hover:bg-gray-700'
                                            : 'bg-white/80 text-blue-600 hover:bg-blue-50'
                                    } shadow-lg`}
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center space-x-2">
                            {/* <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all duration-200 ${
                                    isDark
                                        ? 'bg-gray-800 text-yellow-400 border border-gray-700'
                                        : 'bg-white/80 text-blue-600'
                                } shadow-lg`}
                                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                            >
                                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button> */}

                            <button
                                onClick={toggleMenu}
                                className={`p-2 rounded-full ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <FaTimes className="h-6 w-6" />
                                ) : (
                                    <FaBars className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className={`px-4 py-6 ${
                                isDark
                                    ? 'bg-gray-900/95 border-t border-gray-800'
                                    : 'bg-white/95'
                                } backdrop-blur-lg`}
                            >
                                <div className="space-y-6">
                                    {/* Menu Items */}
                                    <div className="space-y-2">
                                        {NAV_ITEMS.map((item) => (
                                            <div key={item.id || item.path}>
                                                {item.dropdown ? (
                                                    <div className="space-y-2">
                                                        <motion.button
                                                            onClick={() => toggleDropdown(item.id)}
                                                            className={`w-full flex items-center justify-between p-3 rounded-xl ${
                                                                isDropdownItemActive(item.dropdown)
                                                                    ? 'bg-blue-600 text-white'
                                                                    : isDark
                                                                        ? 'text-gray-300 hover:bg-gray-800/60'
                                                                        : 'text-gray-700 hover:bg-gray-100'
                                                            } transition-all duration-200`}
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <div className={`size-9 rounded-xl flex items-center justify-center ${
                                                                    isDropdownItemActive(item.dropdown)
                                                                        ? 'bg-blue-500'
                                                                        : isDark ? 'bg-gray-800/80' : 'bg-gray-100'
                                                                }`}>
                                                                    <item.icon className="w-5 h-5" />
                                                                </div>
                                                                <span className="font-medium">{item.label}</span>
                                                            </div>
                                                            <motion.div
                                                                animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <ChevronDown className="w-5 h-5" />
                                                            </motion.div>
                                                        </motion.button>

                                                        <AnimatePresence>
                                                            {activeDropdown === item.id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: -10 }}
                                                                    className="pl-5 space-y-2"
                                                                >
                                                                    {item.dropdown.map((dropItem) => (
                                                                        <MobileMenuItem
                                                                            key={dropItem.path}
                                                                            //@ts-ignore
                                                                            href={dropItem.path}
                                                                            icon={dropItem.icon}
                                                                            label={dropItem.label}
                                                                            isDark={isDark}
                                                                            onClick={handleItemClick}
                                                                            isActive={url.startsWith(dropItem.path)}
                                                                        />
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                ) : (
                                                    <MobileMenuItem
                                                    //@ts-ignore
                                                        href={item.path}
                                                        icon={item.icon}
                                                        label={item.label}
                                                        isDark={isDark}
                                                        onClick={handleItemClick}
                                                        isActive={isPathActive(item.path)}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mobile Auth Section */}
                                    <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                                        {user ? (
                                            <div className="space-y-2">
                                                <MobileMenuItem
                                                //@ts-ignore
                                                    href="/dashboard"
                                                    icon={FaTachometerAlt}
                                                    label="Dashboard"
                                                    isDark={isDark}
                                                    onClick={handleItemClick}
                                                    isActive={url === '/dashboard'}
                                                />
                                                <MobileMenuItem
                                                //@ts-ignore
                                                    href="/profile"
                                                    icon={FaUser}
                                                    label="Profile"
                                                    isDark={isDark}
                                                    onClick={handleItemClick}
                                                    isActive={url === '/profile'}
                                                />
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    onClick={handleItemClick}
                                                    className={`w-full flex items-center space-x-3 p-3 rounded-xl ${
                                                        isDark
                                                            ? 'text-red-400 hover:bg-red-900/20'
                                                            : 'text-red-600 hover:bg-red-50'
                                                    } transition-all duration-200`}
                                                >
                                                    <div className={`size-9 rounded-xl flex items-center justify-center ${
                                                        isDark ? 'bg-red-900/30' : 'bg-red-50'
                                                    }`}>
                                                        <FaSignOutAlt className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-medium">Logout</span>
                                                </Link>
                                            </div>
                                        ) : (
                                            <Link
                                                href="/login"
                                                className={`flex items-center space-x-3 p-3 rounded-xl ${
                                                    isDark
                                                        ? 'text-blue-400 hover:bg-blue-900/20'
                                                        : 'text-blue-600 hover:bg-blue-50'
                                                } transition-all duration-200`}
                                                onClick={handleItemClick}
                                            >
                                                <div className={`size-9 rounded-xl flex items-center justify-center ${
                                                    isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                                                }`}>
                                                    <FaUser className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium">Login</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Bottom Navigation (Mobile) */}
            {/* <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
                <div className="mx-4 mb-4">
                    <div className={`
                        backdrop-blur-md rounded-2xl shadow-lg border
                        ${isDark
                            ? 'bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-gray-700'
                            : 'bg-gradient-to-r from-white/90 to-gray-50/90 border-gray-200'
                        }
                    `}>
                        <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm" />
                        <div className="relative grid grid-cols-4 items-center">
                            {BOTTOM_NAV_ITEMS.map((item) => (
                                <BottomNavItem
                                    key={item.id || item.path}
                                    item={item}
                                    isActive={item.dropdown
                                        ? isDropdownItemActive(item.dropdown)
                                        : isPathActive(item.path)
                                    }
                                    isDark={isDark}
                                    onItemClick={handleItemClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}



            {/* Click Away Listener */}
            {(isProfileOpen || isMenuOpen || activeDropdown) && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    onClick={() => {
                        setIsProfileOpen(false);
                        setIsMenuOpen(false);
                        setActiveDropdown(null);
                    }}
                />
            )}
        </>
    );
};

export default memo(Navbar);
