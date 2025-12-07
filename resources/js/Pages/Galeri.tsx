import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import { useEffect, useState } from 'react';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Head, Link } from '@inertiajs/react';


const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

const Galeri = () => {
    const { isDark } = useTheme();
    const [galeri, setGaleri] = useState([]);
    const [error, setError] = useState(null);


    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://data.genbipurwokerto.com/api/galeri`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setGaleri(result.data)
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

    if (galeri.length <= 0) return(
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='./images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="./images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

    if (error) return <p>Error: {error}</p>;

  if (galeri.length > 0) return (
    <MainLayout isDark={isDark} title="Galeri">
        <Head>
            <meta name="description" content="Lihat galeri foto dan video dokumentasi kegiatan GenBI Purwokerto, yang memperlihatkan berbagai momen berharga dari acara dan program yang telah kami jalankan." />
            <meta name="keywords" content="galeri, foto, video, dokumentasi, kegiatan genbi, acara genbi purwokerto" />
            <meta property="og:title" content="Galeri - GenBI Purwokerto" />
            <meta property="og:description" content="Lihat galeri foto dan video dokumentasi kegiatan GenBI Purwokerto." />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content="https://genbipurwokerto.com/galeri" />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content="Galeri - GenBI Purwokerto" />
            <meta name="twitter:description" content="Lihat galeri foto dan video dokumentasi kegiatan GenBI Purwokerto." />
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
            <div className="container mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Galeri Kegiatan GenBI</h1>
                    <p className={`mt-3 text-base sm:text-lg ${styles.text} opacity-80`}>
                    Kumpulan kegiatan dari GenBI Purwokerto
                    </p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-10 items-center lg:px-10 px-3 max-w-[1700px]">
                {galeri.map((item, index) => (
                    <Link key={index} href={`/galeri/${item.slug}`} className="p-4 bg-white rounded-lg shadow-sm">
                        <img
                        src={item.thumbnail ? `https://data.genbipurwokerto.com/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"}
                        alt={item.title}
                        className="w-full h-[200px] md:h-[270px] bg-cover rounded-lg mb-8"
                        />
                        <h2 className={`text-lg font-bold mb-2`}>{item.title}</h2>

                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.deskripsi}</p>

                        <div className="mt-5 md:flex gap-10">
                            <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaMapMarkedAlt />
                                <span>Tempat : {item.tempat}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar />
                                <span>{changeDate(new Date(item.waktu))}</span>
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </MainLayout>
  );
};



export default Galeri;
