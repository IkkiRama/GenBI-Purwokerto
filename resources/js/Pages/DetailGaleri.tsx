import React, { useEffect, useState } from "react";
import { FaCalendar, FaMapMarkedAlt} from "react-icons/fa";

import MainLayout from '@/Layouts/MainLayout';
import { changeDate } from './../Utils/changeDate';
import Lightbox from "yet-another-react-lightbox";
import { Head } from "@inertiajs/react";
import { useTheme } from "@/Hooks/useTheme";



interface DetailGaleriProps {
  slug: string;
}

//@ts-ignore
const DetailGaleri = React.FC<DetailGaleriProps> = ({slug}) => {
    const [galeri, setGaleri] = useState([]);
    const [error, setError] = useState(null);
    const [openGaleri, setOpenGaleri] = useState(false);
    const [lightboxGaleri, setLightboxGaleri] = useState([]);

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
          `https://data.genbipurwokerto.com/api/galeri/${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            const galeriImage = result.data.image_galeri
            .map((item) => ({ src: `https://data.genbipurwokerto.com/storage/${item.nama}` }));

            // Simpan ke state
            setLightboxGaleri(galeriImage)
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

    if (galeri.length <= 0) return(
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

  if (galeri.length > 0) return (
    //@ts-ignore
    <MainLayout isDark={isDark} title={galeri.title ? galeri.title : "Detail Artikel"}>
        <Head>
            <meta name="description" content={`Lihat detail dari galeri ${
                //@ts-ignore
                galeri.title} foto dan video yang mencatatkan momen berharga dari kegiatan GenBI Purwokerto.`} />
            <meta name="keywords" content="detail galeri, galeri genbi purwokerto, foto genbi purwokerto, video genbi purwokerto" />
            <meta property="og:title" content={`
                Detail Galeri ${
                    //@ts-ignore
                    galeri.title
                } - GenBI Purwokerto
                `} />
            <meta property="og:description" content={`
                Lihat detail dari galeri ${
                    //@ts-ignore
                    galeri.title} foto dan video GenBI Purwokerto yang mencatatkan momen berharga dari berbagai kegiatan.
                    `} />
            <meta property="og:image" content={
                //@ts-ignore
                galeri.thumbnail ? `https://data.genbipurwokerto.com/storage/${galeri.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"} />
            <meta property="og:url" content={`https://genbipurwokerto.com/${slug}`} />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content={`
                Detail Galeri ${
                    //@ts-ignore
                    galeri.title
                } - GenBI Purwokerto
                `} />
            <meta name="twitter:description" content="Lihat detail dari galeri foto dan video GenBI Purwokerto." />
            <meta name="twitter:image" content={
                //@ts-ignore
                galeri.thumbnail ? `https://data.genbipurwokerto.com/storage/${galeri.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"} />
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

        <main className="container mx-auto pb-20">

            <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
                <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0"></span>

                <div className="lg:col-span-3 order-2 lg:order-1 relative z-10">
                    <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl lg:text-left text-center mb-2 text-xl text-gray-900 dark:text-gray-200">
                        {//@ts-ignore
                        galeri.title}
                    </h1>

                    <div className="md:flex gap-10 md:mb-8 mb-4">
                        <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                            <FaMapMarkedAlt />
                            <span>Tempat : {
                            //@ts-ignore
                            galeri.tempat}</span>
                        </p>
                        <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                            <FaCalendar />
                            <span>{changeDate(new Date(
                                //@ts-ignore
                                galeri.waktu))}</span>
                        </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[15px]">{
                    //@ts-ignore
                    galeri.deskripsi}</p>
                </div>
                <div className="md:py-8 py-0 pt-8 pb-3 lg:col-span-2 relative z-10 lg:order-2 order-1">
                    <img
                        src={
                            //@ts-ignore
                            galeri.thumbnail ? `https://data.genbipurwokerto.com/storage/${galeri.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                        className="w-full h-[200px] md:h-[350px] rounded object-cover"
                        alt={//@ts-ignore
                        galeri.title}
                    />
                </div>
            </div>

            <main className="grid lg:grid-cols-3 md:px-20 px-5 gap-10 mt-20 mb-20">
                {
                //@ts-ignore
                galeri.image_galeri.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setOpenGaleri(true)}
                        className="cursor-pointer w-full h-[300px] rounded"
                    >
                        <img
                            src={item.nama ? `https://data.genbipurwokerto.com/storage/${item.nama}` : "../images/NO IMAGE AVAILABLE.jpg"}
                            className="w-full h-full object-cover"
                            alt={`Galeri ke ${index}`}
                        />
                    </div>
                ))}

                <Lightbox
                    open={openGaleri}
                    close={() => setOpenGaleri(false)}
                    slides={lightboxGaleri}
                />
            </main>

        </main>
    </MainLayout>
  );
};



export default DetailGaleri;
