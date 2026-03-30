import {
  Home,
  FileText,
  HelpCircle,
  Mic,
  BookOpen,
  Calendar,
  BarChart2,
  Gamepad2,
  Settings,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu } from "@/Store/menuSlice";
import { Link } from "@inertiajs/react";
import api from "@/lib/api";
import { logout } from "@/Store/authSlice";
import { router } from "@inertiajs/react";
import { useState } from "react";

const menus = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Artikel", icon: FileText, href: "/dashboard/artikel" },
  { label: "Account Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const menuActive = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();
  const [loadingLogout, setLoadingLogout] = useState(false);

    const handleLogout = async () => {
        await api.post("/api/logout");

        localStorage.removeItem("token");

        dispatch(logout());

        router.visit("/");
    };

  return (
    <aside
      className="fixed hidden md:flex flex-col w-64 h-full
      bg-white dark:bg-gray-900
      border-r border-gray-200 dark:border-gray-800
      p-5"
    >
      {/* LOGO / TITLE */}
      <div className="mb-6">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* MENU */}
      <div className="space-y-1">
        {menus.map((menu, i) => {
          const Icon = menu.icon;
          const isActive = menu.label === menuActive;

          return (
            <Link
              key={i}
              href={menu.href}
              onClick={() => dispatch(setActiveMenu(menu.label))}
            >
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all

                ${
                  isActive
                    ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                }
                `}
              >
                {/* 🔥 ACTIVE INDICATOR */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-full" />
                )}

                <Icon size={18} />
                <span className="text-sm font-medium">{menu.label}</span>
              </motion.div>
            </Link>
          );
        })}

        {/* Logout */}
        <div className="mt-auto pt-3">
            <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                text-red-600 dark:text-red-400
                hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                onClick={handleLogout}
            >
                <LogOut size={18} />
                <span className="text-sm font-medium">Logout</span>
            </motion.div>
        </div>
      </div>
    </aside>
  );
}
