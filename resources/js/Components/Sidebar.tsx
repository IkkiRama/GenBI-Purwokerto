import {
  Home,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, router, usePage } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { logout } from "@/Store/authSlice";
import api from "@/lib/api";
import { useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";

const menus = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Artikel", icon: FileText, href: "/dashboard/artikel" },
  { label: "Kuis", icon: MdOutlineQuiz, href: "/dashboard/kuis" },
  { label: "Account Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const { url } = usePage(); // ambil URL dari Inertia
  const dispatch = useDispatch();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // active menu logic (aman untuk nested route)
    const isActive = (path) => {
    // khusus dashboard → exact match
    if (path === "/dashboard") {
        return url === path;
    }

    // selain dashboard → support nested
    return url === path || url.startsWith(path + "/");
    };

    const handleLogout = async () => {
        setLoadingLogout(true);
        try {
            await api.post("/api/logout");

            localStorage.removeItem("token");
            dispatch(logout());

            router.visit("/");
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingLogout(false);
            setShowLogoutModal(false);
        }
    };

  return (
    <>
        <aside
        className="fixed hidden md:flex flex-col w-64 h-full
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800
        p-5"
        >
            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                Dashboard
                </h1>
            </div>

            {/* MENU */}
            <div className="space-y-1 flex-1">
                {menus.map((menu, i) => {
                const Icon = menu.icon;
                const active = isActive(menu.href);

                return (
                    <Link key={i} href={menu.href}>
                    <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all

                        ${
                        active
                            ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                        }
                        `}
                    >
                        {/* ACTIVE INDICATOR */}
                        {active && (
                        <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-full" />
                        )}

                        <Icon size={18} />
                        <span className="text-sm font-medium">{menu.label}</span>
                    </motion.div>
                    </Link>
                );
                })}

                {/* LOGOUT */}
                <div className="mt-auto pt-3">
                <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                    text-red-600 dark:text-red-400
                    hover:bg-red-50 dark:hover:bg-red-900/20 transition-all
                    disabled:opacity-50"
                >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">
                    {loadingLogout ? "Logging out..." : "Logout"}
                    </span>
                </motion.div>
                </div>
            </div>
        </aside>

        {showLogoutModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center">

                {/* BACKDROP */}
                <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => !loadingLogout && setShowLogoutModal(false)}
                />

                {/* MODAL */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-sm shadow-xl z-10"
                >
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Konfirmasi Logout
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                    Yakin mau keluar dari akun kamu?
                </p>

                <div className="flex justify-end gap-3">
                    {/* CANCEL */}
                    <button
                        onClick={() => setShowLogoutModal(false)}
                        disabled={loadingLogout}
                        className="px-4 py-2 text-sm rounded-lg border
                        hover:bg-gray-100 dark:hover:bg-gray-800
                        disabled:opacity-50"
                    >
                    Batal
                    </button>

                    {/* CONFIRM */}
                    <button
                        onClick={handleLogout}
                        disabled={loadingLogout}
                        className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white
                        hover:bg-red-700 disabled:opacity-50"
                    >
                    {loadingLogout ? "Logging out..." : "Ya, Logout"}
                    </button>
                </div>
                </motion.div>
            </div>
        )}
    </>
  );
}
