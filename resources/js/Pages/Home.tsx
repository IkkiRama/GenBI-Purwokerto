import React, { Suspense, useEffect, useState, lazy } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { useTheme } from '@/Hooks/useTheme';
import {
  IconCalendar,
  IconPaper,
} from "@irsyadadl/paranoid";
import { FaCalendar, FaEye, FaMapMarkedAlt, FaUser } from 'react-icons/fa';
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { changeDate } from '@/Utils/changeDate';

// Lazy load larger components (improves initial bundle)
const Hero = lazy(() => import('@/Components/Hero'));
const AboutSection = lazy(() => import('@/Components/AboutSection'));
const GenBIPointSection = lazy(() => import('@/Components/GenBIPointSection'));

// Respect reduced motion preference
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);
  return reduced;
};

// Small accessible skeletons used during lazy load / fetch
const SkeletonCard: React.FC<{ lines?: number; height?: string }> = ({ lines = 3, height = 'h-48' }) => (
  <div aria-hidden className={`animate-pulse bg-white/5 rounded-md p-4 ${height}`}>
    <div className="bg-white/10 rounded h-2 w-2/5 mb-4" />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="bg-white/8 rounded h-3 mb-2 w-full" />
    ))}
  </div>
);

const LoadingInline: React.FC = () => (
  <div role="status" aria-live="polite" className="flex items-center gap-3">
    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="80" strokeDashoffset="60" />
    </svg>
    <span className="sr-only">Memuat...</span>
    <span>Memuat...</span>
  </div>
);

// Helper: fetch wrapper with abort
const apiFetch = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' }, signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export default function Home() {
    // use existing project hook if available
  const themeHook = useTheme() as any; // keep flexible shape
  // determine initial theme: prefer hook, then localStorage, then document
  const initialFromHook = themeHook && typeof themeHook.isDark !== 'undefined' ? themeHook.isDark : undefined;
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof initialFromHook !== 'undefined') return initialFromHook;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });


  // Tab states
  const [tabActive, setTabActive] = useState<'news' | 'event'>('news');
  const [moreNews, setMoreNews] = useState(false);

  // data
  const [artikel, setArtikel] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any[]>([]);
  const [artikelPalingBaru, setArtikelPalingBaru] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string || '';

  const reducedMotion = usePrefersReducedMotion();

  // accessibility: skip to content
  useEffect(() => {
    const skip = document.getElementById('skip-to-content');
    skip?.addEventListener('click', () => {
      const main = document.getElementById('main-content');
      main?.focus();
    });
  }, []);

  // sync theme
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (themeHook && typeof themeHook.setTheme === 'function') themeHook.setTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Fetch with abort controller and small validations
  useEffect(() => {
    const ac = new AbortController();
    let mounted = true;

    (async () => {
      try {
        const art = await apiFetch(`${BASE_URL}/api/artikel/homeArtikel`, ac.signal);
        if (!mounted) return;
        if (art?.success && Array.isArray(art.data)) {
          setArtikelPalingBaru(art.data.slice(0, 1));
          setArtikel(art.data.slice(1));
        } else {
          throw new Error('Data artikel tidak valid');
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError(String(err.message || err));
      }
    })();

    (async () => {
      try {
        const ev = await apiFetch(`${BASE_URL}/api/event/homeEvent`, ac.signal);
        if (!mounted) return;
        if (ev?.success && Array.isArray(ev.data)) setEventData(ev.data);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error(err);
        setError((e) => e || String(err.message || err));
      }
    })();

    return () => {
      mounted = false;
      ac.abort();
    };
  }, [BASE_URL]);

  // Loading guard
  const isLoading = (!artikelPalingBaru || artikelPalingBaru.length === 0) && artikel.length === 0 && eventData.length === 0 && !error;

  // Light-touch framer-motion variants (disabled if prefers-reduced-motion)
  const fadeIn = reducedMotion ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

  // Remove scroll indicator requirement (as requested)

  return (
    <MainLayout isDark={isDark}>
      <Head>
        <title>GenBI Purwokerto - Generasi Baru Indonesia</title>
        <meta name="description" content="GenBI Purwokerto, komunitas penerima beasiswa Bank Indonesia — kegiatan, program, dan kontribusi untuk generasi muda." />
        {/* JSON-LD structured data to help SEO (site + org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'GenBI Purwokerto',
            url: 'https://genbipurwokerto.com',
            logo: 'https://genbipurwokerto.com/images/logo.png',
          })}
        </script>
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Accessibility: skip link */}
      <a id="skip-to-content" className="sr-only focus:not-sr-only focus:absolute top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded">
        Skip to content
      </a>

      {/* Theme toggle (accessible) */}
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

      {/* Main content */}
      <main id="main-content" tabIndex={-1}>
        {/* Hero (lazy) */}
        <Suspense fallback={<div className="container mx-auto px-4 py-20"><SkeletonCard /></div>}>
          <Hero />
        </Suspense>

        {/* About (lazy) */}
        <Suspense fallback={<div className="container mx-auto px-4 py-12"><SkeletonCard lines={4} height="h-36" /></div>}>
          <AboutSection isDark={isDark} />
        </Suspense>

        {/* GenBI Point (lazy) */}
        <Suspense fallback={<div className="container mx-auto px-4 py-12"><SkeletonCard /></div>}>
          <GenBIPointSection isDark={isDark} />
        </Suspense>

        {/* Tabs: News / Event */}
        <section aria-labelledby="news-event-heading">
          <div className={`mx-auto flex max-w-[1700px] space-x-[1px] lg:justify-center lg:space-x-6 ${
            isDark
                ? 'bg-gradient-to-br from-blue-950/20 bg-gray-900 to-gray-950/20'
                : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
            }`}>
            <button
              className={[ tabActive === 'news' ? 'bg-blue-600 flex-1 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100' , ' flex items-center px-4 py-3 text-sm font-semibold transition-colors md:text-base lg:rounded-t-xl lg:px-6  lg:flex-[unset]'].join('')}
              onClick={() => setTabActive('news')}
              aria-pressed={tabActive === 'news'}
            >
              <div className="relative h-6 w-6 lg:h-9 lg:w-9">
                <IconPaper className="w-[30px] h-[30px]" />
              </div>
              <span className="ml-3 lg:ml-4 inline">Berita</span>
            </button>

            <button
              className={[ tabActive !== 'news' ? 'bg-blue-600 flex-1 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100' , ' flex items-center px-4 py-3 text-sm font-semibold transition-colors md:text-base lg:rounded-t-xl lg:px-6  lg:flex-[unset]'].join('')}
              onClick={() => setTabActive('event')}
              aria-pressed={tabActive === 'event'}
            >
              <div className="relative h-6 w-6 lg:h-9 lg:w-9">
                <IconCalendar className="w-[30px] h-[30px]" />
              </div>
              <span className="ml-3 lg:ml-4 inline">Event</span>
            </button>

          </div>

          <section className="bg-blue-600 flex justify-center" aria-live="polite">
            {isLoading ? (
              <div className="max-w-[1700px] w-full px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            ) : error ? (
              <div role="alert" className="p-6 text-red-600">
                Error: {error}
              </div>
            ) : tabActive === 'news' ? (
              <div className="max-w-[1700px] w-full">
                {artikelPalingBaru.map((item:any, index:any) => (
                  <Link href={`/artikel/${item.slug}`} key={index} aria-label={`Buka artikel ${item.title}`}>
                    <motion.div {...(!reducedMotion ? fadeIn : {})} className="grid lg:grid-cols-5 gap-10 items-center lg:px-20 md:px-10 px-4 pt-10">
                      <div className="h-[200px] md:h-[350px] w-full rounded-md overflow-hidden lg:col-span-2">
                        <img
                          src={item.thumbnail ? BASE_URL+`/storage/${item.thumbnail}` : '/images/NO IMAGE AVAILABLE.jpg'}
                          alt={item.title}
                          loading="lazy"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="lg:col-span-3">
                        <h3 className="text-white font-semibold md:mb-5 mb-3 md:text-base text-sm uppercase">{item.kategori_artikel?.nama}</h3>
                        <h2 className="uppercase font-bold md:text-3xl text-xl text-white ">{item.title}</h2>
                        <p className="mt-5 md:text-base text-[12px] text-white line-clamp-4">{item.excerpt}</p>
                        <div className="flex gap-5 mt-10 text-white md:text-base text-sm">
                          <span className="hidden md:flex gap-2 items-center"><FaEye /><small>{item.views} kali dilihat</small></span>
                          <span className="flex gap-2 items-center"><FaCalendar /><small>{changeDate(new Date(item.published_at))}</small></span>
                          <span className="flex gap-2 items-center"><FaUser /><small>Penulis : {item.user?.name}</small></span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                <AnimatePresence>
                  {moreNews ? (
                    <motion.div key="more" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 md:px-20 mt-10">
                      <motion.section className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10">
                        {artikel.map((item, idx) => (
                          <motion.div key={idx} className="mt-5">
                            <img src={item.thumbnail ? BASE_URL+`/storage/${item.thumbnail}` : '/images/NO IMAGE AVAILABLE.jpg'} alt={item.title} loading="lazy" className="h-[200px] sm:h-[250px] object-cover w-full rounded" />

                            <Link href={`/artikel/${item.slug}`}>
                              <h3 className="mt-3 text-xl font-bold text-white line-clamp-2">{item.title}</h3>
                            </Link>
                            <div className="my-3 md:my-5 flex gap-5">
                              <span className="flex gap-2 items-center text-white"><FaUser /><small>{item.user?.name}</small></span>
                              <span className="flex gap-2 items-center text-white"><FaCalendar /><small>{changeDate(new Date(item.published_at))}</small></span>
                            </div>
                            <p className="text-white line-clamp-4 mt-2 text-sm">{item.excerpt}</p>
                          </motion.div>
                        ))}
                      </motion.section>

                      <div className="flex flex-wrap justify-center text-center pb-10 ">
                        <button className="w-full sm:w-[unset] mx-3 sm:mx-0 bg-white border-2 border-white hover:bg-slate-200 hover:border-blue-400 text-blue-600 text-sm sm:px-5 py-2 mt-10 rounded-full inline-flex items-center justify-center sm:gap-2 " onClick={() => setMoreNews(false)}>
                          {"Lebih Sedikit"}
                          <MdKeyboardDoubleArrowUp className="ml-5" />
                        </button>
                        <Link href={'/artikel'} className="w-full sm:w-[unset] mx-3 sm:mx-0 border-2 border-white hover:bg-white text-white hover:text-blue-600 text-sm sm:px-5 py-2 mt-10 rounded-full inline-flex items-center sm:gap-2 justify-center md:ml-5">
                          {"Semua Berita"}
                          <MdKeyboardDoubleArrowRight className="ml-5" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center pb-10 lg:block">
                      <button className="bg-white hover:bg-blue-400 text-blue-600 mx-auto text-sm px-5 py-2 mt-10 rounded-full inline-flex items-center gap-2" onClick={() => setMoreNews(true)}>
                        {"Lihat Lainnya"}
                        <MdKeyboardDoubleArrowDown />
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="max-w-[1700px] py-10 lg:px-10 px-3 grid lg:grid-cols-3 grid-cols-1 gap-0 md:gap-10 items-center">
                {eventData.length === 0 ? (
                  <div className="col-span-3">
                    <p>Tidak ada event terjadwal.</p>
                  </div>
                ) : eventData.map((item, index) => (
                  <Link key={index} href={`/event/${item.slug}`} className="bg-white rounded-lg shadow-sm mb-5 md:mb-0 hover:shadow-lg transition-shadow" aria-label={`Buka event ${item.nama}`}>
                    <img src={item.image ? BASE_URL+`/storage/${item.image}` : '/images/NO IMAGE AVAILABLE.jpg'} alt={item.nama} loading="lazy" className="w-full h-[200px] md:h-[270px] object-cover rounded-lg mb-8" />
                    <h2 className={`px-4 text-lg font-bold mb-2`}>{item.nama}</h2>
                    <p className="px-4 text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.excerpt}</p>
                    <div className="mt-5 md:flex gap-10 px-4 pb-4">
                      <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 items-center"><FaMapMarkedAlt /><span>{item.tempat}</span></p>
                      <p className="flex gap-2 text-sm text-gray-600 items-center"><FaCalendar /><span>{changeDate(new Date(item.tanggal))}</span></p>
                    </div>
                    <div className={`p-5 rounded-b-lg text-center ${item.status === 'Event Sudah Berakhir' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                      <p className={`dark:text-gray-300 lg:text-base md:text-sm text-[12px] font-semibold`}>{item.status}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </section>

        {/* Company profile video: lazy iframe and respects reduced motion */}
        <section className="py-20 px-4 relative">
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-blue-950/20 bg-gray-900 to-gray-950/20' : 'bg-gradient-to-br from-transparent bg-white to-transparent'}`} />
          <div className="container mx-auto relative z-10">
            <motion.div {...(!reducedMotion ? fadeIn : {})} className="text-center mb-16">
              <h2 className={`md:text-4xl text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>COMPANY PROFILE</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4" />
            </motion.div>

            <motion.div {...(!reducedMotion ? fadeIn : {})} className="max-w-4xl mx-auto">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl p-4 ${isDark ? 'bg-gray-800/70 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm'}`}>
                <div className="aspect-video relative">
                  {/* Use lazy loading for iframe; some browsers do not honor loading for iframes - keep a noscript fallback */}
                  <iframe loading="lazy" className="w-full h-full rounded-lg bg-slate-500" src="https://www.youtube.com/embed/x7xMqTNOR9Y" title="Company Profile GENBI Purwokerto" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <a href="https://youtu.be/x7xMqTNOR9Y?si=rFrrHlFUYYwGGKAT" target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${isDark ? 'bg-blue-600 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                    <Play size={20} />
                    <span>Tonton di YouTube</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Noscript friendly content notice for crawlers / accessibility */}
      <noscript>
        <div className="p-4 bg-yellow-50 text-yellow-900">JavaScript dibutuhkan agar pengalaman terbaik dapat ditampilkan. Namun konten dasar masih dapat diakses.</div>
      </noscript>
    </MainLayout>
  );
}


