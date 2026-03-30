import { Home, FileText, HelpCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const menus = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "Artikel" },
  { icon: HelpCircle, label: "Quiz" },
  { icon: User, label: "Account" },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 flex justify-around py-2 z-50">
      {menus.map((menu, i) => {
        const Icon = menu.icon;
        return (
          <motion.div
            key={i}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300"
          >
            <Icon size={20} />
            <span>{menu.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
