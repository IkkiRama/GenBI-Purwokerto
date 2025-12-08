import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { Head } from '@inertiajs/react';
import ProfileCard from '@/Components/ProfileCard';

// ================= TYPES =================
interface University {
  name: string;
  logo: string;
  shortName: string;
}

// ================= CONSTANTS =================
const UNIVERSITIES: University[] = [
  { name: 'UIN Prof. K.H. Saifuddin Zuhri', shortName: 'UIN SAIZU', logo: './images/Logo/UIN.png' },
  { name: 'Universitas Jenderal Soedirman', shortName: 'UNSOED', logo: './images/Logo/UNSOED.png' },
  { name: 'Universitas Muhammadiyah Purwokerto', shortName: 'UMP', logo: './images/Logo/UMP.png' },
];

// ================= ANIMATIONS =================
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

const tabListVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const tabItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// ================= SKELETON =================
const ShimmerSkeleton = ({ className }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  </div>
);

// ================= MAIN COMPONENT =================
const Organization: React.FC = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  const [struktur, setStruktur] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'president' | 'secretary' | 'treasure' | 'deputy'>('president');

  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  // Sync theme
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch Data
  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        const response = await fetch(BASE_URL + '/api/struktur');
        const result = await response.json();
        if (result.success) {
          setStruktur(result.data);
        } else {
          setError(result.message || 'Gagal memuat data');
        }
      } catch (err: any) {
        setError(err?.message || 'Fetch error');
      } finally {
        setLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  const filteredData = struktur.filter((item) => item.type === activeTab);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="organization-page"
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <MainLayout isDark={isDark} title="Organisasi">
          <Head>
            <title>Organisasi GenBI Purwokerto</title>
            <meta
              name="description"
              content="Struktur organisasi resmi GenBI Purwokerto mulai dari Presiden, Sekretaris, Bendahara, hingga Deputi."
            />
            <meta name="keywords" content="GenBI Purwokerto, Struktur Organisasi, Pengurus GenBI" />
            <meta property="og:title" content="Organisasi GenBI Purwokerto" />
            <meta property="og:description" content="Struktur lengkap organisasi GenBI Purwokerto." />
            <meta property="og:type" content="website" />
          </Head>

          {/* Theme Toggle */}
          <div className="fixed right-5 bottom-24 z-50">
            <button
              aria-label="Toggle theme"
              aria-pressed={isDark}
              onClick={() => setIsDark((s) => !s)}
              className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">
                {isDark ? '🌞 Light' : '🌙 Dark'}
              </span>
            </button>
          </div>

          <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
            <div className="container mx-auto px-4 pb-20 pt-20 lg:pt-32">

              {/* Header */}
              <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className={`text-4xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Organisasi GenBI Purwokerto
                </h1>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Di bawah naungan Bank Indonesia KPW Purwokerto
                </p>
              </motion.div>

              {/* Universities */}
              <section className="mb-16">
                <h2 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Universitas Anggota
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {UNIVERSITIES.map((uni, index) => (
                    <motion.div
                      key={uni.shortName}
                      className={`p-6 rounded-xl shadow-sm ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="h-28 flex items-center justify-center mb-4">
                        <img src={uni.logo} alt={uni.name} className="max-h-full max-w-[160px] object-contain" />
                      </div>
                      <h3 className={`text-center font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {uni.shortName}
                      </h3>
                      <p className={`text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {uni.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Tabs Filter */}
              <section className="mb-12">
                <div className="flex flex-wrap justify-center gap-4 mb-8" role="tablist">
                  {['president', 'secretary', 'treasure', 'deputy'].map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${activeTab === tab
                          ? 'bg-blue-600 text-white shadow'
                          : isDark
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabListVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: 10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                    {loading ? (
                      [...Array(6)].map((_, i) => (
                        <ShimmerSkeleton key={i} className="h-[320px]" />
                      ))
                    ) : error ? (
                      <p role="alert" className="col-span-full text-center text-red-500">
                        {error}
                      </p>
                    ) : (
                      filteredData.map((profile, index) => (
                        <motion.div key={profile.id} variants={tabItemVariants}>
                          <ProfileCard profile={profile} index={index} isDark={isDark} />
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </section>

            </div>
          </div>
        </MainLayout>
      </motion.div>
    </AnimatePresence>
  );
};

export default Organization;
