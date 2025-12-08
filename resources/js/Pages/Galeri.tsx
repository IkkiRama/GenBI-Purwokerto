import MainLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Head, Link } from '@inertiajs/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

/* ================= ANIMATION ================= */
const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: 'easeOut' }
};

const listAnimation = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.25 }
};

/* ================= SKELETON SHIMMER ================= */
const SkeletonCard = ({ isDark }) => (
  <div className={`p-4 rounded-xl shadow-md animate-pulse ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`}>
    <div
      className={`w-full h-[220px] rounded-lg mb-4 ${
        isDark
          ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-shimmer'
          : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer'
      }`}
    />
    <div className="h-4 w-3/4 rounded mb-2 bg-gray-400/40" />
    <div className="h-3 w-full rounded mb-3 bg-gray-400/30" />
    <div className="h-3 w-2/3 rounded bg-gray-400/30" />
  </div>
);

/* ================= MAIN PAGE ================= */
const Galeri = () => {
  const [galeri, setGaleri] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const reduceMotion = useReducedMotion();
  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(themeHook?.isDark ?? false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/galeri`);
        if (!res.ok) throw new Error('Gagal memuat galeri');
        const json = await res.json();
        setGaleri(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= FILTER ================= */
  const years = useMemo(
    () => ['all', ...new Set(galeri.map(item => new Date(item.waktu).getFullYear()))],
    [galeri]
  );

  const filteredData = useMemo(() => {
    if (filter === 'all') return galeri;
    return galeri.filter(
      item => new Date(item.waktu).getFullYear().toString() === filter
    );
  }, [filter, galeri]);

  return (
    <MainLayout isDark={isDark} title="Galeri">
      <Head>
        <title>Galeri - GenBI Purwokerto</title>
        <meta
          name="description"
          content="Galeri dokumentasi kegiatan GenBI Purwokerto dalam berbagai program sosial, edukasi, dan pengabdian."
        />
        <link rel="canonical" href="https://genbipurwokerto.com/galeri" />
        <meta property="og:title" content="Galeri - GenBI Purwokerto" />
        <meta property="og:description" content="Dokumentasi kegiatan GenBI Purwokerto." />
        <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <AnimatePresence mode="wait">
        <motion.div {...(!reduceMotion ? pageTransition : {})}>

          {/* THEME TOGGLE */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="fixed right-5 bottom-24 z-50 px-4 py-2 rounded-full shadow bg-white/80 dark:bg-gray-800/80 dark:text-white text-gray-900 font-semibold"
          >
            {isDark ? '🌞 Light' : '🌙 Dark'}
          </button>

          {/* HEADER */}
          <div className="pt-28 pb-8 text-center">
            <h1 className="text-3xl font-bold">Galeri Kegiatan GenBI</h1>
            <p className="opacity-80 mt-2">Dokumentasi berbagai kegiatan GenBI Purwokerto</p>
          </div>

          {/* FILTER TAB */}
          <div className="flex justify-center flex-wrap gap-2 mb-10" role="tablist">
            {years.map(year => (
              <button
                key={year}
                role="tab"
                aria-selected={filter === year}
                onClick={() => setFilter(year.toString())}
                className={`px-4 py-2 rounded-full text-sm transition font-semibold ${
                  filter === year.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {year === 'all' ? 'Semua' : year}
              </button>
            ))}
          </div>

          {/* GRID CONTENT */}
          <div className="max-w-[1700px] mx-auto px-4 pb-24" aria-busy={loading}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} isDark={isDark} />
                  ))}
                </motion.div>
              ) : error ? (
                <p className="text-center text-red-500" aria-live="polite">{error}</p>
              ) : (
                <motion.div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                  {filteredData.map((item, index) => (
                    <motion.div key={index} {...listAnimation}>
                      <Link
                        href={`/galeri/${item.slug}`}
                        className={`block p-4 rounded-xl shadow-sm transition hover:scale-[1.02] ${
                          isDark ? 'bg-gray-800/70 text-white' : 'bg-white text-gray-900'
                        }`}
                      >
                        <img
                          loading="lazy"
                          src={
                            item.thumbnail
                              ? `${BASE_URL}/storage/${item.thumbnail}`
                              : '/images/NO IMAGE AVAILABLE.jpg'
                          }
                          alt={item.title}
                          className="w-full h-[230px] object-cover rounded-lg mb-4"
                        />

                        <h2 className="text-lg font-bold mb-2">{item.title}</h2>

                        <p className="text-sm opacity-80 line-clamp-3">
                          {item.deskripsi}
                        </p>

                        <div className="mt-4 flex flex-col gap-2 text-xs opacity-70">
                          <span className="flex items-center gap-2">
                            <FaMapMarkedAlt /> {item.tempat}
                          </span>
                          <span className="flex items-center gap-2">
                            <FaCalendar /> {changeDate(new Date(item.waktu))}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
};

export default Galeri;
