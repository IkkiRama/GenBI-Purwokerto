// pages/SejarahPerKepengurusan.enhanced.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import ProfileCard from '@/Components/ProfileCard';
import { Head } from '@inertiajs/react';

interface Props { periode: string }

// ===== CONFIG =====
const TABS = [
  { id: 'all', label: 'Semua' },
  { id: 'president', label: 'Presiden' },
  { id: 'secretary', label: 'Sekretaris' },
  { id: 'treasure', label: 'Bendahara' },
  { id: 'deputy', label: 'Deputi' }
];

const PAGE_VARIANT = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const GRID_VARIANT = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const ITEM_VARIANT = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

// ===== SHIMMER SKELETON =====
const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden border dark:border-gray-800">
    <div className="h-56 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
      <div className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
    </div>
  </div>
);

// ===== MAIN =====
const SejarahPerKepengurusan: React.FC<Props> = ({ periode }) => {
  const [struktur, setStruktur] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/api/struktur/${periode}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        setStruktur(json.data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStruktur();
  }, [periode]);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return struktur;
    return struktur.filter((item) => item.type === activeTab);
  }, [activeTab, struktur]);

  return (
    <MainLayout isDark={isDark} title={`Struktur GenBI ${periode}`}>
      <Head>
        <meta name="description" content={`Struktur lengkap kepengurusan GenBI Purwokerto periode ${periode}.`} />
        <meta name="keywords" content="struktur genbi, sejarah genbi, genbi purwokerto" />
        <meta property="og:title" content={`Struktur GenBI ${periode}`} />
        <meta property="og:description" content={`Struktur lengkap GenBI Purwokerto periode ${periode}.`} />
        <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
        <meta property="og:type" content="website" />
      </Head>

      {/* THEME TOGGLE */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          aria-pressed={isDark}
          onClick={() => setIsDark((s) => !s)}
          className="px-4 py-2 rounded-full border bg-white/80 dark:bg-gray-800/80 backdrop-blur"
        >
          <span className="dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
        </button>
      </div>

      {/* PAGE TRANSITION */}
      <AnimatePresence mode="wait">
        <motion.main
          key={periode}
          variants={PAGE_VARIANT}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
          className={isDark ? 'bg-gray-950 min-h-screen' : 'bg-gray-50 min-h-screen'}
        >
          <div className="container mx-auto px-4 pt-28 pb-16">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white"
            >
              Kepengurusan GenBI {periode}
            </motion.h1>

            {/* TABS */}
            <div
              role="tablist"
              aria-label="Filter struktur"
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm transition font-semibold
                    ${activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 dark:text-gray-300'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            <div className="mt-12">
              {error && <div role="alert" className="text-red-500 text-center">{error}</div>}

              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}

              {!loading && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={GRID_VARIANT}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                  >
                    {filtered.map((profile, index) => (
                      <motion.div key={profile.id} variants={ITEM_VARIANT}>
                        <ProfileCard profile={profile} index={index} isDark={isDark} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </MainLayout>
  );
};

export default SejarahPerKepengurusan;
