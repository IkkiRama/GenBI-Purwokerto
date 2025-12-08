import MainLayout from '@/Layouts/MainLayout';
import React, { useState, useEffect, useMemo } from 'react';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Head, Link } from '@inertiajs/react';
import { useTheme } from '@/Hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailEventProps {
  slug: string;
}

// ===== ANIMATION VARIANTS =====
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' } }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } }
};

const cardMotion = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

// Shimmer CSS (Tailwind-friendly utility classes expected in project)
const shimmerStyles = `
  bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
  animate-shimmer
`;

//@ts-ignore
const DetailEvent: React.FC<DetailEventProps> = ({ slug }) => {
  const [event, setEvent] = useState<any>();
  const [pemateri, setPemateri] = useState<any[]>([]);
  const [rekomendasiEvent, setRekomendasiEvent] = useState<any[]>([]);

  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingRekomendasiEvent, setLoadingRekomendasiEvent] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [isEventExpired, setIsEventExpired] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  const themeHook = useTheme();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : false;
  });

  // ===== SYNC DARK MODE =====
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  // ===== FETCH DATA =====
  const fetchData = async () => {
    setLoadingEvent(true)
    try {
        const res = await fetch(BASE_URL+`/api/event/${slug}`);
        const json = await res.json();
        if (json.success) {
            setEvent(json.data);
            setPemateri(json.data.pemateri || []);
            const expired = new Date() > new Date(json.data.tanggal);
            setIsEventExpired(expired);
        }
    } catch (err: any) {
        setError(err.message);
    }
    setLoadingEvent(false)
  };

  const fetchRekomendasi = async () => {
    setLoadingRekomendasiEvent(true)
    const res = await fetch(BASE_URL+`/api/event/rekomendasiEvent`);
    const json = await res.json();
    if (json.success) setRekomendasiEvent(json.data);
    setLoadingRekomendasiEvent(false)
  };

  useEffect(() => {
    fetchData();
    fetchRekomendasi();
  }, [slug]);


  // ===== EVENT CONTENT RENDERER =====
  const EventContent = ({ content }: { content: string }) => (
    <div
      className="content-artikel text-gray-800 dark:text-gray-300"
      style={{ lineHeight: 1.7, fontSize: 16 }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );

  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <MainLayout isDark={isDark} title={event?.nama ?? 'Detail Event'}>
      <Head>
        <title>{event?.nama}</title>
        <meta name="description" content={event?.excerpt} />
        <meta property="og:title" content={event?.nama} />
        <meta property="og:description" content={event?.excerpt} />
        <meta property="og:image" content={event?.image ? BASE_URL+`/storage/${event.image}` : '../images/NO IMAGE AVAILABLE.jpg'} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>

        {/* MODAL */}
        {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[999999999999]">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-bold text-red-500">Event Sudah Berakhir</h3>
                    <p className="mt-2">Pendaftaran untuk event ini sudah ditutup. Terima kasih telah mengunjungi halaman ini.</p>
                    <button
                        onClick={() => setShowModal(false)}
                        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        )}

      {/* THEME TOGGLE */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          onClick={() => setIsDark(s => !s)}
          className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text dark:text-white text-gray-900 font-semibold"
        >
          {isDark ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>

      {/* PAGE TRANSITION */}
      <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>
        <main className="container mx-auto pb-20">

          {/* ===== HERO ===== */}
          <section className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 bg-gray-100 dark:bg-gray-950 rounded-lg mb-10 gap-5 items-center relative overflow-hidden">
            <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0" aria-hidden />

            <div className="lg:col-span-3">
              {loadingEvent ? (
                <div className="space-y-3">
                  <div className="skeleton-title w-2/3 h-8" />
                  <div className="skeleton-paragraph w-full h-4" />
                  <div className="skeleton-block h-10 w-full rounded mt-6" />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{event.nama}</h1>
                  <div className="flex gap-6 mt-4 text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-2"><FaMapMarkedAlt /> {event.tempat}</span>
                    <span className="flex items-center gap-2">
                      <FaCalendar />
                      <time dateTime={event.tanggal}>{changeDate(new Date(event.tanggal))}</time>
                    </span>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">{event.excerpt}</p>
                </>
              )}
            </div>

            <div className="py-4 md:py-8 lg:col-span-2 relative z-10 lg:order-2 order-1">
              {loadingEvent ? (
                <div className="w-full h-[200px] md:h-[350px] rounded overflow-hidden">
                  <div className="skeleton-image w-full h-full rounded" aria-hidden />
                </div>
              ) : (
                <img
                  src={event?.thumbnail ? BASE_URL+`/storage/${event.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                  className="w-full h-[200px] md:h-[350px] rounded object-cover"
                  alt={event?.title ?? 'Thumbnail event'}
                />
              )}
            </div>
          </section>

          {/* ===== CONTENT + SIDEBAR ===== */}
          <section className="grid lg:grid-cols-3 gap-10 md:px-20 px-4">

            {/* MAIN CONTENT */}
            <article className="lg:col-span-2 prose dark:prose-invert max-w-none">
              {loadingEvent ? (
                <div className="space-y-4">
                  <div className="skeleton-paragraph h-4 w-full" />
                  <div className="skeleton-paragraph h-4 w-5/6" />
                  <div className="skeleton-block h-64" />
                </div>
              ) : (
                <EventContent content={event.deskripsi} />
              )}

              {/* PEMATERI */}
              <h3 className="text-xl font-bold mt-10">Pemateri</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
                {pemateri.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                  >
                    <img
                      src={p.gambar ? BASE_URL+`/storage/${p.gambar}` : '../images/NO IMAGE AVAILABLE.jpg'}
                      className="w-[120px] h-[120px] rounded-full object-cover mx-auto"
                      alt={p.nama}
                    />
                    <p className="mt-2 font-semibold">{p.nama}</p>
                  </motion.div>
                ))}
              </div>
            </article>

            {/* SIDEBAR */}
            <aside className="md:sticky md:top-24 self-start">
              <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 p-5 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">Tentang Event</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>Tempat</span><span>{event?.tempat}</span></li>
                  <li className="flex justify-between"><span>Waktu</span><span>{event && changeDate(new Date(event.tanggal))}</span></li>
                  <li className="flex justify-between"><span>Pemateri</span><span>{pemateri.length}</span></li>
                </ul>

                {!isEventExpired ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={event?.cta}
                    className="block mt-6 bg-blue-600 text-white text-center py-2 rounded"
                  >
                    Daftar
                  </a>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="block mt-6 bg-red-600 text-white w-full py-2 rounded"
                  >
                    Event Berakhir
                  </button>
                )}
              </div>
            </aside>
          </section>

          {/* ===== TAB + ANIMATED REKOMENDASI ===== */}
          <section className="mt-20 md:px-20 px-4">
            <h2 className="text-xl sm:text-2xl font-semibold mb-10 text-gray-800 dark:text-gray-200">Rekomendasi Event</h2>

            {loadingRekomendasiEvent ? (
                <section aria-busy="true" className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:px-10 px-3 animate-pulse">
                    {Array.from({ length: 3 }).map((_, i) => (
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
                <AnimatePresence mode="wait">
                  <motion.section
                    key={1}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.28 } }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                    className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:px-10 px-3"
                    aria-live="polite"
                  >
                    {rekomendasiEvent.map((item, i) => (
                        <motion.article key={item.id || i} {...cardMotion} layout className={`rounded-lg overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                            <Link href={`/event/${item.slug}`} aria-label={`Buka detail event ${item.nama}`} className="block">
                                <img src={item.image ? `${BASE_URL}/storage/${item.image}` : '../images/NO IMAGE AVAILABLE.jpg'} alt={item.nama || 'Event image'} className="w-full h-48 object-cover rounded-t-lg" />

                                <div className="p-4">
                                <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">{item.nama}</h2>
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
                    ))}
                  </motion.section>
                </AnimatePresence>
            )}

          </section>

        </main>

        {/* ===== SHIMMER SKELETON ===== */}
        <style>{`
          .skeleton-title,.skeleton-paragraph,.skeleton-image,.skeleton-block{
            background: linear-gradient(90deg,#e6e6e6,#f3f3f3,#e6e6e6);
            animation: shimmer 1.3s infinite;
            border-radius:8px;
          }
          .skeleton-image{height:300px}
          .skeleton-block{height:200px}
          @keyframes shimmer{
            0%{background-position:-400px 0}
            100%{background-position:400px 0}
          }
          .dark .skeleton-title,.dark .skeleton-paragraph,.dark .skeleton-image,.dark .skeleton-block{
            filter:brightness(.7)
          }
        `}</style>

      </motion.div>
    </MainLayout>
  );
};

export default DetailEvent;
