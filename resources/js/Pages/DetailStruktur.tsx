import React, { useEffect, useMemo, useState } from "react";
import MainLayout from '@/Layouts/MainLayout';
import NotFound from "@/Components/NotFound";
import { Head } from "@inertiajs/react";
import { useTheme } from "@/Hooks/useTheme";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface DetailStrukturProps {
  periode: string;
  namaBidang: string;
}

interface Member {
  id: number;
  nama: string;
  departemen: string;
  foto?: string | null;
  jabatan?: string;
}

//@ts-ignore
const DetailStruktur: React.FC<DetailStrukturProps> = ({ periode, namaBidang }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  const [struktur, setStruktur] = useState<any | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const themeHook = useTheme();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  // reduced motion
  const shouldReduceMotion = useReducedMotion();

  // Sync theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/struktur/${periode}/${namaBidang}`);
        const result = await response.json();
        if (!mounted) return;
        if (result.success) {
          setStruktur(result.data.struktur ?? null);
          setMembers(result.data.member ?? []);
          setError(null);
        } else {
          setError(result.message ?? 'Gagal memuat data');
        }
      } catch (err: any) {
        setError(err?.message ?? 'Fetch error');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [BASE_URL, periode, namaBidang]);

  // formatted title
  const bidang = struktur?.jabatan ? (String(struktur.jabatan).split(" ")[1] ?? namaBidang) : namaBidang;
  const formattedBidang = `Bidang ${bidang} ${periode}`;

  // grouping members by departemen
  const groupedMembers = useMemo(() => {
    return members.reduce<Record<string, Member[]>>((acc, m) => {
      const key = m.departemen || 'Umum';
      if (!acc[key]) acc[key] = [];
      acc[key].push(m);
      return acc;
    }, {});
  }, [members]);

  // tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'anggota'>('overview');

  // motion variants
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.45 } },
    exit: { opacity: 0, y: -6, transition: { duration: shouldReduceMotion ? 0 : 0.25 } }
  };
  const listVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.04 } },
    exit: { opacity: 0, y: -8 }
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.28 } },
    exit: { opacity: 0, y: -6 }
  };

  if (loading) {
    // full-screen loader (kept accessible)
    return (
      <MainLayout isDark={isDark} title={`Detail Struktur ${namaBidang} Periode ${periode}`}>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className='flex justify-center items-center flex-col fixed z-[999] inset-0 bg-white dark:bg-gray-900 gap-3'>
          <img src='../../../images/logo.png' className="lg:w-1/4 w-[60%]" alt='logo' />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <p className="text-gray-700 dark:text-gray-300">Sedang Memuat Data...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) return <NotFound />;

  if (!struktur) {
    return <NotFound />;
  }

  return (
    <MainLayout isDark={isDark} title={`Detail Struktur ${namaBidang} Periode ${periode}`}>
      <Head>
        <title>{`Detail Struktur ${namaBidang} — GenBI Purwokerto`}</title>
        <meta name="description" content={`Detail struktur ${namaBidang} GenBI Purwokerto periode ${periode}. Lihat daftar anggota, jabatan, dan departemen.`} />
        <meta name="keywords" content="struktur, genbi, kepengurusan, purwokerto, organisasi" />
        <meta property="og:title" content={`Detail Struktur ${namaBidang} — GenBI Purwokerto`} />
        <meta property="og:description" content={struktur?.quote ?? `Struktur ${namaBidang} periode ${periode}`} />
        <meta property="og:image" content={struktur?.foto ? `${BASE_URL}/storage/${struktur.foto}` : 'https://genbipurwokerto.com/images/logo.png'} />
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

      {/* Page */}
      <motion.main
        className={isDark ? 'bg-gray-900 min-h-screen text-gray-100' : 'bg-gray-50 min-h-screen text-gray-900'}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <section className="md:py-20 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-12 lg:gap-10 items-start">
              {/* Left: image & quick info (sticky) */}
              <div className="order-1">
                <div className="md:sticky top-28 space-y-6">
                  <h1 className="text-3xl font-bold mb-2 text-center md:text-left">{struktur.jabatan}</h1>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={struktur.foto ? `${BASE_URL}/storage/${struktur.foto}` : '../../../images/NO IMAGE AVAILABLE.jpg'}
                      alt={struktur.jabatan}
                      className="w-full h-[450px] object-cover"
                    />
                  </div>

                  <div className="mt-4 text-center md:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nama Lengkap</p>
                    <p className="text-lg font-semibold">{struktur.nama_lengkap}</p>
                    {struktur.quote && (
                      <>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Quote</p>
                        <blockquote className="italic text-base mt-2">“{struktur.quote}”</blockquote>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: tabs and members */}
              <div className="order-2 col-span-2">
                {/* breadcrumb-like heading */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                  <h2 className="text-lg font-bold">{formattedBidang}</h2>
                  <span className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                </div>

                {/* Tabs */}
                <div className="mb-6" role="tablist" aria-label="Pilih tampilan">
                  <div className="inline-flex rounded-lg bg-transparent p-1 gap-1">
                    <button
                      role="tab"
                      aria-selected={activeTab === 'overview'}
                      onClick={() => setActiveTab('overview')}
                      className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                    >
                      Overview
                    </button>
                    <button
                      role="tab"
                      aria-selected={activeTab === 'anggota'}
                      onClick={() => setActiveTab('anggota')}
                      className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 ${activeTab === 'anggota' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                    >
                      Anggota ({members.length})
                    </button>
                  </div>
                </div>

                {/* Tab panels with AnimatePresence */}
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' ? (
                    <motion.section
                      key="overview"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={listVariants as any}
                      aria-live="polite"
                    >
                      <motion.div variants={itemVariant as any} className="prose max-w-none dark:prose-invert">
                        <h3 className="text-xl font-semibold mt-1">Deputi</h3>
                        <p className="text-lg">{struktur.nama_lengkap}</p>
                        <h3 className="text-xl font-semibold mt-6">Deskripsi</h3>
                        <div className="text-base leading-relaxed whitespace-pre-wrap">
                          {struktur.deskripsi ? <div dangerouslySetInnerHTML={{ __html: struktur.deskripsi }} /> : <p>{struktur.excerpt ?? 'Tidak ada deskripsi.'}</p>}
                        </div>
                      </motion.div>
                    </motion.section>
                  ) : (
                    <motion.section
                      key="anggota"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={listVariants as any}
                      aria-live="polite"
                    >
                      <motion.div variants={itemVariant as any}>
                        {/* If no members: show friendly message */}
                        {members.length === 0 ? (
                          <div role="status" className="p-6 bg-gray-100 dark:bg-gray-800 rounded">
                            <p className="text-gray-700 dark:text-gray-300">Belum ada anggota yang terdaftar untuk bidang ini.</p>
                          </div>
                        ) : (
                          Object.keys(groupedMembers).map((departemen, idx) => (
                            <motion.div key={departemen} className="mb-8" variants={itemVariant as any}>
                              <h4 className="text-lg font-semibold mb-3">{departemen}</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groupedMembers[departemen].map((m) => (
                                  <article key={m.id} className="p-4 rounded-lg border dark:border-gray-800 bg-white dark:bg-gray-850 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <p className="font-semibold">{m.nama}</p>
                                        {m.jabatan && <p className="text-sm text-gray-500 dark:text-gray-400">{m.jabatan}</p>}
                                    </div>
                                  </article>
                                ))}
                              </div>
                            </motion.div>
                          ))
                        )}
                      </motion.div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </main>
      </motion.main>

      {/* Inline skeleton/shimmer styles (simple and adapt to dark mode) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse { animation: none !important; }
        }
        .dark .bg-gray-850 { background-color: #111827; } /* slightly different card bg */
      `}</style>
    </MainLayout>
  );
};

export default DetailStruktur;
