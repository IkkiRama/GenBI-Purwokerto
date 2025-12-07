import { useTheme } from '@/Hooks/useTheme';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

const SejarahKepengurusan = () => {
    const [sejarahKepengurusan, setSejarahKepengurusan] = useState([]);
    const [error, setError] = useState(null);

    const themeHook = useTheme();
    const [isDark, setIsDark] = useState(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    });

    // Sync theme
    useEffect(() => {
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeHook?.setTheme?.(isDark ? 'dark' : 'light');
    }, [isDark]);


    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://data.genbipurwokerto.com/api/sejarah-kepengurusan`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setSejarahKepengurusan(result.data)
        } else {
            setError(result.message); // Tangkap error jika ada
            console.error("Error fetching data:", result.message);
        }

      } catch (error) {
        setError(error.message); // Tangkap error jika ada
        console.error("Fetch error:", error);
      }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const styles = {
        gradient: isDark
            ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
            : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent',
        text: isDark ? 'text-white' : 'text-gray-900',
        container: isDark
            ? 'bg-gray-800/70 backdrop-blur-sm'
            : 'bg-white/70 backdrop-blur-sm',
        button: isDark
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-blue-600 text-white hover:bg-blue-700'
    };

    if (sejarahKepengurusan.length <= 0) return(
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='../images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="../images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

    if (error) return <p>Error: {error}</p>;

  if (sejarahKepengurusan.length > 0) return (
    <MainLayout isDark={isDark} title="SejarahKepengurusan">
        <Head>
            <meta name="description" content="Pelajari sejarah kepengurusan GenBI Purwokerto dan bagaimana organisasi ini berkembang dalam memberikan kontribusi kepada masyarakat." />
            <meta name="keywords" content="sejarah kepengurusan, genbi purwokerto, perkembangan organisasi, kontribusi genbi" />
            <meta property="og:title" content="Sejarah Kepengurusan - GenBI Purwokerto" />
            <meta property="og:description" content="Pelajari sejarah kepengurusan GenBI Purwokerto dan bagaimana organisasi ini berkembang." />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content="https://genbipurwokerto.com/sejarah-kepengurusan" />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content="Sejarah Kepengurusan - GenBI Purwokerto" />
            <meta name="twitter:description" content="Pelajari sejarah kepengurusan GenBI Purwokerto dan bagaimana organisasi ini berkembang." />
            <meta name="twitter:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta name="twitter:card" content="summary_large_image" />
        </Head>


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

        <div className="lg:py-0 py-20 px-4 relative min-h-screen lg:pt-28 lg:pb-20 flex flex-col items-center">
            <div className="container mx-auto relative">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Sejarah Kepengurusan GenBI</h1>
                    <p className={`mt-3 text-base sm:text-lg ${styles.text} opacity-80`}>
                    Setiap waktu ada masanya, setiap masa ada waktunya.<br />Inilah para alumni kepengurusan GenBI Purwokerto dari tahun ke tahun
                    </p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-10 items-center lg:px-10 px-3 max-w-[1700px]">
                {
                //@ts-ignore
                sejarahKepengurusan.map((item, index) => (
                    <Link key={index} href={`/sejarah-kepengurusan/${item.periode}`} className="p-4 bg-white rounded-lg shadow-md">
                        <img
                        src="../images/logo.png"
                        alt="Logo GenBI Purwokerto"
                        className="w-full lg:h-[350px] h-[250px] bg-cover rounded-lg mb-8"
                        />
                        <h2 className={`text-lg font-bold mb-2`}>{item.nama}</h2>

                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">Periode : {item.periode}</p>

                    </Link>
                ))}
            </div>
        </div>
    </MainLayout>
  );
};



export default SejarahKepengurusan;
