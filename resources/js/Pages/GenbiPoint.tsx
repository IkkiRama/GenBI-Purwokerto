import { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import HeroGenBIPoint from '@/Components/HeroGenBIPoint';
import { IconCalendarDays, IconClipboard, IconListBullets, IconTrophy } from '@irsyadadl/paranoid';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Head } from '@inertiajs/react';


export default function GenBIPoint() {
    const [openLightboxDeputi, setOpenLightboxDeputi] = useState(false);
    const [openLightboxStaff, setOpenLightboxStaff] = useState(false);
    const [SOTMDeputi, setSOTMDeputi] = useState([]);
    const [SOTMStaff, setSOTMStaff] = useState([]);
    const [lightboxDeputi, setLightboxDeputi] = useState([]);
    const [lightboxStaff, setLightboxStaff] = useState([]);
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

    useEffect(() => {
    // Fungsi untuk fetch data
    const fetchData = async () => {
        try {
            const response = await fetch("https://data.genbipurwokerto.com/api/sotm");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // Pisahkan data berdasarkan jenis
            const deputi = data.data.filter((item) => item.jenis === "deputi");
            const staff = data.data.filter((item) => item.jenis === "staff");

            // Proses data ke dalam format yang diinginkan
            const deputiImages = data.data
            .filter((item:any) => item.jenis === "deputi")
            .map((item:any) => ({ src: `https://data.genbipurwokerto.com/storage/${item.image}` }));

            const staffImages = data.data
            .filter((item:any) => item.jenis === "staff")
            .map((item:any) => ({ src: `https://data.genbipurwokerto.com/storage/${item.image}` }));

            // Simpan ke state
            setLightboxDeputi(deputiImages);
            setLightboxStaff(staffImages);

            setSOTMDeputi(deputi);
            setSOTMStaff(staff);
        } catch (err) {
            setError(err.message); // Tangkap error jika ada
        }
    };

    fetchData();
    }, []); // Array kosong memastikan ini hanya dijalankan sekali

    if (SOTMDeputi.length <= 0 && SOTMStaff.length <= 0) return(
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


    const missionItems = [
        {
            icon:<IconListBullets className="w-10 h-10" />,
            title: "Kegiatan",
            description: "Fitur ini menyediakan informasi lengkap tentang kegiatan yang direncanakan atau telah dilaksanakan. Anggota dapat melihat jadwal, deskripsi kegiatan, dan laporan pelaksanaan, sehingga memudahkan koordinasi dan partisipasi.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon:<IconCalendarDays className="w-10 h-10" />,
            title: "Penilaian Deputi",
            description: "Fitur ini memungkinkan penilaian kinerja deputi secara objektif dan transparan. Deputi dapat dinilai berdasarkan parameter tertentu, dengan skor yang diperoleh digunakan untuk evaluasi performa.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon:<IconClipboard className="w-10 h-10"/>,
            title: "Absensi",
            description: "Fitur absensi dirancang untuk mencatat kehadiran anggota pada setiap kegiatan atau rapat. Data kehadiran ini berguna untuk evaluasi keaktifan anggota dan memastikan partisipasi optimal dalam komunitas.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon:<IconTrophy className="w-10 h-10"/>,
            title: "Ranking (Deputi dan Staff)",
            description: "Fitur ini menampilkan peringkat deputi dan staf berdasarkan skor penilaian atau pencapaian mereka. Ranking ini diupdate secara otomatis dan dapat digunakan untuk memberikan apresiasi kepada anggota dengan performa terbaik.",
            gradient: "from-blue-500 to-blue-600"
        }
    ];


    if (SOTMDeputi.length > 0 && SOTMStaff.length > 0) return (
        <MainLayout isDark={isDark} title="GenBI Point">
            <Head>
                <meta name="description" content="GenBI Point adalah bagian dari GenBI Purwokerto yang mendukung generasi muda untuk berprestasi dan berkontribusi melalui berbagai kegiatan sosial dan edukasi. Temukan lebih banyak tentang Deputi dan Staff kami." />
                <meta name="keywords" content="genbi point, genbi purwokerto, deputi, staff, kontribusi sosial, kegiatan edukasi, generasi muda berprestasi" />
                <meta property="og:title" content="GenBI Point - GenBI Purwokerto" />
                <meta property="og:description" content="GenBI Point mendukung generasi muda untuk berprestasi dan berkontribusi melalui berbagai kegiatan sosial dan edukasi." />
                <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
                <meta property="og:url" content="https://genbipurwokerto.com/genbi-point" />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content="GenBI Point - GenBI Purwokerto" />
                <meta name="twitter:description" content="GenBI Point mendukung generasi muda untuk berprestasi dan berkontribusi melalui berbagai kegiatan sosial dan edukasi." />
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

            <section className="bg-white flex justify-center">
                <HeroGenBIPoint />
            </section>

            <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <section className="mb-24">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-800'
                        }`}>
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                        Fitur
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {missionItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                                <div className={`relative p-8 rounded-2xl md:min-h-[350px] shadow-md hover:shadow-lg transition-all duration-300 border ${
                                isDark
                                    ? 'bg-gray-800 border-gray-700'
                                    : 'bg-white border-gray-100'
                                }`}>
                                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className={`text-xl font-semibold mb-4 ${
                                        isDark ? 'text-white' : 'text-gray-800'
                                    }`}>{item.title}</h3>
                                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-24">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-800'
                        }`}>
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                        SOTM Deputi
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                        //@ts-ignore
                        SOTMDeputi.map((item:any, index:any) => (
                            <div
                            key={index}
                            onClick={() => setOpenLightboxDeputi(true)}
                            className="flex justify-center items-center cursor-pointer"
                            >
                                <img
                                    src={"https://data.genbipurwokerto.com/storage/" + item.image}
                                    className="rounded-xl lg:h-[500px] h-[350px] w-full object-cover bg-gray-300"
                                />
                            </div>
                        ))}
                        <Lightbox
                        open={openLightboxDeputi}
                        close={() => setOpenLightboxDeputi(false)}
                        slides={lightboxDeputi}
                        />
                    </div>
                </section>

                <section className="mb-24">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={`text-3xl font-bold inline-flex items-center gap-4 ${
                        isDark ? 'text-blue-400' : 'text-blue-800'
                        }`}>
                        <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                        SOTM Staff
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                        //@ts-ignore
                        SOTMStaff.map((item:any, index:any) => (
                            <div
                            key={index}
                            onClick={() => setOpenLightboxStaff(true)}
                            className="flex justify-center items-center cursor-pointer"
                            >
                                <img
                                    src={"https://data.genbipurwokerto.com/storage/" + item.image}
                                    className="rounded-xl lg:h-[500px] h-[350px] w-full object-cover bg-gray-300"
                                />
                            </div>
                        ))}
                        <Lightbox
                        open={openLightboxStaff}
                        close={() => setOpenLightboxStaff(false)}
                        slides={lightboxStaff}
                        />
                    </div>
                </section>
            </main>


        </MainLayout>
    )
}
