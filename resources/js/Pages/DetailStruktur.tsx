import React, { useEffect, useState } from "react";
import MainLayout from '@/Layouts/MainLayout';
import NotFound from "@/Components/NotFound";
import { Head } from "@inertiajs/react";
import { useTheme } from "@/Hooks/useTheme";

interface DetailStrukturProps {
  periode: string;
  namaBidang: string;
}

//@ts-ignore
const DetailStruktur = React.FC<DetailStrukturProps> = ({periode, namaBidang}) => {
    const [struktur, setStruktur] = useState(null);
    const [members, setMembers] = useState([]);
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://data.genbipurwokerto.com/api/struktur/${periode}/${namaBidang}`
        );
        const result = await response.json();

        if (result.success) {
          setStruktur(result.data.struktur);
          setMembers(result.data.member);
        } else {
            setError(result.message); // Tangkap error jika ada
            console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        setError(error.message); // Tangkap error jika ada
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);


  if (struktur === null) return(
    <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
        <img
            src='../../../images/logo.png'
            className="lg:w-1/4 w-[80%] h-[40%]"
            alt='icon-splash'
        />
        <div className="flex items-center justify-center">
            <img src="../../../images/Loader.svg" alt="loader image" className='w-10 mr-5' />
            <p>Sedang Memuat Data</p>
        </div>
    </div>
  );

  if (error) return <NotFound/>;

  // Manipulasi format jabatan
  const bidang = struktur.jabatan.split(" ")[1]; // Mengambil kata setelah "Deputi"
  const formattedBidang = `Bidang ${bidang} ${periode}`;

  // Grouping members by department
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.departemen]) {
      acc[member.departemen] = [];
    }
    acc[member.departemen].push(member);
    return acc;
  }, {});

  if (struktur !== null) return (
    <MainLayout isDark={isDark} title={`Detail Struktur ${namaBidang} Periode ${periode}`}>
        <Head>
            <meta name="description" content={`Pelajari lebih lanjut mengenai struktur ${namaBidang} organisasi GenBI Purwokerto periode ${periode} dan bagaimana peran setiap anggotanya mendukung program kami.`} />
            <meta name="keywords" content="struktur organisasi, genbi purwokerto, peran staff, struktur genbi, kepengurusan genbi purwokerto" />
            <meta property="og:title" content={`Detail Struktur ${namaBidang} Periode ${periode}`} />
            <meta property="og:description" content={`Pelajari lebih lanjut mengenai struktur ${namaBidang} organisasi GenBI Purwokerto periode ${periode} dan bagaimana peran setiap anggotanya mendukung program kami.`} />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content={`https://genbipurwokerto.com/organisasi/struktur/${periode}/${namaBidang}`} />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content={`Detail Struktur ${namaBidang} Periode ${periode}`} />
            <meta name="twitter:description" content={`Pelajari lebih lanjut mengenai struktur ${namaBidang} organisasi GenBI Purwokerto periode ${periode} dan bagaimana peran setiap anggotanya mendukung program kami.`} />
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

        <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <section className="md:py-20 py-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-12 lg:gap-10 min-h-screen items-start">
                    {/* Bagian Kiri: Detail Struktur */}
                    <div className="order-1 space-y-6 md:sticky top-28">
                        <h1 className="text-3xl font-bold mb-8 md:text-left text-center">Detail Struktur</h1>
                        <img
                        src={`https://data.genbipurwokerto.com/storage/${struktur.foto}`}
                        alt={struktur.jabatan}
                        className="lg:w-[90%] w-full lg:h-[550px] h-[450px] rounded-xl bg-slate-700 bg-cover"
                        />
                    </div>

                    {/* Bagian Kanan: Informasi dan Member */}
                    <div className="order-2 relative col-span-2">
                        <div className="flex justify-center items-center">
                        <h2 className="text-lg mt-4 text-center font-bold inline-flex items-center gap-4 text-blue-800">
                            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500 rounded-full" />
                            {formattedBidang}
                            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
                        </h2>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-semibold mt-5">Deputi</h3>
                        <p className="text-lg">{struktur.nama_lengkap}</p>
                        <h3 className="text-xl lg:text-2xl font-semibold mt-5">
                        Quote
                        </h3>
                        <p className="text-lg italic">{struktur.quote}</p>

                        {/* Menampilkan Departemen dan Anggota */}
                        {Object.keys(groupedMembers).map((departemen, index) => (
                        <div key={index} className="mt-5">
                            {/* Nama Departemen Ditampilkan Sekali */}
                            <h3 className="text-xl lg:text-2xl font-semibold">{departemen}</h3>

                            {/* Menampilkan Anggota di bawah Departemen */}
                            {groupedMembers[departemen].map((member, idx) => (
                            <p key={idx} className="text-lg">{member.nama}</p>
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    </MainLayout>
  );
};



export default DetailStruktur;
