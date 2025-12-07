import MainLayout from '@/Layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import { FaCalendar, FaMapMarkedAlt } from 'react-icons/fa';
import { changeDate } from '@/Utils/changeDate';
import { Head, Link } from '@inertiajs/react';
import { useTheme } from '@/Hooks/useTheme';

interface DetailEventProps {
  slug: string;
}


//@ts-ignore
const DetailEvent = React.FC<DetailEventProps> = ({slug}) => {
    const [event, setEvent] = useState();
    const [pemateri, setPemateri] = useState([]);
    const [rekomendasiEvent, setRekomendasiEvent] = useState([]);
    const [error, setError] = useState(null);
    const [errorRekomendasiEvent, setErrorRekomendasiEvent] = useState(null);
    const [isEventExpired, setIsEventExpired] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    const EventContent = ({ content }) => {
        return (
            <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ lineHeight: "1.6", fontSize: "16px" }}
            className="content-artikel"
            />
        );
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://data.genbipurwokerto.com/api/event/${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setEvent(result.data)
            setPemateri(result.data.pemateri)

            // Check if the event's registration date has passed
            const currentDate = new Date();
            const registrationEndDate = new Date(result.data.tanggal); // Assuming 'tanggal' is the event registration end date
            if (currentDate > registrationEndDate) {
                setIsEventExpired(true); // Mark the event as expired if the current date is greater than the event's date
            }

        } else {
            setError(result.message); // Tangkap error jika ada
            console.error("Error fetching data:", result.message);
        }

      } catch (error) {
        setError(error.message); // Tangkap error jika ada
        console.error("Fetch error:", error);
      }
    };

    const fetchDataRekomendasiEvent = async () => {
      try {
        const response = await fetch(
          `https://data.genbipurwokerto.com/api/event/rekomendasiEvent`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setRekomendasiEvent(result.data)
        } else {
            setErrorRekomendasiEvent(result.message); // Tangkap error jika ada
            console.error("Error fetching data:", result.message);
        }

      } catch (error) {
        setErrorRekomendasiEvent(error.message); // Tangkap error jika ada
        console.error("Fetch error:", error);
      }
    };

    useEffect(() => {
        fetchData()
        fetchDataRekomendasiEvent()
    }, []);



    if (event === undefined  && rekomendasiEvent.length <= 0) return(
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

    if (errorRekomendasiEvent || error) return <p>Error: {error}</p>;



  if (event !== undefined  && rekomendasiEvent.length > 0) return (
    <MainLayout isDark={isDark} title={`Detail Event ${
        //@ts-ignore
        event.nama}`}>
        <Head>
            <meta name="description" content={
                //@ts-ignore
                event.excerpt} />
            <meta name="keywords" content={
                //@ts-ignore
                event.keyword} />
            <meta property="og:title" content={`Detail Event ${
                //@ts-ignore
                event.nama}`} />
            <meta property="og:description" content={
                //@ts-ignore
                event.excerpt} />
            <meta property="og:image" content={
                //@ts-ignore
                event.gambar ? `https://data.genbipurwokerto.com/storage/${event.gambar}` : "../images/NO IMAGE AVAILABLE.jpg"} />
            <meta property="og:url" content={`https://genbipurwokerto.com/${slug}`} />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content={`Detail Event ${
                //@ts-ignore
                event.nama}`} />
            <meta name="twitter:description" content={
                //@ts-ignore
                event.excerpt} />
            <meta name="twitter:image" content={
                //@ts-ignore
                event.gambar ? `https://data.genbipurwokerto.com/storage/${event.gambar}` : "../images/NO IMAGE AVAILABLE.jpg"} />
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


        {event && rekomendasiEvent && (
            <div className="container mx-auto pb-20 leading-normal tracking-normal">
                <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative md:gap-6">
                    <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0"></span>

                    <div className="lg:col-span-3 order-2 lg:order-1 relative">
                        <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl lg:text-left text-center mb-2 text-xl text-gray-900 dark:text-gray-200">
                            {//@ts-ignore
                            event.nama}
                        </h1>

                        <div className="md:flex gap-10 md:mb-8 mb-4">
                            <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaMapMarkedAlt />
                                <span>{
                                //@ts-ignore
                                event.tempat}</span>
                            </p>
                            <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                <FaCalendar />
                                <span>{changeDate(new Date(
                                    //@ts-ignore
                                    event.tanggal))}</span>
                            </p>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap lg:text-base md:text-sm text-[15px]">{
                        //@ts-ignore
                        event.excerpt}</p>
                    </div>
                    <div className="md:pb-8 pt-8 pb-3 lg:col-span-2 relative lg:order-2 order-1">
                        <img
                        // {item.image ? `https://data.genbipurwokerto.com/storage/${item.image}` : "./images/NO IMAGE AVAILABLE.jpg"}
                            src={
                                //@ts-ignore
                                event.image ? `https://data.genbipurwokerto.com/storage/${event.image}` : "../images/NO IMAGE AVAILABLE.jpg"}
                            className="w-full h-[200px] md:h-[350px] rounded object-cover"
                            alt={//@ts-ignore
                            event.nama}
                        />
                    </div>
                </div>

                <div className="container sm:px-6 px-2 md:justify-center flex-wrap lg:flex-nowrap mx-auto mt-10 flex relative justify-between min-h-screen">

                    <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 dark:border-gray-950 lg:mr-10 shadow-lg rounded-lg border-2">
                        <h2 className="md:text-2xl text-xl font-semibold md:px-8 px-3 py-3 md:py-4 text-red-500 border-b-2">Detail Event</h2>
                        <div className="flex justify-center">
                            {
                            //@ts-ignore
                            event.link_gmap !== null ? (
                                <iframe
                                src={
                                    //@ts-ignore
                                    event.link_gmap}
                                //@ts-ignore
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="bg-gray-300 w-[95%] sm:w-[95%] h-[250px] mt-5 rounded-md sm:h-[400px]"
                                ></iframe>
                            ) : ""}
                        </div>

                        <div className="sm:text-base dark:text-white text-sm deskripsiFull leading-6 sm:leading-7 font-normal md:p-8 p-3 whitespace-pre-wrap ">
                            <EventContent content={
                                //@ts-ignore
                                event.deskripsi} />
                        </div>

                        <div className="md:p-5 p-3">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Pemateri</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {pemateri.map((orang, index) => (
                                    <div key={index} className="flex flex-col justify-center items-center">
                                        <img
                                            src={
                                            //@ts-ignore
                                            orang.gambar ? `https://data.genbipurwokerto.com/storage/${orang.gambar}` : "../images/NO IMAGE AVAILABLE.jpg"}
                                            className="w-[100px] lg:w-[150px] h-[100px] lg:h-[150px] rounded-full object-cover"
                                            alt={//@ts-ignore
                                                orang.nama}
                                                />
                                        <h1 className="mt-3 lg:text-base md:text-sm text-[12px]">{orang.nama}</h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[30%] space-y-6 sticky top-28 mt-10 lg:mt-0">
                        <div className="bg-white dark:bg-gray-800 dark:border-gray-950 shadow-lg rounded-lg border-2">
                            <h2 className="md:text-2xl text-xl font-semibold md:px-8 px-3 py-3 md:py-4 text-red-500 border-b-2">Tentang Event</h2>
                            <ul className="mb-4 sm:px-6 px-3 py-4">
                                <li className='flex leading-8 dark:text-white sm:mt-4 justify-between font-semibold'><span>Tempat</span>{
                                //@ts-ignore
                                event.tempat}</li>
                                <li className='flex leading-8 dark:text-white sm:mt-4 justify-between font-semibold'><span>Waktu</span>{
                                //@ts-ignore
                                changeDate(new Date(event.tanggal))}</li>
                                <li className='flex leading-8 dark:text-white sm:mt-4 justify-between font-semibold'><span>Jumlah Pemateri</span>{
                                //@ts-ignore
                                event.pemateri.length}</li>
                            </ul>

                        </div>

                        <div className="grid grid-cols-1">
                            {isEventExpired && showModal && (
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

                            {!isEventExpired && (<a
                                target='_blank'
                                href={
                                    //@ts-ignore
                                    /^(\+62|62|08)\d+$/.test(event.cta) // Cek apakah cta adalah nomor WA
                                    ? `https://wa.me/${
                                        //@ts-ignore
                                        event.cta.replace(/^0/, "62")}?text=Hallo kak, saya mendapatkan info dari website GenBI Purwokerto mengenai event ${
                                        //@ts-ignore
                                        event.nama}. Saya berencana mendaftar event itu. Bolehkan kakak menunjukan bagaimana cara mendaftar event ${
                                        //@ts-ignore
                                        event.nama}?`
                                    :
                                    //@ts-ignore
                                    event.cta // Jika bukan nomor, langsung gunakan sebagai link pendaftaran
                                }
                                className="mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                                >
                                Daftar
                            </a>)}

                            {isEventExpired && (<button
                                onClick={() => setShowModal(true)}
                                className="mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                                >
                                Daftar
                            </button>)}

                        </div>
                    </div>

                </div>


                <div className="container mx-auto mt-10 lg:mt-20 pb-10 px-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Rekomendasi Event</h2>

                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-0 md:gap-10 items-center">
                        {rekomendasiEvent.length > 0 && rekomendasiEvent.map((item, index) => (
                            <Link key={index} href={`/event/${item.slug}`} className="bg-white rounded-lg shadow-sm mb-5 md:mb-0">
                                <img
                                src={item.image ? `https://data.genbipurwokerto.com/storage/${item.image}` : "../images/NO IMAGE AVAILABLE.jpg"}
                                alt={item.nama}
                                className="w-full h-[200px] md:h-[270px] object-cover rounded-lg mb-8"
                                />
                                <h2 className={`px-4 text-lg font-bold mb-2`}>{item.nama}</h2>

                                <p className="px-4 text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] line-clamp-3">{item.excerpt}</p>

                                <div className="mt-5 md:flex gap-10 px-4 pb-4">
                                    <p className="flex md:mb-0 mb-2 md:text-base text-[12px] gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                        <FaMapMarkedAlt />
                                        <span>{item.tempat}</span>
                                    </p>
                                    <p className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 items-center">
                                        <FaCalendar />
                                        <span>{changeDate(new Date(item.tanggal))}</span>
                                    </p>
                                </div>

                                <div
                                className={`p-5 rounded-b-lg text-center
                                    ${item.status === "Event Sudah Berakhir" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"}
                                `}>
                                    <p className={`dark:text-gray-300 lg:text-base md:text-sm text-[12px] font-semibold`}>{item.status}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </MainLayout>
  );
};



export default DetailEvent;
