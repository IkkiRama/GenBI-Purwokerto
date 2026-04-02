import React, { useEffect, useState, useMemo } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from '@/Layouts/MainLayout';
import { estimateReadingTime } from "@/Utils/estimateReadingTime";
import { changeDate } from '../../Utils/changeDate';
import { Head, Link } from "@inertiajs/react";

import ShareButton from "@/Components/ShareButton";
import { getRandomColor } from "@/Utils/getRandomColor";
import { Lock, LogIn } from "lucide-react";
import { useSelector } from "react-redux";

interface DetailArtikelProps {
  slug: string;
}

interface ArtikelType {
  id: number;
  title: string;
  slug?: string;
  content: string;
  excerpt: string;
  keyword?: string;
  thumbnail?: string | null;
  updated_at?: string;
  published_at?: string;
  kategori?: { nama: string };
  author?: { name: string; foto?: string | null; deskripsi?: string };
  komentar?: Array<{ nama: string; email: string; komentar: string }>;
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
  //@ts-ignore
  const [errorArtikelTerbaru, setErrorArtikelTerbaru] = useState<string | null>(null);

  const [komen, setKomen] = useState("");
  const [komenEror, setKomenEror] = useState("");
  const [loadingKomen, setLoadingKomen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [warnaProfile] = useState(getRandomColor());

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://genbi-data.test';
    const isDark = useSelector((state) => state.theme.isDark);

    // Sync theme
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

  // Tabs: 'terbaru' | 'rekomendasi' (animated)
  const [activeTab, setActiveTab] = useState<'terbaru' | 'rekomendasi'>('terbaru');

  //   CEK LOGIN
  const token = typeof window !== "undefined"
  ? localStorage.getItem("token")
  : null;

  const isLoggedIn = !!token;

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
      if (!komen.trim()) throw new Error("Komentar tidak boleh kosong.");

      const response = await fetch(BASE_URL+'/api/komen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artikel_id: artikel?.id, komentar: komen }),
      });

      if (!response.ok) throw new Error('Gagal mengirim komentar, coba lagi nanti.');

      setSuccessMessage('Komentar Anda berhasil dikirim!');
      setKomen("");
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
  //@ts-ignore
  const loadingList = artikelRandom.length === 0;

  if (error || errorRandomArtikel) return <p role="alert">Error: {error || errorRandomArtikel}</p>;

  return (
    <MainLayout title={artikel?.title ?? "Detail Artikel"}>

      <Head>
        <meta name="description" content={artikel?.excerpt ?? 'Artikel GenBI Purwokerto'} />
        <meta name="keywords" content={artikel?.keyword ?? ''} />
        <meta property="og:title" content={artikel?.title ?? 'Detail Artikel - GenBI Purwokerto'} />
        <meta property="og:description" content={artikel?.excerpt ?? ''} />
        <meta property="og:image" content={artikel?.thumbnail ? BASE_URL+`/storage/${artikel.thumbnail}` : '../images/NO IMAGE AVAILABLE.jpg'} />
        <meta property="og:url" content={`${import.meta.env.VITE_APP_URL}/${slug}`} />
      </Head>

      {/* Page transition wrapper */}
      <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>

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
                            {artikel?.kategori?.nama ?? 'Umum'}
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

                    {/* LIST KOMENTAR */}
                    <div className="mb-4">
                        {komentar.length === 0 && (
                            <p className="text-sm text-gray-500">Belum ada komentar.</p>
                        )}

                        {komentar.map((item, index) => (
                            <motion.div key={index} className="mb-6">

                            <div className="flex items-center mb-2">
                                <div className={`w-[50px] h-[50px] text-white flex items-center justify-center rounded-full mr-3 ${warnaProfile}`}>
                                    <span className="font-bold">
                                        {getInitials(item.user?.name || "User")}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold">
                                        {item.user?.name || "Anonymous"}
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        {item.user?.email || "-"}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {item.komentar}
                            </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CONDITIONAL FORM */}
                    {isLoggedIn ? (
                        // FORM KOMENTAR (LOGIN)
                        <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">

                            <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Tulis Komentar
                            </label>

                            <textarea
                                value={komen}
                                onChange={(e) => setKomen(e.target.value)}
                                placeholder="Bagikan pendapat kamu..."
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            />
                            </div>

                            <button
                            disabled={loadingKomen}
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                {loadingKomen ? 'Mengirim...' : 'Kirim Komentar'}
                            </button>

                            {komenEror && <p className="text-red-500 mt-2">{komenEror}</p>}
                            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                        </form>

                    ) : (
                        // BELUM LOGIN
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800
                                    border border-gray-200 dark:border-gray-700
                                    p-6 rounded-2xl text-center shadow-sm"
                        >
                            {/* ICON */}
                            <div className="flex justify-center mb-3">
                                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>

                            {/* TEXT */}
                            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                                Login untuk Berkomentar
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-5">
                                Gabung dulu supaya kamu bisa ikut diskusi dan kasih pendapatmu 💬
                            </p>

                            {/* BUTTON */}
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 px-5 py-2.5
                                        bg-blue-600 text-white rounded-lg text-sm font-medium
                                        hover:bg-blue-700 active:scale-95 transition"
                            >
                                <LogIn className="w-4 h-4" />
                                Login Sekarang
                            </Link>
                        </motion.div>
                    )}

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
                        <img src={artikel?.author?.foto ? BASE_URL+`/storage/${artikel.author.foto}` : '../images/NO IMAGE AVAILABLE.jpg'} alt={`${artikel?.author?.name ?? 'Author'} avatar`} className="w-[70px] rounded" />
                        <h3 className="font-bold mt-4 text-gray-800 dark:text-gray-300">{artikel?.author?.name}</h3>
                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">{artikel?.author?.deskripsi}</p>
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
