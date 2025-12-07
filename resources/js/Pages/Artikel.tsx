import { useEffect, useState, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaCalendar, FaEnvelope, FaFire, FaUser } from "react-icons/fa";
import backgroundImageArtikel from "../../../public/images/NO IMAGE AVAILABLE.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { changeDate } from '@/Utils/changeDate';
import { getRandomColor } from '@/Utils/getRandomColor';
import { useTheme } from '@/Hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { MdCategory } from 'react-icons/md';

export default function Artikel() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  // theme
  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  // article states
  const [artikelPalingBaru, setArtikelPalingBaru] = useState([]);
  const [artikelBaru, setArtikelBaru] = useState([]);
  const [artikel, setArtikel] = useState([]);
  const [artikelRekomendasi, setArtikelRekomendasi] = useState([]);
  const [artikelTrending, setArtikelTrending] = useState([]);
  const [loadingArtikel, setLoadingArtikel] = useState(true);
  const [loadingRekom, setLoadingRekom] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [eror, setEror] = useState();
  const [countTrandingArtikel, setCountTrandingArtikel] = useState(4); // default

  const link = BASE_URL + "/api/artikel?page=";

  // Tab: Terbaru | Kategori
  const tabs = ['Terbaru', 'Kategori'];
  const [tabActive, setTabActive] = useState('Terbaru');

  // refs for accessibility focus management
  const headingRef = useRef(null);

  // scroll for tab
  const [isScrolled, setIsScrolled] = useState(false);

    // Scroll handler with debounce
    useEffect(() => {
        let timeoutId;
        const handleScroll = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > 400);
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    // STATE BARU
    const [kategoriArtikel, setKategoriArtikel] = useState([]);
    const [loadingKategori, setLoadingKategori] = useState(false);

    // FETCH FUNCTION
    const getKategoriArtikel = async () => {
        try {
            setLoadingKategori(true);

            const response = await fetch(BASE_URL + "/api/kategori-artikel");

            if (!response.ok) {
                throw new Error("Gagal mengambil kategori");
            }

            const data = await response.json();
            setKategoriArtikel(data.data);

        } catch (error) {
            console.error("Gagal mengambil kategori:", error);
        } finally {
            setLoadingKategori(false);
        }
    };

    // AUTO FETCH SAAT TAB KATEGORI DIBUKA
    useEffect(() => {
        if (tabActive === "Kategori") {
            setKategoriArtikel([])
            getKategoriArtikel();
        }else if(tabActive === "Terbaru"){
            setArtikelTrending([])
            setLastPage(1)
            setArtikel([])

            setLoadingArtikel(true)

            fetchTrendingArtikel()
            fetchArtikel(lastPage)
        }
    }, [tabActive]);


    const SideBar = () => (
        // {/* Sidebar (rekomendasi + subscription) */}
        <aside className="block lg:sticky top-48 h-max lg:col-span-1" aria-label="Sidebar rekomendasi">
            <div className="border border-gray-300 rounded-md p-7 relative dark:border-gray-800 my-6">
                <div className="bg-red-500 w-[50px] h-[50px] text-white flex items-center justify-center absolute top-0 left-[20px] lg:-translate-y-1/2">
                    <FaEnvelope size={20} />
                </div>

                <h3 className="mb-5 lg:mt-6 mt-12 text-gray-700 dark:text-gray-300">Berlangganan untuk mendapatkan notifikasi saat ada berita baru!</h3>

                <label htmlFor="email-sub" className="sr-only text-gray-700">Email Address</label>

                <input id="email-sub" type="email" className="border border-gray-300 rounded-md w-full py-3 px-3 text-gray-700 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-200" placeholder="Email Address" />

                <Link href={"/subscription"}>
                    <button className="bg-red-500 px-10 py-2 rounded-full text-white mt-5 text-sm">Subscribe</button>
                </Link>
            </div>

            <h2 className='text-red-500 text-xl font-semibold mb-6'>REKOMENDASI</h2>

            {/* Shimmer skeleton while rekomendasi loads */}
            {loadingRekom ? (
                <div className="space-y-6" aria-hidden>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden lg:flex block mb-6 lg:mb-4 items-start">
                            <div className={`rounded-xl lg:rounded-sm h-[200px] lg:h-[60px] lg:w-[80px] object-cover w-full lg:mr-5 ${isDark ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'} animate-shimmer`} />

                            <div className="h-4 mt-3 lg:mt-0 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-shimmer" />
                        </div>
                    ))}
                </div>
            ) : (
                artikelRekomendasi.map(item => (
                    <Link href={`/artikel/${item.slug}`} key={item.id} className="lg:flex block mb-6 lg:mb-4 items-start">
                        <img src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"} alt={item.title} className="bg-gray-300 rounded-xl lg:rounded-sm h-[200px] lg:h-[60px] lg:w-[80px] object-cover w-full lg:mr-5 " />

                        <h3 className="font-bold mt-2 lg:mt-0 line-clamp-2 text-gray-800 dark:text-gray-200 mb-4 lg:mb-0">{item.title}</h3>
                    </Link>
                ))
            )}
        </aside>
    )
  // small presentational components to keep things DRY
  const ArticleCard = ({ item }) => (
    <Link
      href={`/artikel/${item.slug}`}
      className="md:grid md:grid-cols-5 items-center lg:gap-10 md:gap-5 md:mb-5 mb-16 group"
    >
      <div className="md:col-span-2">
        <img
          src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
          className="bg-gray-300 w-full h-[250px] rounded object-cover transform group-hover:scale-105 transition-transform"
          alt={item.title}
        />
      </div>
      <div className="md:col-span-3 mb-10 md:mb-0">
        <Link href={`/artikel/kategori/${item.kategori_artikel?.slug}`} >
            <small className={`${getRandomColor("text")} text-sm md:text-base font-semibold`}>
            {item.kategori_artikel?.nama?.toUpperCase()}
            </small>
        </Link>
        <h3 className="text-gray-800 text-xl line-clamp-3 font-bold mb-3 dark:text-gray-200">
          {item.title}
        </h3>
        <p className="text-gray-700 line-clamp-4 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">
          {item.excerpt}
        </p>
        <div className="mt-5 md:flex gap-10">
          <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
            <FaUser />
            <span>Penulis : {item.user?.name}</span>
          </p>
          <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
            <FaCalendar />
            <span>{changeDate(new Date(item.published_at))}</span>
          </p>
        </div>
      </div>
    </Link>
  );

  const SkeletonArticle = ({ large = true }) => (
    <article className={`md:grid md:grid-cols-5 items-center lg:gap-10 md:gap-5 md:mb-5 mb-8 group ${large ? '' : ''}`} aria-hidden>
      <div className="md:col-span-2">
        <div className="w-full h-[250px] rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>
      <div className="md:col-span-3 mb-10 md:mb-0">
        <div className="h-3 w-1/4 mb-3 rounded bg-gray-200 animate-shimmer" />
        <div className="h-6 w-3/4 mb-3 rounded bg-gray-200 animate-shimmer" />
        <div className="h-4 w-full mb-3 rounded bg-gray-200 animate-shimmer" />
        <div className="mt-5 md:flex gap-10">
          <div className="h-4 w-1/4 rounded bg-gray-200 animate-shimmer" />
          <div className="h-4 w-1/4 rounded bg-gray-200 animate-shimmer" />
        </div>
      </div>
    </article>
  );

  const SkeletonSlider = ({ slides = 4 }) => (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={Math.min(slides, 3)}
      navigation
      pagination={{ clickable: true }}
      loop={false}
      className="w-full"
    >
      {Array.from({ length: slides }).map((_, i) => (
        <SwiperSlide key={i}>
          <div className="rounded-xl overflow-hidden">
            <div className="h-[200px] w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
            <div className="h-4 w-3/4 mt-3 rounded bg-gray-200 animate-shimmer" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  // fetch artikel (paginated)
  const fetchArtikel = async (page = 1) => {
    try {
      const response = await fetch(link + page);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data.success) {
        const allArtikel = data.data.data;
        if (!Array.isArray(allArtikel)) throw new Error("Artikel data is not an array");

        if (page === 1) {
          setArtikelPalingBaru(allArtikel.slice(0, 1));
          setArtikelBaru(allArtikel.slice(1, 3));
          setArtikel(allArtikel.slice(3));
        } else {
          setArtikel(prev => [...prev, ...allArtikel]);
        }
      }
    } catch (error) {
      setEror(error);
      console.error("Error fetching artikel:", error);
    } finally {
      setLoadingArtikel(false);
    }
  };

  // fetch rekomendasi
  const fetchRekomendasi = async () => {
    setLoadingRekom(true);
    try {
      const response = await fetch(BASE_URL + "/api/artikel/rekomendasi");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data.success) setArtikelRekomendasi(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      setEror(error);
      console.error("Error fetching rekomendasi:", error);
    } finally {
      setLoadingRekom(false);
    }
  };

  // fetch trending monthly
  const fetchTrendingArtikel = async () => {
    setLoadingTrending(true);
    try {
      const response = await fetch(BASE_URL + "/api/artikel/trending-monthly");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (data.success) setArtikelTrending(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      setEror(error);
      console.error("Error fetching trending artikel:", error);
    } finally {
      setLoadingTrending(false);
    }
  };

  useEffect(() => {
    if (tabActive === "Terbaru")
        fetchArtikel(lastPage);
  }, [lastPage]); // infinite scroll will increase lastPage

  // initial secondary fetches and window configuration
  useEffect(() => {
    fetchTrendingArtikel();
    fetchRekomendasi();

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setLastPage(prev => prev + 1);
      }
    };

    if (window.innerWidth <= 500) setCountTrandingArtikel(1);
    else if (window.innerWidth > 500 && window.innerWidth <= 700) setCountTrandingArtikel(2);
    else if (window.innerWidth > 700 && window.innerWidth <= 1000) setCountTrandingArtikel(3);
    else setCountTrandingArtikel(4);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // accessibility: focus heading on tab change
  useEffect(() => {
    if (headingRef.current) (headingRef.current as any).focus?.();
  }, [tabActive]);

  if (eror) return <p>Error: {String(eror)}</p>;

  // Motion variants for page & content
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.28, ease: 'easeIn' } }
  };

  const listSwap = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.28 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.2 } }
  };

  return (
    <MainLayout title="Artikel" isDark={isDark}>
      <Head>
        <title>Artikel GenBI Purwokerto - Generasi Baru Indonesia</title>
        <meta name="description" content="Temukan artikel inspiratif GenBI Purwokerto tentang pendidikan, sosial, ekonomi, dan kegiatan komunitas." />
        <meta name="keywords" content="artikel, genbi purwokerto, beasiswa bank indonesia, artikel genbi" />
        <meta property="og:title" content="Artikel GenBI Purwokerto - Generasi Baru Indonesia" />
        <meta property="og:description" content="Temukan artikel inspiratif GenBI Purwokerto." />
        <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
        <meta property="og:url" content="https://genbipurwokerto.com/artikel" />
      </Head>

      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-3 py-2 rounded">Skip to content</a>

      {/* Theme toggle */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          aria-pressed={isDark}
          onClick={() => setIsDark(s => !s)}
          className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="pointer-events-none dark:text-white text-gray-900">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
          <div className={`w-10 h-6 rounded-full p-1 transition-all ${isDark ? 'bg-blue-600' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${isDark ? 'translate-x-4' : ''}`} />
          </div>
        </button>
      </div>

      <motion.main
        id="main"
        role="main"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen`}
      >
        {/* Top hero & grid (kept visually the same) */}
        <section aria-labelledby="artikel-hero" className="relative overflow-hidden mx-auto grid lg:grid-cols-4 gap-10 pt-24 lg:px-20 md:px-5 px-3 max-w-[1700px]">

          {/* Atribut rounded circle yang di ujung kiri atas */}
          <span
            className="w-[100%] h-[100%] rounded-full absolute -left-[500px] -top-[500px] -rotate-[60deg] animate-spin-slow"
            style={{
              backgroundImage:
                "radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(29,79,217, 0.70) 0%, rgba(239, 68, 68, 0.0) 100%)",
            }}
            aria-hidden
          ></span>

          {/* Hero area (Terbaru tab) */}
          <Link
            href={`/artikel/${artikelPalingBaru[0]?.slug}`} key={artikelPalingBaru[0]?.title}
            className="lg:col-span-3 lg:h-[600px] md:h-[400px] h-[300px] bg-cover relative z-10 flex items-end md:p-10 p-4 after:content-[''] after:absolute after:inset-0 after:bg-black/40 after:-z-10 bg-bottom rounded overflow-hidden"
            style={{
                backgroundImage: artikelPalingBaru[0] && artikelPalingBaru[0].thumbnail ? `url(${BASE_URL}/storage/${artikelPalingBaru[0].thumbnail})` : `url(${backgroundImageArtikel})`
            }}
            >
            <AnimatePresence mode="wait">
                <motion.div
                    key="hero-terbaru"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="w-full"
                >
                    {/* Hero skeleton when loading and no content*/}
                    {loadingArtikel && artikelPalingBaru.length === 0 ? (
                    <div className="w-[100%]">
                        <div className="h-8 w-1/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer mb-3" />
                        <div className="h-10 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer mb-3" />
                        <div className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                    </div>
                    ) : (
                    <div className="w-[80%]">
                        <Link href={`/artikel/kategori/${artikelPalingBaru[0].kategori_artikel?.slug}`} >
                            <h6 className="text-red-500 md:mb-3 mb-1 font-semibold md:text-base text-sm">
                            {artikelPalingBaru[0]?.kategori_artikel?.nama}
                            </h6>
                        </Link>
                        <h2 className="lg:text-3xl md:text-2xl font-bold text-white ">
                        {artikelPalingBaru[0]?.title}
                        </h2>
                        <p className="text-gray-200 mt-3 text-sm lg:block hidden">
                        {artikelPalingBaru[0]?.excerpt}
                        </p>
                    </div>
                    )}
                </motion.div>
            </AnimatePresence>
          </Link>

          {/* Right small cards (ke-2 & ke-3) - still visible across tabs but hidden on small screens */}
          <div className="md:grid hidden lg:grid-cols-1 lg:gap-0 gap-10">
            {loadingArtikel && artikelBaru.length === 0 ? (
              // show two skeletons for the two small cards
              <>
                <div className="group block">
                  <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-xl h-[200px] w-full" />
                  <div className="h-4 mt-2 w-1/4 rounded bg-gray-200 animate-shimmer" />
                  <div className="h-4 mt-2 w-3/4 rounded bg-gray-200 animate-shimmer" />
                </div>
                <div className="group block">
                  <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-xl h-[200px] w-full" />
                  <div className="h-4 mt-2 w-1/4 rounded bg-gray-200 animate-shimmer" />
                  <div className="h-4 mt-2 w-3/4 rounded bg-gray-200 animate-shimmer" />
                </div>
              </>
            ) : (
              artikelBaru.map((item, index) => (
                <Link href={`/artikel/${item.slug}`} key={index} className="group block">
                    <img
                        src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                        alt={item.title}
                        className="bg-gray-300 rounded-xl h-[200px] object-cover w-full transform group-hover:scale-105 transition-transform mb-3"
                    />
                    <Link href={`/artikel/kategori/${item.kategori_artikel?.slug}`} >
                        <small className={`${getRandomColor("text")}`}>
                            {item?.kategori_artikel?.nama.toUpperCase()}
                        </small>
                    </Link>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200    line-clamp-2">{item.title}</h3>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Tabs for Terbaru / Kategori */}
        <div className="mx-auto mt-5 lg:px-20 md:px-10 px-3 max-w-[1700px] mb-20">
          <div className={`px-5 py-2 sticky top-16 lg:top-20 h-max flex items-center justify-between z-30 inset-0 ${
            isScrolled
                        ? isDark
                            ? 'bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-800'
                            : 'bg-white/80 backdrop-blur-md shadow-md'
                        : 'bg-transparent'
            }`}>
            <div className="flex items-center gap-4" role="tablist" aria-label="Pilih kategori artikel">
                {tabs.map(t => {
                    if (t === "Kategori") {
                        return (
                            <button
                            key={t}
                            role="tab"
                            aria-selected={tabActive === t}
                            onClick={() => setTabActive(t)}
                            className={`px-4 py-2 rounded-full font-semibold flex items-center shadow-md gap-2 ${tabActive === t ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}
                            >
                            <MdCategory /> {t}
                            </button>
                        )
                    }else{
                        return (
                            <button
                            key={t}
                            role="tab"
                            aria-selected={tabActive === t}
                            onClick={() => setTabActive(t)}
                            className={`px-4 py-2 rounded-full font-semibold flex items-center shadow-md gap-2 ${tabActive === t ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}
                            >
                            <FaFire/> {t}
                            </button>
                        )
                    }
              })}
            </div>
          </div>

          <hr className="my-5 dark:border-gray-800" />

          {/* Content area - animate presence between tabs */}
          <AnimatePresence mode="wait">
            {tabActive === 'Terbaru' && (
              <motion.section
                key="tab-terbaru"
                variants={listSwap}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid lg:grid-cols-4 md:gap-10 gap-6 items-start"
              >
                {/* Left big list — keep original layout */}
                <div className="lg:col-span-3">
                  {/* TRENDING slider area (kept visually similar) */}
                  <section>
                    <div className="flex justify-between items-center mb-5">
                      <span className="flex gap-2 items-center text-red-500 text-xl font-semibold">
                        <FaFire />
                        <h2>TRENDING</h2>
                      </span>
                    </div>

                    <div className="grid mb-10">
                      {loadingTrending ? (
                        <SkeletonSlider slides={countTrandingArtikel} />
                      ) : (
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={30}
                          slidesPerView={countTrandingArtikel}
                          navigation
                          pagination={{ clickable: true }}
                          loop={true}
                          className="w-full"
                        >
                          {artikelTrending.map((item, index) => (
                            <SwiperSlide key={index}>
                              <Link href={`/artikel/${item.slug}`} className="group block">
                                <img
                                  src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                                  alt={item.title}
                                  className="bg-gray-300 rounded-xl h-[200px] object-cover w-full group-hover:scale-105 transition-transform"
                                />
                                <h3 className="font-bold mt-2 text-gray-800 dark:text-gray-200 line-clamp-2">{item.title}</h3>
                              </Link>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )}
                    </div>
                  </section>

                  <hr className="my-10 border-gray-300 dark:border-gray-800" />

                  {/* Main article list (ke-4 dan seterusnya) */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200 mb-7">Artikel Terbaru</h2>

                    {loadingArtikel && artikel.length === 0 ? (
                      // Show a few skeletons while loading
                        Array.from({ length: 4 }).map((_, i) => <SkeletonArticle key={i} />)
                    ) : (
                      artikel.map((item, index) => <ArticleCard item={item} key={index} />)
                    )}
                  </div>
                </div>

                <SideBar />
              </motion.section>
            )}

            {tabActive === 'Kategori' && (
              <motion.section
                key="tab-trending"
                variants={listSwap}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid lg:grid-cols-4 gap-6 items-start"
              >
                {/* Trending tab — show slider and trending list */}
                <div className="lg:col-span-3">

                    <section className="min-h-[400px]">
                        {/* TITLE */}
                        <div className="flex items-center gap-3 mb-6">
                            <MdCategory className="text-blue-600 text-2xl" />
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-200">
                            Semua Kategori Artikel
                            </h2>
                        </div>

                        {/* GRID CATEGORY CARD */}
                        <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* LOOP KATEGORI DI SINI */}
                            {kategoriArtikel?.map((item, i) => (
                            <Link
                                key={i}
                                href={`/artikel/kategori/${item.slug}`}
                                className="group relative flex flex-col justify-between rounded-xl overflow-hidden border dark:border-gray-700 hover:shadow-lg transition-all bg-white dark:bg-gray-800"
                            >
                                {/* Image */}
                                <div className="h-[120px] overflow-hidden">
                                <img
                                    src={item.thumbnail || '/images/NO IMAGE AVAILABLE.jpg'}
                                    alt={item.nama}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                />
                                </div>

                                {/* Label */}
                                <div className="p-4">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
                                    {item.nama}
                                </h3>

                                <p className="text-[12px] md:text-sm text-gray-500 mt-1 dark:text-gray-400">
                                    {item.total_artikel} Artikel
                                </p>
                                </div>
                            </Link>
                            ))}

                            {/* Jika masih loading */}
                            {loadingKategori &&
                            Array.from({ length: 6 }).map((_, i) => (
                                <div
                                key={i}
                                className="rounded-xl border dark:border-gray-700 p-3 animate-pulse"
                                >
                                <div className="h-[120px] bg-gray-300 dark:bg-gray-700 rounded"></div>
                                <div className="mt-3 h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                <div className="mt-2 h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                <SideBar />
              </motion.section>
            )}

          </AnimatePresence>
        </div>
      </motion.main>
    </MainLayout>
  );
}
