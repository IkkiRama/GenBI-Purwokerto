import React, { useEffect, useState, useMemo } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from '@/Layouts/MainLayout';
import { estimateReadingTime } from "@/Utils/estimateReadingTime";
import { changeDate } from './../Utils/changeDate';
import { Head, Link } from "@inertiajs/react";

import ShareButton from "@/Components/ShareButton";
import { getRandomColor } from "@/Utils/getRandomColor";
import { useTheme } from "@/Hooks/useTheme";

// --- NOTE ---
// This file is an enhanced version of your DetailArtikel component.
// Additions made:
// 1. Page transition using framer-motion
// 2. Shimmer gradient skeletons (article + cards)
// 3. Tab/filter UI with animated list transitions (AnimatePresence)
// 4. Improved dark-mode handling & prefers-color-scheme fallback
// 5. Accessibility improvements: proper roles, aria-* attributes, live regions
// 6. Small SEO/accessibility tweaks: semantic tags, <time> element, alt text, form aria labels
// 7. Minor performance: useMemo where appropriate and defensive checks

interface DetailArtikelProps {
  slug: string;
}

interface ArtikelType {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  thumbnail?: string | null;
  keyword?: string;
  updated_at?: string;
  published_at?: string;
  kategori_artikel?: { nama: string };
  user?: { name: string; foto?: string | null; deskripsi?: string };
  komentar?: Array<{ nama: string; email: string; komentar: string }>;
  slug?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: 'easeIn' } }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.25 } }
};

//@ts-ignore
const DetailArtikel: React.FC<DetailArtikelProps> = ({ slug }) => {
  const [artikel, setArtikel] = useState<ArtikelType | undefined>();
  const [komentar, setKomentar] = useState<Array<any>>([]);
  const [artikelRandom, setArtikelRandom] = useState<Array<ArtikelType>>([]);
  const [error, setError] = useState<string | null>(null);
  const [errorRandomArtikel, setErrorRandomArtikel] = useState<string | null>(null);
  const [artikelTerbaru, setArtikelTerbaru] = useState<Array<ArtikelType>>([]);
  const [errorArtikelTerbaru, setErrorArtikelTerbaru] = useState<string | null>(null);


  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [komen, setKomen] = useState("");
  const [komenEror, setKomenEror] = useState("");
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [warnaProfile] = useState(getRandomColor());

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';


  const themeHook = useTheme();
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return prefersDark;
  });

  // Tabs: 'terbaru' | 'rekomendasi' (animated)
  const [activeTab, setActiveTab] = useState<'terbaru' | 'rekomendasi'>('terbaru');

  // Sync theme
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Defensive fetch helpers
  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL+`/api/artikel/${slug}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      if (result.success) {
        setArtikel(result.data);
        setKomentar(result.data.komentar || []);
      } else {
        setError(result.message || 'Unknown error');
      }
    } catch (err: any) {
      setError(err?.message || 'Fetch error');
      console.error(err);
    }
  };

    const fetchArtikelTerbaru = async () => {
        try {
            const response = await fetch(
            BASE_URL + "/api/artikel/artikelTerbaruDetailArtikel"
            );

            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
            setArtikelTerbaru(result.data || []);
            } else {
            setErrorArtikelTerbaru(result.message || "Unknown error");
            }
        } catch (err: any) {
            setErrorArtikelTerbaru(err?.message || "Fetch error");
            console.error(err);
        }
    };


  const fetchDataRandom = async () => {
    try {
      const responseRandomArtikel = await fetch(BASE_URL+"/api/artikel/rekomendasi-per-page");
      if (!responseRandomArtikel.ok) throw new Error(`HTTP error! Status: ${responseRandomArtikel.status}`);
      const resultRandomArtikel = await responseRandomArtikel.json();
      if (resultRandomArtikel.success) setArtikelRandom(resultRandomArtikel.data || []);
      else setErrorRandomArtikel(resultRandomArtikel.message || 'Unknown error');
    } catch (err: any) {
      setErrorRandomArtikel(err?.message || 'Fetch error');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataRandom();
    fetchArtikelTerbaru();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // small helpers
  const getInitials = (namaStr: string) => {
    if (!namaStr) return 'NN';
    const words = namaStr.trim().split(/\s+/);
    const initials = words.map(w => w[0]?.toUpperCase() ?? '').join('');
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingKomen(true);
    setKomenEror("");
    setSuccessMessage("");

    try {
      if (!nama.trim()) throw new Error("Nama tidak boleh kosong.");
      if (!email.trim()) throw new Error("Email tidak boleh kosong.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Format email tidak valid.");
      if (!komen.trim()) throw new Error("Komentar tidak boleh kosong.");

      const response = await fetch(BASE_URL+'/api/komen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artikel_id: artikel?.id, nama, email, komentar: komen }),
      });

      if (!response.ok) throw new Error('Gagal mengirim komentar, coba lagi nanti.');

      setSuccessMessage('Komentar Anda berhasil dikirim!');
      setNama(""); setEmail(""); setKomen("");
      await fetchData();
    } catch (err: any) {
      setKomenEror(err?.message || 'Terjadi kesalahan.');
    } finally {
      setLoadingKomen(false);
    }
  };

  // small memoized values for performance
  const readingMinutes = useMemo(() => artikel ? estimateReadingTime(artikel.content) : 0, [artikel]);

  // Render skeleton if loading
  const loadingMain = !artikel;
  const loadingList = artikelRandom.length === 0;

  if (error || errorRandomArtikel) return <p role="alert">Error: {error || errorRandomArtikel}</p>;

  return (
    <MainLayout isDark={isDark} title={artikel?.title ?? "Detail Artikel"}>

      <Head>
        <meta name="description" content={artikel?.excerpt ?? 'Artikel GenBI Purwokerto'} />
        <meta name="keywords" content={artikel?.keyword ?? ''} />
        <meta property="og:title" content={artikel?.title ?? 'Detail Artikel - GenBI Purwokerto'} />
        <meta property="og:description" content={artikel?.excerpt ?? ''} />
        <meta property="og:image" content={artikel?.thumbnail ? BASE_URL+`/storage/${artikel.thumbnail}` : '../images/NO IMAGE AVAILABLE.jpg'} />
        <meta property="og:url" content={`https://genbipurwokerto.com/${slug}`} />
      </Head>

      {/* Page transition wrapper */}
      <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>

        {/* Theme toggle */}
        <div className="fixed right-5 bottom-24 z-50">
          <button
            aria-label="Toggle theme"
            aria-pressed={isDark}
            onClick={() => setIsDark(s => !s)}
            className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
          </button>
        </div>

        <main className="container mx-auto pb-20">

          {/* HERO */}
          <section className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative rounded-lg overflow-hidden">
            <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0" aria-hidden />

            <div className="lg:col-span-3 order-2 lg:order-1 relative z-10 lg:text-left text-center py-6">
                {loadingMain ? (
                    <div>
                        <div className="skeleton-title h-8 w-1/4 mb-4" />
                        <div className="skeleton-title h-8 w-3/4 mb-4" />
                        <div className="skeleton-paragraph h-4 w-full mb-2" />
                        <div className="skeleton-paragraph h-4 w-full mb-2" />
                    </div>
                ) : (
                    <>
                        <p className="font-semibold mb-2 text-blue-700 md:md:text-base text-[13px] text-sm">
                            {artikel?.kategori_artikel?.nama ?? 'Umum'}
                        </p>
                        <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl text-xl mb-4 text-gray-900 dark:text-gray-200 h-auto">
                            {artikel?.title ?? (<span className="inline-block align-middle">&nbsp;</span>)}
                        </h1>

                        <p className="mr-3 md:text-sm text-[12px] text-gray-800 dark:text-gray-300">
                            Ditulis oleh <span className="text-blue-700 font-semibold">{artikel?.user?.name ?? '—'}</span>
                            <span className="text-gray-500 dark:text-gray-400 italic"> | Diperbaharui pada {' '}
                            <time dateTime={artikel?.updated_at ?? ''}>{artikel?.updated_at ? changeDate(new Date(artikel.updated_at)) : '-'}</time>
                            </span>
                        </p>

                        <p className="mr-3 text-sm text-gray-800 dark:text-gray-300">
                            Diterbitkan pada {' '}
                            <time dateTime={artikel?.published_at ?? ''}>{artikel?.published_at ? changeDate(new Date(artikel.published_at)) : '-'}</time>
                            {' '}| {readingMinutes} Menit Baca
                        </p>
                    </>
                )}
            </div>

            <div className="py-4 md:py-8 lg:col-span-2 relative z-10 lg:order-2 order-1 lg:ml-5">
              {/* hero image with skeleton fallback */}
              {loadingMain ? (
                <div className="w-full h-[200px] md:h-[350px] rounded overflow-hidden">
                  <div className="skeleton-image w-full h-full rounded" aria-hidden />
                </div>
              ) : (
                <img
                  src={artikel?.thumbnail ? BASE_URL+`/storage/${artikel.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                  className="w-full h-[200px] md:h-[350px] rounded object-cover"
                  alt={artikel?.title ?? 'Thumbnail artikel'}
                />
              )}
            </div>
          </section>

          {/* content + sidebar */}
          <section>
            <section className="grid grid-cols-1 lg:grid-cols-3 md:px-20 px-4 md:gap-20 md:mt-20 md:mb-20 mx-auto">
                <article className="lg:col-span-2 text-gray-800 dark:text-gray-200 prose max-w-none">

                {/* Article content or skeleton */}
                {loadingMain ? (
                    <div>
                    <div className="skeleton-title h-8 w-3/4 mb-4" />
                    <div className="skeleton-paragraph h-4 w-full mb-2" />
                    <div className="skeleton-paragraph h-4 w-full mb-2" />
                    <div className="skeleton-paragraph h-4 w-5/6 mb-2" />
                    <div className="skeleton-block h-60 w-full rounded mt-6" />
                    </div>
                ) : (
                    <div>
                    <div
                        className="content-artikel"
                        dangerouslySetInnerHTML={{ __html: artikel?.content ?? '' }}
                        style={{ lineHeight: 1.6, fontSize: 16 }}
                    />

                    <div className="mt-6">
                        <ShareButton />
                    </div>
                    </div>
                )}

                {/* Komentar */}
                <hr className="my-8" />
                <h2 className="text-2xl font-semibold mb-4">KOMENTAR</h2>

                <div aria-live="polite" className="mb-4">
                    {komentar.length === 0 && <p className="text-sm text-gray-500">Belum ada komentar.</p>}

                    {komentar.map((item, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                        <div className="flex items-center mb-2">
                            <div className={`w-[50px] h-[50px] text-white flex items-center justify-center rounded-full mr-3 ${warnaProfile}`}>
                                <span className="font-bold">{getInitials(item.nama)}</span>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold">{item.nama}</h4>

                                <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">{item.email}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] whitespace-pre-wrap">{item.komentar}</p>
                    </motion.div>
                    ))}
                </div>

                {/* Form Komentar */}
                <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg" aria-label="Form komentar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nama</label>

                            <input id="nama" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama Anda" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-800" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>

                            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email Anda" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-800" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="komentar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Komentar</label>

                        <textarea id="komentar" name="komentar" value={komen} onChange={(e) => setKomen(e.target.value)} placeholder="Tulis komentar Anda..." rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"></textarea>
                    </div>

                    <button disabled={loadingKomen} type="submit" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition" aria-disabled={loadingKomen}>
                        {loadingKomen ? 'Mengirim...' : 'Kirim Komentar'}
                    </button>

                    {komenEror && <p role="alert" className="text-red-500 mt-2">{komenEror}</p>}
                    {successMessage && <p role="status" className="text-green-500 mt-2">{successMessage}</p>}
                </form>

                </article>

                {/* RIGHT SIDEBAR */}
                <aside className="md:sticky md:top-24 self-start">
                <div className="bg-gray-100 dark:bg-gray-900 shadow-md lg:p-6 p-4 rounded mb-6">
                    {loadingMain ? (
                    <div className="flex items-center gap-4">
                        <div className="skeleton-avatar w-[70px] h-[70px] rounded" />
                        <div className="flex-1">
                        <div className="skeleton-title h-6 w-2/3 mb-2" />
                        <div className="skeleton-paragraph h-3 w-full" />
                        </div>
                    </div>
                    ) : (
                    <div>
                        <img src={artikel?.user?.foto ? BASE_URL+`/storage/${artikel.user.foto}` : '../images/NO IMAGE AVAILABLE.jpg'} alt={`${artikel?.user?.name ?? 'Author'} avatar`} className="w-[70px] rounded" />
                        <h3 className="font-bold mt-4 text-gray-800 dark:text-gray-300">{artikel?.user?.name}</h3>
                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">{artikel?.user?.deskripsi}</p>
                    </div>
                    )}
                </div>

                {/* Tabs for rekomendasi / terbaru */}
                <div className="bg-gray-100 dark:bg-gray-900 shadow-md p-4 rounded">
                    <div role="tablist" aria-label="Filter artikel" className="flex gap-2 mb-4">
                    <button role="tab" aria-selected={activeTab === 'terbaru'} onClick={() => setActiveTab('terbaru')} className={`px-3 py-2 rounded ${activeTab === 'terbaru' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300'} focus:outline-none focus:ring-2`}>Terbaru</button>
                    <button role="tab" aria-selected={activeTab === 'rekomendasi'} onClick={() => setActiveTab('rekomendasi')} className={`px-3 py-2 rounded ${activeTab === 'rekomendasi' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300'} focus:outline-none focus:ring-2`}>Rekomendasi</button>
                    </div>

                    {/* Animated list switch */}
                    <div>
                    <AnimatePresence mode="wait">
                        {activeTab === 'terbaru' ? (
                        <motion.ul key="terbaru" initial="hidden" animate="visible" exit="exit">
                            {/* show latest articles (we'll reuse artikelRandom as fallback) */}
                            {(artikelTerbaru.length === 0) ? (
                            <div className="space-y-3">
                                {[1,2,3].map(i => <div key={i} className="h-28 skeleton-title rounded" />)}
                            </div>
                            ) : (
                            artikelTerbaru.slice(0,5).map((item, idx) => (
                                <motion.li key={item.slug ?? idx} variants={listItemVariants} className="mb-4">
                                <Link href={`/artikel/${item.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                                    <div className="grid grid-cols-3 gap-3 items-center">
                                    <img src={item.thumbnail ? BASE_URL+`/storage/${item.thumbnail}` : '../images/NO IMAGE AVAILABLE.jpg'} alt={item.title} className="h-20 w-full object-cover rounded col-span-1" />
                                    <div className="col-span-2">
                                        <h4 className="line-clamp-2 text-gray-800 dark:text-gray-100 font-semibold">{item.title}</h4>
                                        <div className="text-xs text-gray-500 mt-2 flex gap-3 items-center">
                                        <span className="flex items-center gap-2"><FaUser /><small>{item.user?.name}</small></span>
                                        <span className="flex items-center gap-2"><FaCalendar /><small><time dateTime={item.published_at ?? ''}>{item.published_at ? changeDate(new Date(item.published_at)) : '-'}</time></small></span>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                                </motion.li>
                            ))
                            )}
                        </motion.ul>
                        ) : (
                        <motion.ul key="rekomendasi" initial="hidden" animate="visible" exit="exit">
                            {(artikelRandom.length === 0) ? (
                            <div className="space-y-3">
                                {[1,2,3].map(i => <div key={i} className="h-28 skeleton-card rounded" />)}
                            </div>
                            ) : (
                            artikelRandom.slice(0,5).map((item, idx) => (
                                <motion.li key={item.slug ?? idx} variants={listItemVariants} className="mb-4">
                                <Link href={`/artikel/${item.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                                    <div className="grid grid-cols-3 gap-3 items-center">
                                    <img src={item.thumbnail ? BASE_URL+`/storage/${item.thumbnail}` : '../images/NO IMAGE AVAILABLE.jpg'} alt={item.title} className="h-20 w-full object-cover rounded col-span-1" />
                                    <div className="col-span-2">
                                        <h4 className="line-clamp-2 text-gray-800 dark:text-gray-100 font-semibold">{item.title}</h4>
                                        <div className="text-xs text-gray-500 mt-2 flex gap-3 items-center">
                                        <span className="flex items-center gap-2"><FaUser /><small>{item.user?.name}</small></span>
                                        <span className="flex items-center gap-2"><FaCalendar /><small><time dateTime={item.published_at ?? ''}>{item.published_at ? changeDate(new Date(item.published_at)) : '-'}</time></small></span>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                                </motion.li>
                            ))
                            )}
                        </motion.ul>
                        )}
                    </AnimatePresence>
                    </div>

                </div>
                </aside>

            </section>
          </section>

        </main>

        {/* Inline shimmer / skeleton styles. Using a CSS gradient animation so it works with both light & dark backgrounds. */}
        <style>{`
          .skeleton-image { background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.04) 100%); animation: shimmer 1.4s infinite; }
          .skeleton-title { background: linear-gradient(90deg,#e6e6e6,#f3f3f3,#e6e6e6); animation: shimmer 1.2s infinite; }
          .skeleton-paragraph { background: linear-gradient(90deg,#eee,#f7f7f7,#eee); animation: shimmer 1.2s infinite; }
          .skeleton-block { background: linear-gradient(90deg,#e9e9e9,#f7f7f7,#e9e9e9); animation: shimmer 1.4s infinite; }
          .skeleton-card { background: linear-gradient(90deg,#efefef,#f9f9f9,#efefef); animation: shimmer 1.3s infinite; }
          .skeleton-avatar { background: linear-gradient(90deg,#e6e6e6,#f3f3f3,#e6e6e6); animation: shimmer 1.2s infinite; }

          @keyframes shimmer { 0% { background-position: -400px 0 } 100% { background-position: 400px 0 } }

          /* ensure the content-artikel images and tables are responsive and accessible */
          .content-artikel img{ max-width:100%; height:auto; display:block; margin:auto }
          .content-artikel table{ width:100%; border-collapse:collapse }

          /* small helper for dark-mode shimmer tweaks */
          :where(.dark) .skeleton-title, :where(.dark) .skeleton-paragraph, :where(.dark) .skeleton-card, :where(.dark) .skeleton-block, :where(.dark) .skeleton-image { filter: brightness(0.75) }
        `}</style>

      </motion.div>

    </MainLayout>
  );
};

export default DetailArtikel;
