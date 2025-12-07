import React, { useEffect, useState } from "react";
import { FaCalendar, FaUser } from "react-icons/fa";

import MainLayout from '@/Layouts/MainLayout';
import { estimateReadingTime } from "@/Utils/estimateReadingTime";
import { changeDate } from './../Utils/changeDate';
import { Head, Link } from "@inertiajs/react";

import ShareButton from "@/Components/ShareButton";
import { getRandomColor } from "@/Utils/getRandomColor";
import { useTheme } from "@/Hooks/useTheme";


interface DetailArtikelProps {
  slug: string;
}

//@ts-ignore
const DetailArtikel = React.FC<DetailArtikelProps> = ({slug}) => {
    const [artikel, setArtikel] = useState();
    const [komentar, setKomentar] = useState([]);
    const [artikelRandom, setArtikelRandom] = useState([]);
    const [error, setError] = useState(null);
    const [errorRandomArtikel, setErrorRandomArtikel] = useState(null);

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [komen, setKomen] = useState("");
    //@ts-ignore
    const [komenEror, setKomenEror] = useState("");
    //@ts-ignore
    const [loadingKomen, setLoadingKomen] = useState(false);
    //@ts-ignore
    const [successMessage, setSuccessMessage] = useState("");
    //@ts-ignore
    const [warnaProfile, setWarnaProfile] = useState(getRandomColor());

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


    const ArticleContent = ({ content }) => {
        return (
            <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ lineHeight: "1.6", fontSize: "16px" }}
            className="content-artikel"
            />
        );
    };

    const fetchDataRandom = async () => {
        try{
            const responseRandomArtikel = await fetch("https://data.genbipurwokerto.com/api/artikel/rekomendasi-per-page")

            if (!responseRandomArtikel.ok) {
                throw new Error(`HTTP error! Status: ${responseRandomArtikel.status}`);
            }

            const resultRandomArtikel = await responseRandomArtikel.json();

            if (resultRandomArtikel.success) {
                setArtikelRandom(resultRandomArtikel.data)
            } else {
                setError(resultRandomArtikel.message); // Tangkap error jika ada
                console.error("Error fetching data:", resultRandomArtikel.message);
            }

        }catch (error) {
            setErrorRandomArtikel(error.message); // Tangkap error jika ada
            console.error("Fetch error:", error);
        }
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://data.genbipurwokerto.com/api/artikel/${slug}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            setArtikel(result.data)
            setKomentar(result.data.komentar)
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
        fetchDataRandom()
    }, []);

    if (artikel === undefined && artikelRandom.length <= 0) return(
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

    if (error || errorRandomArtikel) return <p>Error: {error || errorRandomArtikel}</p>;

    const getInitials = (nama) => {
        const words = nama.split(" ");
        const initials = words.map((word) => word[0].toUpperCase()).join("");
        return initials.length > 2 ? initials.slice(0, 2) : initials; // Maksimal 2 huruf
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingKomen(true)

        try {
            // Validasi nama
            if (!nama.trim()) throw new Error("Nama tidak boleh kosong.");

            // Validasi email
            if (!email.trim()) throw new Error("Email tidak boleh kosong.");
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Format email tidak valid.");

            // Validasi komentar
            if (!komen.trim()) throw new Error("Komentar tidak boleh kosong.");


            const response = await fetch('https://data.genbipurwokerto.com/api/komen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //@ts-ignore
                body: JSON.stringify({artikel_id:artikel.id, nama, email, komentar:komen}),
            });

            if (!response.ok) {
                throw new Error('Gagal mengirim komentar, coba lagi nanti.');
            }

            setSuccessMessage('Komentar Anda berhasil dikirim!');

            setNama("")
            setEmail("")
            setKomen("")

            fetchData()

        } catch (error) {
            setKomenEror(error.message);
        } finally {
            setLoadingKomen(false);
        }
    }

  if (artikel !== undefined && artikelRandom.length > 0) return (
    <MainLayout isDark={isDark} title={artikel.title ? artikel.title : "Detail Artikel"}>

        <Head>
            <meta name="description" content={
                //@ts-ignore
                artikel.excerpt} />
            <meta name="keywords" content={
                //@ts-ignore
                artikel.keyword} />
            <meta property="og:title" content="Detail Artikel - GenBI Purwokerto" />
            <meta property="og:description" content={
                //@ts-ignore
                artikel.excerpt} />
            <meta property="og:image" content={
                //@ts-ignore
                artikel.thumbnail ? `https://data.genbipurwokerto.com/storage/${artikel.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"} />
            <meta property="og:url" content={`https://genbipurwokerto.com/${slug}`} />
            <meta property="og:type" content="article" />
            <meta name="twitter:title" content="Detail Artikel - GenBI Purwokerto" />
            <meta name="twitter:description" content={
                //@ts-ignore
                artikel.excerpt} />
            <meta name="twitter:image" content={
                //@ts-ignore
                artikel.thumbnail ? `https://data.genbipurwokerto.com/storage/${artikel.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"} />
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
            <div className="grid lg:grid-cols-5 pt-20 pb-10 md:px-20 px-5 mb-8 items-center bg-gray-100 dark:bg-gray-950 relative">
                <span className="h-full lg:w-[700px] w-full absolute right-0 lg:bg-gradient-to-l bg-gradient-to-b from-blue-700/30 to-blue-700/0"></span>
                <div className="lg:col-span-3 order-2 lg:order-1 relative z-10 lg:text-left text-center">
                    <p className="font-semibold mb-2 text-blue-700 md:md:text-base text-[13px] text-sm">
                        {
                        //@ts-ignore
                        artikel.kategori_artikel.nama}
                    </p>
                    <h1 className="lg:leading-[2.7rem] font-bold md:text-3xl text-xl mb-8 text-gray-900 dark:text-gray-200 h-auto">
                        {
                        //@ts-ignore
                        artikel.title}
                    </h1>
                    <p className="mr-3 md:text-sm text-[12px] text-gray-800 dark:text-gray-300">
                        Ditulis oleh{" "}
                        <span className="text-blue-700 font-semibold">{
                        //@ts-ignore
                        artikel.user.name}</span> |{" "}
                        <span className="text-gray-500 dark:text-gray-400 italic">
                        Diperbaharui pada {changeDate(new Date(
                            //@ts-ignore
                            artikel.updated_at))}
                        </span>
                    </p>
                    <p className="mr-3 text-sm text-gray-800 dark:text-gray-300">
                        Diterbitkan pada {changeDate(new Date(
                            //@ts-ignore
                            artikel.published_at))} | {estimateReadingTime(
                            //@ts-ignore
                            artikel.content)} Menit Baca
                    </p>
                </div>
                <div className="py-4 md:py-8 lg:col-span-2 relative z-10 lg:order-2 order-1">
                <img
                    src={
                        //@ts-ignore
                        artikel.thumbnail ? `https://data.genbipurwokerto.com/storage/${artikel.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                    className="w-full h-[200px] md:h-[350px] rounded object-cover"
                    alt={
                        //@ts-ignore
                        artikel.title}
                />
                </div>
            </div>

            <main className="grid grid-cols-1 lg:grid-cols-3 md:px-20 px-4 md:gap-20 md:mt-20 md:mb-20">
                <div className="lg:col-span-2 text-gray-800 dark:text-gray-200">

                    <ArticleContent content={
                        //@ts-ignore
                        artikel.content} />

                    <ShareButton />


                </div>

                <div>
                    <div className="bg-gray-50 dark:bg-gray-950 lg:p-10 p-5 rounded">
                        <img
                        src={
                            //@ts-ignore
                            artikel.user.foto ? `https://data.genbipurwokerto.com/storage/${artikel.user.foto}` : "../images/NO IMAGE AVAILABLE.jpg"}
                        className="w-[70px] rounded"
                        alt="avatar"
                        />
                        <h1 className="font-bold mt-4 text-gray-800 dark:text-gray-300">
                        {//@ts-ignore
                        artikel.user.name}
                        </h1>
                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">
                            {//@ts-ignore
                            artikel.user.deskripsi}
                        </p>

                    </div>
                </div>
            </main>

            <hr className="w-[90%] mx-auto" />

            <div className="grid grid-cols-1 lg:gap-10 gap-4 md:px-20 px-5 mb-8 items-center mt-10">
                <div className="mb-5">
                    <h2 className="text-2xl inline-block font-semibold transition-all hover:pr-3 border-b-4 border-blue-700 dark:text-gray-200">
                        KOMENTAR
                    </h2>
                </div>

                {komentar.map((item, index) => (
                    <div className="" key={index}>
                        <div className="flex items-center mb-3">
                             <div className={`w-[50px] h-[50px] text-white flex items-center justify-center rounded-full mr-3 ${warnaProfile}`} >
                                <span className="font-bold">{getInitials(item.nama)}</span>
                            </div>
                            <div className="">
                                <h4 className="text-lg font-bold">{item.nama}</h4>
                                <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px]">{item.email}</p>
                            </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 lg:text-base md:text-sm text-[12px] whitespace-pre-wrap">{item.komentar}</p>
                    </div>
                ))}

                {/* Form Komentar */}
                <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Nama */}
                        <div>
                            <label
                            htmlFor="nama"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                            Nama
                            </label>
                            <input
                            type="text"
                            id="nama"
                            name="nama"
                            value={nama}
                            onChange={(e)=> setNama(e.target.value)}
                            placeholder="Masukkan nama Anda"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                            Email
                            </label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            />
                        </div>
                    </div>

                    {/* Komentar */}
                    <div className="mb-4">
                    <label
                        htmlFor="komentar"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                        Komentar
                    </label>
                    <textarea
                        id="komentar"
                        name="komentar"
                        value={komen}
                        onChange={(e)=> setKomen(e.target.value)}
                        placeholder="Tulis komentar Anda..."
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    </div>

                    {/* Tombol Submit */}
                    <button
                        disabled={loadingKomen}
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                        {loadingKomen ? 'Mengirim...' : 'Kirim Komentar'}
                    </button>
                    {komenEror && <p className="text-red-500 mt-2">{komenEror}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </form>
            </div>




            <hr className="w-[90%] mx-auto" />

            <section className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-0 px-3 lg:px-20 mt-10">
                <div className="lg:col-span-3 mb-5">
                    <h2 className="text-2xl inline-block font-semibold transition-all hover:pr-3 border-b-4 border-blue-700 dark:text-gray-200">
                        ARTIKEL LAINNYA
                    </h2>
                </div>

                {artikelRandom.map((item, index) => (
                    <Link href={`/artikel/${item.slug}`} key={index} className="mb-5 lg:mb-0">
                        <img
                            src={item.thumbnail ? `https://data.genbipurwokerto.com/storage/${item.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                            alt={item.title}
                            className="h-[250px] object-cover w-full rounded"
                        />
                        <h3 className="mt-3 line-clamp-2 text-xl font-bold dark:text-gray-200">
                            {item.title}
                        </h3>
                        <div className="my-5 flex gap-5">
                            <span className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                            <FaUser />
                            <small>{item.user.name}</small>
                            </span>
                            <span className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                            <FaCalendar />
                            <small>{changeDate(new Date(item.published_at))}</small>
                            </span>
                        </div>
                        <p className="text-gray-700 line-clamp-4 dark:text-gray-300 mt-2 text-sm">
                            {item.excerpt}
                        </p>
                    </Link>
                ))}

            </section>
        </main>
    </MainLayout>
  );
};



export default DetailArtikel;
