import { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import HeroGenBIPoint from '@/Components/HeroGenBIPoint';
import { IconCalendarDays, IconClipboard, IconListBullets, IconTrophy } from '@irsyadadl/paranoid';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Head } from '@inertiajs/react';

/* =========================
   SHIMMER SKELETON COMPONENT
========================= */
const ShimmerSkeleton = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
  </div>
);

export default function GenBIPoint() {
  const [openLightboxDeputi, setOpenLightboxDeputi] = useState(false);
  const [openLightboxStaff, setOpenLightboxStaff] = useState(false);
  const [SOTMDeputi, setSOTMDeputi] = useState<any[]>([]);
  const [SOTMStaff, setSOTMStaff] = useState<any[]>([]);
  const [lightboxDeputi, setLightboxDeputi] = useState<any[]>([]);
  const [lightboxStaff, setLightboxStaff] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // TAB STATE
  const [activeTab, setActiveTab] = useState<'deputi' | 'staff'>('deputi');

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  /* =========================
     DARK MODE HANDLING
  ========================= */
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

  /* =========================
     FETCH SOTM DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + "/api/sotm");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        const deputi = data.data.filter((item: any) => item.jenis === 'deputi');
        const staff = data.data.filter((item: any) => item.jenis === 'staff');

        const deputiImages = deputi.map((item: any) => ({
          src: BASE_URL + `/storage/${item.image}`
        }));

        const staffImages = staff.map((item: any) => ({
          src: BASE_URL + `/storage/${item.image}`
        }));

        setSOTMDeputi(deputi);
        setSOTMStaff(staff);
        setLightboxDeputi(deputiImages);
        setLightboxStaff(staffImages);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  /* =========================
     SKELETON LOADING
  ========================= */
  if (SOTMDeputi.length <= 0 && SOTMStaff.length <= 0)
    return (
      <div className="container mx-auto py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ShimmerSkeleton key={i} className="h-[350px] rounded-xl" />
        ))}
      </div>
    );

  if (error) return <p role="alert">Error: {error}</p>;

  /* =========================
     FEATURE LIST
  ========================= */
  const missionItems = [
    {
      icon: <IconListBullets className="w-10 h-10" />,
      title: "Kegiatan",
      description:
        "Informasi lengkap tentang kegiatan yang direncanakan atau telah dilaksanakan.",
    },
    {
      icon: <IconCalendarDays className="w-10 h-10" />,
      title: "Penilaian Deputi",
      description:
        "Penilaian kinerja deputi secara objektif dan transparan.",
    },
    {
      icon: <IconClipboard className="w-10 h-10" />,
      title: "Absensi",
      description:
        "Mencatat kehadiran anggota pada setiap kegiatan atau rapat.",
    },
    {
      icon: <IconTrophy className="w-10 h-10" />,
      title: "Ranking",
      description:
        "Peringkat deputi dan staf berdasarkan skor penilaian.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <MainLayout isDark={isDark} title="GenBI Point">
        {/* ========================= SEO ========================= */}
        <Head>
          <title>GenBI Point - GenBI Purwokerto</title>
          <meta
            name="description"
            content="GenBI Point adalah platform pengelolaan aktivitas, penilaian, dan prestasi anggota GenBI Purwokerto."
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://genbipurwokerto.com/genbi-point" />
          <meta name="theme-color" content={isDark ? '#111827' : '#ffffff'} />
        </Head>

        {/* ========================= THEME TOGGLE ========================= */}
        <div className="fixed right-5 bottom-24 z-50">
          <button
            aria-label="Toggle theme"
            aria-pressed={isDark}
            onClick={() => setIsDark((s) => !s)}
            className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2"
          >
            <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">
              {isDark ? '🌞 Light' : '🌙 Dark'}
            </span>
          </button>
        </div>

        <section className="bg-white dark:bg-gray-900 flex justify-center">
          <HeroGenBIPoint />
        </section>

        <main
          className={`container mx-auto py-16 px-4 transition-colors duration-300 ${
            isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
          }`}
        >
          {/* ========================= FITUR ========================= */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {missionItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-2xl shadow-md border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========================= TAB ========================= */}
          <div className="flex justify-center mb-10 gap-4">
            {['deputi', 'staff'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
                aria-pressed={activeTab === tab}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ========================= SOTM GRID ========================= */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {(activeTab === 'deputi' ? SOTMDeputi : SOTMStaff).map((item: any, index: any) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    activeTab === 'deputi'
                      ? setOpenLightboxDeputi(true)
                      : setOpenLightboxStaff(true)
                  }
                  className="cursor-pointer"
                >
                  <img
                    src={BASE_URL + '/storage/' + item.image}
                    loading="lazy"
                    alt={`SOTM ${activeTab}`}
                    className="rounded-xl h-[350px] w-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ========================= LIGHTBOX ========================= */}
          <Lightbox
            open={openLightboxDeputi}
            close={() => setOpenLightboxDeputi(false)}
            slides={lightboxDeputi}
          />

          <Lightbox
            open={openLightboxStaff}
            close={() => setOpenLightboxStaff(false)}
            slides={lightboxStaff}
          />
        </main>
      </MainLayout>
    </motion.div>
  );
}
