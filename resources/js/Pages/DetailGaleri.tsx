import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaCalendar, FaMapMarkedAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from '@/Layouts/MainLayout';
import { changeDate } from './../Utils/changeDate';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Head } from "@inertiajs/react";
import { useTheme } from "@/Hooks/useTheme";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';
interface DetailGaleriProps {
  slug: string;
}

const shimmer = (w: number, h: number) => `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" version="1.1"><rect width="100%" height="100%" fill="#f3f3f3" /><defs><linearGradient id="g"><stop stop-color="#f3f3f3" offset="0%" /><stop stop-color="#ecebeb" offset="50%" /><stop stop-color="#f3f3f3" offset="100%" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)" /><animate attributeName="x" from="-100%" to="100%" dur="1.2s" repeatCount="indefinite"/></svg>`)};`

//@ts-ignore
const DetailGaleri: React.FC<DetailGaleriProps> = ({ slug }) => {
  const [galeri, setGaleri] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [openGaleri, setOpenGaleri] = useState(false);
  const [lightboxGaleri, setLightboxGaleri] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false); // avoid heavy SSR rendering
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'video'>('all');

  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      if (stored) return stored === 'dark';
      return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    } catch (e) {
      return false;
    }
  });

  // Sync theme
  useEffect(() => {
    if (!isClient) return;
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark, isClient]);

  // run only on client - prevents server from trying to load big images
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/galeri/${slug}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const result = await res.json();
      if (result.success && result.data) {
        const slides = (result.data.image_galeri || []).map((item: any) => ({ src: `${BASE_URL}/storage/${item.nama}` }));
        setLightboxGaleri(slides);
        setGaleri(result.data);
      } else {
        setError(result.message || 'Gagal memuat data');
      }
    } catch (err: any) {
      setError(err?.message || 'Fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isClient) return; // don't fetch on server side
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, slug]);

  // accessibility: skip link
  const topRef = useRef<HTMLDivElement | null>(null);


  if (error) return <MainLayout isDark={isDark} title="Galeri - Error"><p role="alert">Error: {error}</p></MainLayout>;

  // Skeleton + shimmer while loading or before hydration
  if (loading || !galeri) return (
    <MainLayout isDark={isDark} title="Memuat Galeri...">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <a href="#content" className="sr-only focus:not-sr-only block p-2">Skip to content</a>

      <div className="container mx-auto pb-20" aria-busy="true" aria-live="polite">
        {/* HERO SKELETON */}
        <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
          <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0" aria-hidden />

          {/* Left text block */}
          <div className="lg:col-span-3 order-2 lg:order-1 relative z-10 space-y-4">
            <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer" />
            </div>

            <div className="flex gap-6">
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
            </div>

            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
              <div className="h-3 w-11/12 rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
              <div className="h-3 w-10/12 rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
            </div>
          </div>

          {/* Right thumbnail */}
          <div className="md:py-8 py-0 pt-8 pb-3 lg:col-span-2 relative z-10 lg:order-2 order-1">
            <div className="w-full h-[200px] md:h-[350px] rounded-xl bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
        </div>

        {/* DESCRIPTION + FILTER BAR SKELETON */}
        <div className="md:px-20 px-5 mb-10">
          <div className="h-4 w-full max-w-4xl rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden mb-3"><div className="absolute inset-0 animate-shimmer" /></div>
          <div className="h-4 w-10/12 max-w-3xl rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>

          <div className="flex items-center gap-4 mt-8">
            <div className="h-10 w-36 rounded-lg bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
            <div className="ml-auto h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 relative overflow-hidden"><div className="absolute inset-0 animate-shimmer" /></div>
          </div>
        </div>

        {/* GRID GALLERY SKELETON */}
        <div className="grid lg:grid-cols-3 md:px-20 px-5 gap-10 mt-20 mb-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-full h-[300px] rounded-xl bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );



    // FILTERED GALLERY (memoized for animation + performance)
    const getFilteredGallery = () => {
        if (!galeri?.image_galeri) return [];

        if (filterType === 'all') return galeri.image_galeri;

        return galeri.image_galeri.filter((item: any) => {
            const file = (item.nama || '').toLowerCase();
            const isVideo =
                file.endsWith('.mp4') ||
                file.endsWith('.webm') ||
                file.endsWith('.mov');

            return filterType === 'video' ? isVideo : !isVideo;
        });
    };

    const filteredGallery = getFilteredGallery();


  // Helper: lightweight image component that uses thumbnail in lists and loads full size only on demand
  const GalleryImage: React.FC<{ item: any, index: number }> = ({ item, index }) => {
    const [loaded, setLoaded] = useState(false);
    const thumb = item.thumbnail || item.nama; // if API gives thumbnail field
    const srcThumb = thumb ? `${BASE_URL}/storage/${thumb}` : '../images/NO IMAGE AVAILABLE.jpg';
    const srcFull = item.nama ? `${BASE_URL}/storage/${item.nama}` : srcThumb;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35 }}
        key={index}
        onClick={() => setOpenGaleri(true)}
        className="cursor-pointer w-full h-[300px] rounded overflow-hidden"
        role="button"
        tabIndex={0}
        aria-label={`Buka gambar galeri ${index + 1}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenGaleri(true); }}
      >
        <img
          src={srcThumb}
          data-full={srcFull}
          loading="lazy"
          decoding="async"
          alt={item.keterangan || `Foto galeri ${index + 1}`}
          className={`w-full h-full object-cover transform transition-transform duration-500 ${loaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'}`}
          onLoad={() => setLoaded(true)}
          style={{minHeight: 200}}
        />
      </motion.div>
    );
  };

  // Page-level transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  };

  const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.5 };

  return (
    <MainLayout isDark={isDark} title={galeri.title ? galeri.title : "Detail Galeri"}>
      <Head>
        <meta name="description" content={`Lihat detail dari galeri ${galeri.title} — foto dan video yang mencatat momen berharga dari kegiatan GenBI Purwokerto.`} />
        <meta name="keywords" content="detail galeri, galeri genbi purwokerto, foto genbi purwokerto, video genbi purwokerto" />
        <meta property="og:title" content={`Detail Galeri ${galeri.title} - GenBI Purwokerto`} />
        <meta property="og:description" content={`Lihat detail dari galeri ${galeri.title} foto dan video GenBI Purwokerto.`} />
        <meta property="og:image" content={galeri.thumbnail ? `${BASE_URL}/storage/${galeri.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"} />
        <meta property="og:url" content={`${typeof window !== 'undefined' ? window.location.href : `${BASE_URL}/${slug}`}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <a href="#content" className="sr-only focus:not-sr-only block p-2">Skip to content</a>

      {/* Theme toggle */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          aria-pressed={isDark}
          onClick={() => setIsDark((s) => !s)}
          className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="pointer-events-none dark:text-white text-gray-900">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
          <div className={`w-10 h-6 rounded-full p-1 transition-all ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${isDark ? 'translate-x-4' : ''}`} />
          </div>
        </button>
      </div>

      <motion.main
        id="content"
        className="container mx-auto pb-20"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div ref={topRef} className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
          <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0" aria-hidden />

          <div className="lg:col-span-3 order-2 lg:order-1 relative z-10">
            <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl lg:text-left text-center mb-2 text-xl text-gray-900 dark:text-gray-200">
              {galeri.title}
            </h1>

            <div className="md:flex gap-10 md:mb-8 mb-4">
              <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                <FaMapMarkedAlt />
                <span>Tempat: {galeri.tempat || '-'}</span>
              </p>
              <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                <FaCalendar />
                <time dateTime={galeri.waktu}>{changeDate(new Date(galeri.waktu))}</time>
              </p>
            </div>

          </div>

          <div className="md:py-8 py-0 pt-8 pb-3 lg:col-span-2 relative z-10 lg:order-2 order-1">
            <img
              src={galeri.thumbnail ? `${BASE_URL}/storage/${galeri.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
              className="w-full h-[200px] md:h-[350px] rounded object-cover"
              alt={galeri.title || 'Thumbnail galeri'}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Controls: simple filter example with animated presence */}
        <div className="md:px-20 px-5">
            <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[15px] mb-5">{galeri.deskripsi}</p>

            {/* Controls: simple filter example with animated presence */}
            <div>
                <AnimatePresence mode="wait">
                    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-3 mb-6">
                        <label htmlFor="filter" className="sr-only">Filter tipe</label>

                        <select
                        id="filter"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as 'all' | 'photo' | 'video')}
                        className="rounded border px-3 py-2 bg-white dark:bg-gray-800 shadow-sm focus:outline-none cursor-pointer"
                        aria-label="Filter galeri"
                        >
                            <option value="all">Semua</option>
                            <option value="photo">Foto</option>
                            <option value="video">Video</option>
                        </select>

                        <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
                        Menampilkan: {filteredGallery.length}
                        </div>
                    </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        <main className="grid lg:grid-cols-3 md:px-20 px-5 gap-10 mt-20 mb-20">
          <AnimatePresence>
            {filteredGallery.length === 0 ? (
                <div className="col-span-full mt-16 flex flex-col items-center gap-6">
                    <img src="../images/kosong.svg" className="lg:w-[10%] w-[60%] h-auto" alt="Tidak ada dokumentasi" />
                    <h2 className="text-xl font-semibold text-red-500">Belum Ada Dokumentasi</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Tidak ada dokumentasi dengan tipe ini.</p>
                </div>
            ) : (
                filteredGallery.map((item: any, index: number) => (
                  <GalleryImage key={index} item={item} index={index} />
                ))
            )}
          </AnimatePresence>

          <Lightbox
            open={openGaleri}
            close={() => setOpenGaleri(false)}
            slides={lightboxGaleri}
            styles={{ container: { background: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)' } }}
          />
        </main>
      </motion.main>
    </MainLayout>
  );
};

export default DetailGaleri;
