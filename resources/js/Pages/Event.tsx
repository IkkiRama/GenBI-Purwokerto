import MainLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import { useEffect, useState, useRef } from 'react';
import { FaCalendar, FaMapMarkedAlt, FaSearch } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Head, Link, usePage } from '@inertiajs/react';

// Motion presets
const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: 'easeIn' } },
};

const cardMotion = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

const underlineMotion = {
  initial: { width: 0, opacity: 0 },
  animate: { width: '100%', opacity: 1, transition: { duration: 0.22 } },
  exit: { width: 0, opacity: 0, transition: { duration: 0.18 } },
};

// Shimmer CSS (Tailwind-friendly utility classes expected in project)
const shimmerStyles = `
  bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
  animate-shimmer
`;

// Make sure to define `@keyframes shimmer` in your global CSS if not present:
// @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
// .animate-shimmer { background-size: 200% 100%; animation: shimmer 1.4s linear infinite; }

export default function Event() {
  const { url } = usePage();
  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI state
  const [tabActive, setTabActive] = useState('Semua Kegiatan');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Accessibility: move focus to heading when tab changes
  useEffect(() => {
    headingRef.current?.focus();
  }, [tabActive]);

  // Sync theme
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch events
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/event`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = await res.json();
        if (mounted) {
          if (j.success) setEvents(Array.isArray(j.data) ? j.data : []);
          else setError(j.message || 'Data fetch failed');
        }
      } catch (err: any) {
        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [BASE_URL]);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(id);
  }, [query]);

  // Filter logic (tab + search)
  const filteredEvents = events.filter((ev) => {
    if (tabActive === 'Sedang Berlangsung' && ev.status !== 'Pendaftaran Masih Dibuka') return false;
    if (tabActive === 'Sudah Berakhir' && ev.status !== 'Event Sudah Berakhir') return false;

    if (!debouncedQuery) return true;

    const q = debouncedQuery;
    const inTitle = String(ev.nama || '').toLowerCase().includes(q);
    const inExcerpt = String(ev.excerpt || '').toLowerCase().includes(q);
    const inPlace = String(ev.tempat || '').toLowerCase().includes(q);
    return inTitle || inExcerpt || inPlace;
  });

  const tabs = ['Semua Kegiatan', 'Sedang Berlangsung', 'Sudah Berakhir'];

  return (
    <MainLayout isDark={isDark} title="Event">
      <Head>
        <title>Event - GenBI Purwokerto</title>
        <meta name="description" content="Jelajahi acara GenBI Purwokerto: seminar, pelatihan, dan kegiatan sosial. Cari berdasarkan lokasi, judul, atau status pendaftaran." />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Event - GenBI Purwokerto" />
        <meta property="og:description" content="Jelajahi acara GenBI Purwokerto: seminar, pelatihan, dan kegiatan sosial." />
        <meta property="og:url" content={`https://genbipurwokerto.com${url}`} />
      </Head>

      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-3 py-2 rounded">Skip to content</a>

      {/* Theme toggle */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          aria-pressed={isDark}
          onClick={() => setIsDark((s) => !s)}
          className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
        </button>
      </div>

      <motion.main
        id="main"
        role="main"
        className={`min-h-screen px-4 lg:pt-28 lg:pb-20 py-20 transition-colors duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <div className="container mx-auto">
          <motion.header className="text-center mb-6" aria-labelledby="page-heading">
            <h1 id="page-heading" tabIndex={-1} className="text-2xl sm:text-3xl font-bold">Semua Kegiatan GenBI</h1>

            {/* Tabs */}
            <nav aria-label="Filter events by status" className="mt-6">
              <div className="inline-flex items-end gap-6">
                {tabs.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTabActive(t)}
                    className={`relative pb-2  ${tabActive === t ? 'text-blue-600 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}
                    aria-pressed={tabActive === t}
                  >
                    {t}
                    <AnimatePresence>
                      {tabActive === t && (
                        <motion.span aria-hidden className="block h-1 bg-blue-600 rounded-full absolute left-0 -bottom-1" variants={underlineMotion} initial="initial" animate="animate" exit="exit" />
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </nav>

            {/* Search / filter */}
            <div className="mt-6 flex justify-center">
              <label htmlFor="search" className="sr-only">Cari event berdasarkan judul, lokasi, atau deskripsi</label>
              <div className="relative w-full max-w-md">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400"><FaSearch /></span>
                <input
                  id="search"
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari event (judul, lokasi, deskripsi)..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Search events"
                />
              </div>
            </div>
          </motion.header>

          {/* Error / empty states */}
          {error && (
            <div role="status" aria-live="polite" className="text-center text-red-500 py-8">Terjadi kesalahan: {error}</div>
          )}

          {/* Loading skeleton */}
          {loading ? (
            <section aria-busy="true" className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:px-10 px-3 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <article key={i} className={`rounded-lg overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`} aria-hidden>
                  <div className={`w-full h-48 ${shimmerStyles}`} />
                  <div className="p-4 space-y-3">
                    <div className={`h-4 ${shimmerStyles} rounded w-3/4`} />
                    <div className={`h-3 ${shimmerStyles} rounded w-full`} />
                    <div className={`h-3 ${shimmerStyles} rounded w-5/6`} />
                    <div className={`h-3 ${shimmerStyles} rounded w-1/2`} />
                  </div>
                  <div className={`h-10 ${shimmerStyles}`} />
                </article>
              ))}
            </section>
          ) : (
            // AnimatePresence for list changes (tab/filter)
            <AnimatePresence mode="wait">
              <motion.section
                key={`${tabActive}-${debouncedQuery}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.28 } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:px-10 px-3"
                aria-live="polite"
              >
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((item: any, index: number) => (
                    <motion.article key={item.id || index} {...cardMotion} layout className={`rounded-lg overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                      <Link href={`/event/${item.slug}`} aria-label={`Buka detail event ${item.nama}`} className="block">
                        <img src={item.image ? `${BASE_URL}/storage/${item.image}` : './images/NO IMAGE AVAILABLE.jpg'} alt={item.nama || 'Event image'} className="w-full h-48 object-cover rounded-t-lg" />

                        <div className="p-4">
                          <h2 className="text-lg font-bold mb-2">{item.nama}</h2>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{item.excerpt}</p>

                          <div className="mt-4 flex gap-4 items-center text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-2"><FaMapMarkedAlt /> <span>{item.tempat}</span></span>
                            <span className="flex items-center gap-2"><FaCalendar /> <span>{changeDate(new Date(item.tanggal))}</span></span>
                          </div>
                        </div>

                        <div className={`p-4 text-center text-sm font-semibold ${item.status === 'Event Sudah Berakhir' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'}`}>
                          {item.status}
                        </div>
                      </Link>
                    </motion.article>
                  ))
                ) : (
                  <div className="col-span-full mt-16 flex flex-col items-center gap-6">
                    <img src="./images/kosong.svg" className="lg:w-[10%] w-[60%] h-auto" alt="Tidak ada event" />
                    <h2 className="text-xl font-semibold text-red-500">Belum Ada Event</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Coba ubah filter atau pencarian untuk menemukan event lain.</p>
                  </div>
                )}
              </motion.section>
            </AnimatePresence>
          )}
        </div>
      </motion.main>
    </MainLayout>
  );
}
