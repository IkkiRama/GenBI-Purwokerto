import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

/* ================= ANIMATION ================= */
const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeOut' }
};

const listAnimation = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.25 }
};

/* ================= SKELETON ================= */
const SkeletonCard = ({ isDark }) => (
  <div className={`rounded-xl overflow-hidden shadow-lg p-4 animate-pulse ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`}>
    <div className={`aspect-video rounded mb-4 ${
      isDark
        ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] animate-shimmer'
        : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer'
    }`} />
    <div className="h-4 w-24 rounded mb-3 bg-gray-400/40" />
    <div className="h-5 w-full rounded mb-2 bg-gray-400/40" />
    <div className="h-4 w-3/4 rounded bg-gray-400/40" />
  </div>
);

/* ================= PODCAST CARD ================= */
const PodcastCard = ({ title, videoId, youtubeUrl, date, description, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div {...listAnimation}>
      <div className={`rounded-xl overflow-hidden shadow-lg backdrop-blur ${
        isDark ? 'bg-gray-800/70 text-white' : 'bg-white/70 text-gray-900'
      }`}>
        <div className="p-4 flex flex-col gap-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                loading="lazy"
                allowFullScreen
              />
            </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-white bg-blue-600 rounded-full">
                {date}
              </span>

              <h3 className="text-lg font-bold mb-2">{title}</h3>

              {description !== '-' && (
                <>
                  <p className={`text-sm opacity-80 ${!isExpanded && 'line-clamp-3'}`}>
                    {description}
                  </p>

                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-500 text-sm mt-2 flex items-center hover:underline"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Lihat lebih sedikit' : 'Lihat selengkapnya'}
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </>
              )}
            </div>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition hover:shadow-lg bg-blue-600 text-white text-sm w-fit mt-4"
            >
              <Play size={16} />
              Tonton
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN PAGE ================= */
export default function Podcast() {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

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
        const res = await fetch(`${BASE_URL}/api/podcast`);
        if (!res.ok) throw new Error('Gagal memuat podcast');
        const json = await res.json();
        setPodcasts(json.data);
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
    () => ['all', ...new Set(podcasts.map(p => p.date))],
    [podcasts]
  );

  const filteredData = useMemo(() => {
    if (filter === 'all') return podcasts;
    return podcasts.filter(p => p.date === filter);
  }, [filter, podcasts]);

  return (
    <MainLayout isDark={isDark} title="Podcast">
      <Head>
        <title>Podcast - GenBI Purwokerto</title>
        <meta name="description" content="Podcast inspiratif GenBI Purwokerto tentang ekonomi, sosial, dan generasi muda." />
        <link rel="canonical" href="https://genbipurwokerto.com/podcast" />
      </Head>

      <AnimatePresence mode="wait">
        <motion.div {...(!reduceMotion ? pageTransition : {})}>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="fixed right-5 bottom-24 z-50 px-4 py-2 rounded-full shadow bg-white/80 dark:bg-gray-800/80 dark:text-white text-gray-900 font-semibold"
            aria-label="Toggle Theme"
          >
            {isDark ? '🌞 Light' : '🌙 Dark'}
          </button>

          {/* HEADER */}
          <div className="pt-24 pb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300">GenBI Podcast Series</h1>
            <p className="opacity-80 mt-2 text-gray-800 dark:text-gray-300">Podcast inspiratif dan edukatif GenBI Purwokerto</p>
          </div>

          {/* FILTER TAB */}
          <div
            className="flex gap-2 justify-center flex-wrap mb-10"
            role="tablist"
          >
            {years.map(year => (
              <button
                key={year}
                role="tab"
                aria-selected={filter === year}
                onClick={() => setFilter(year)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  filter === year
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                {year === 'all' ? 'Semua' : year}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="max-w-6xl mx-auto px-4 pb-20" aria-busy={loading}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div className="grid md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} isDark={isDark} />
                  ))}
                </motion.div>
              ) : error ? (
                <p className="text-center text-red-500" aria-live="polite">{error}</p>
              ) : (
                <motion.div className="grid md:grid-cols-2 gap-6">
                  {filteredData.map((podcast, i) => (
                    <PodcastCard key={i} {...podcast} isDark={isDark} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}
