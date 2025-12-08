// pages/SejarahKepengurusan.enhanced.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { Head, Link } from '@inertiajs/react';

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

const TABS = [
  { id: 'semua', label: 'Semua' },
  { id: 'terbaru', label: 'Terbaru' }
];

export default function SejarahKepengurusan() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  const [sejarahKepengurusan, setSejarahKepengurusan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'semua' | 'terbaru'>('semua');

  const themeHook = useTheme();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  // Respect prefers-reduced-motion
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/sejarah-kepengurusan`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.success) {
          if (!mounted) return;
          setSejarahKepengurusan(json.data || []);
          setError(null);
        } else {
          throw new Error(json.message || 'Gagal memuat data');
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? 'Fetch error');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
  }, [BASE_URL]);

  // sorted list for 'terbaru'
  const terbaruList = useMemo(() => {
    return [...sejarahKepengurusan].sort((a, b) => {
      // assume periode string like "2022/2023" or year — try numeric fallback
      const pa = String(a.periode).match(/\d{4}/g)?.[0] ?? a.periode;
      const pb = String(b.periode).match(/\d{4}/g)?.[0] ?? b.periode;
      return Number(pb) - Number(pa);
    });
  }, [sejarahKepengurusan]);

  const listToRender = activeTab === 'terbaru' ? terbaruList : sejarahKepengurusan;

  // skeleton card
  const SkeletonCard = () => (
    <div className="rounded-lg overflow-hidden border dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="h-56 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-[shimmer_1.4s_infinite]"/>
      <div className="p-4">
        <div className="h-4 w-3/4 mb-3 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
      </div>
    </div>
  );

  return (
    <MainLayout isDark={isDark} title="Sejarah Kepengurusan">
      <Head>
        <title>Sejarah Kepengurusan - GenBI Purwokerto</title>
        <meta name="description" content="Pelajari sejarah kepengurusan GenBI Purwokerto: daftar periode kepengurusan & alumni pengurus dari tahun ke tahun." />
        <meta name="keywords" content="sejarah kepengurusan, genbi purwokerto, kepengurusan genbi" />
        <meta property="og:title" content="Sejarah Kepengurusan - GenBI Purwokerto" />
        <meta property="og:description" content="Pelajari sejarah kepengurusan GenBI Purwokerto." />
        <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Theme toggle */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          aria-pressed={isDark}
          onClick={() => setIsDark(s => !s)}
          className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
        </button>
      </div>

      <motion.main
        variants={PAGE_VARIANTS}
        initial="initial"
        animate="enter"
        exit="exit"
        className={isDark ? 'bg-gray-900 min-h-screen text-gray-100' : 'bg-gray-50 min-h-screen text-gray-900'}
      >
        <div className="container mx-auto px-4 py-20 lg:pt-28 lg:pb-20">
          <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-300">Sejarah Kepengurusan GenBI</h1>
            <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Setiap waktu ada masanya, setiap masa ada waktunya.
              Inilah para alumni kepengurusan GenBI Purwokerto dari tahun ke tahun.
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-4" />
          </motion.header>

          {/* Tabs */}
          <div className="flex justify-center mb-8" role="tablist" aria-label="Filter Sejarah Kepengurusan">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-semibold focus:outline-none focus:ring-2 mr-2 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && <div role="alert" className="text-red-500 text-center mb-6">{error}</div>}

          {/* List area */}
          <section aria-live="polite">
            {/* loading skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{ hidden: {}, visible: {} }}
                >
                  <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listToRender.length === 0 ? (
                      <div role="status" className="col-span-full text-center py-8 bg-white dark:bg-gray-800 rounded">
                        <p className="text-gray-600 dark:text-gray-300">Belum ada data sejarah kepengurusan.</p>
                      </div>
                    ) : (
                      listToRender.map((item) => (
                        <motion.article
                          key={item.periode}
                          variants={reduce ? {} : ITEM_VARIANTS}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden"
                        >
                          <Link href={`/sejarah-kepengurusan/${item.periode}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <div className="h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image ? `${BASE_URL}/storage/${item.image}` : '/images/logo.png'})` }} role="img" aria-label={`Periode ${item.periode}`} />
                            <div className="p-4">
                              <h3 className="text-lg font-semibold">{item.nama}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Periode: <span className="font-medium">{item.periode}</span></p>
                            </div>
                          </Link>
                        </motion.article>
                      ))
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </section>
        </div>

        {/* Shimmer CSS (light + dark aware) */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          .animate-[shimmer_1.4s_infinite] {
            background-image: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
            background-size: 400% 100%;
            animation: shimmer 1.4s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-[shimmer_1.4s_infinite], .animate-pulse { animation: none !important; }
          }
        `}</style>
      </motion.main>
    </MainLayout>
  );
}
