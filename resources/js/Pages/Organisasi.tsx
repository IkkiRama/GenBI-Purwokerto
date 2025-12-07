// pages/Organization.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { Head } from '@inertiajs/react';
import ProfileCard from '@/Components/ProfileCard';


// Types
interface ScholarshipData {
  count: number;
  university: string;
}

interface University {
  name: string;
  logo: string;
  shortName: string;
}

// Constants
const SCHOLARSHIP_DATA: ScholarshipData[] = [
  { count: 50, university: 'UIN SAIZU' },
  { count: 75, university: 'UNSOED' },
  { count: 50, university: 'UMP' },
];

const UNIVERSITIES: University[] = [
  {
    name: 'UIN Prof. K.H. Saifuddin Zuhri',
    shortName: 'UIN SAIZU',
    logo: './images/Logo/UIN.png'
  },
  {
    name: 'Universitas Jenderal Soedirman',
    shortName: 'UNSOED',
    logo: './images/Logo/UNSOED.png'
  },
  {
    name: 'Universitas Muhammadiyah Purwokerto',
    shortName: 'UMP',
    logo: './images/Logo/UMP.png'
  }
];



// Components
const AnimatedCount: React.FC<{ count: number; university: string }> = ({ count, university }) => {
  const [currentCount, setCurrentCount] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = count / steps;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      setCurrentCount((prevCount) => {
        const nextCount = prevCount + increment;
        return nextCount >= count ? count : nextCount;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className={`text-4xl font-bold mb-2 text-center ${
          isDark ? 'text-blue-400' : 'text-blue-600'
        }`}
      >
        {Math.round(currentCount)}
      </motion.h3>
      <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {university}
      </p>
    </motion.div>
  );
};

const UniversityCard: React.FC<{ university: University; index: number }> = ({ university, index }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-32 flex items-center justify-center mb-4">
        {/* Next.js Image optimization */}
        <img
          src={university.logo}
          alt={university.name}
          className="max-h-full max-w-[180px] object-contain"
        />
      </div>
      <h3 className={`text-center font-semibold mb-2 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {university.shortName}
      </h3>
      <p className={`text-center text-sm ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {university.name}
      </p>
    </motion.div>
  );
};


// Main Component
const Organization: React.FC = () => {
    const [struktur, setStruktur] = useState([]);
    const [error, setError] = useState();

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
        const fetchStruktur = async () => {
            try {
                const response = await fetch("https://data.genbipurwokerto.com/api/struktur");
                const result = await response.json();
                if (result.success) {
                setStruktur(result.data);
                } else {
                console.error("Failed to fetch struktur:", result.message);
                }
            } catch (error) {
                setError(error)
                console.error("Error fetching struktur:", error);
            }
        };
        fetchStruktur();
    }, []);

    if (struktur.length <= 0) return(
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

  if (struktur.length > 0) return (
    <MainLayout isDark={isDark} title="Organisasi">
        <Head>
            <meta name="description" content="Pelajari lebih lanjut tentang struktur organisasi GenBI Purwokerto dan peran-peran penting dalam mendukung kegiatan sosial dan pemberdayaan masyarakat." />
            <meta name="keywords" content="organisasi, genbi purwokerto, struktur organisasi, kepengurusan genbi, peran staff genbi" />
            <meta property="og:title" content="Organisasi - GenBI Purwokerto" />
            <meta property="og:description" content="Pelajari lebih lanjut tentang struktur organisasi GenBI Purwokerto." />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content="https://genbipurwokerto.com/organisasi" />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content="Organisasi - GenBI Purwokerto" />
            <meta name="twitter:description" content="Pelajari lebih lanjut tentang struktur organisasi GenBI Purwokerto." />
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

      <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
        <div className="container mx-auto px-4 pb-16 pt-16 lg:pt-32">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              className={`text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              GenBI Purwokerto
            </motion.h1>
            <motion.h2
              className={`text-xl ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Di Bawah Naungan KPW BI Purwokerto
            </motion.h2>
          </div>

          {/* BI Logo */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/39/BI_Logo.png"
              alt="Bank Indonesia"
              className="max-w-[250px]"
            />
          </motion.div>

          {/* Universities Section */}
          <div className="mb-16">
            <motion.h2
              className={`text-2xl font-bold text-center mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Universitas Anggota
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {UNIVERSITIES.map((uni, index) => (
                <UniversityCard key={uni.shortName} university={uni} index={index} />
              ))}
            </div>
          </div>

          {/* Scholarship Statistics */}
          <div className="mb-16">
            <motion.h2
              className={`text-2xl font-bold text-center mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Jumlah Mahasiswa Penerima Beasiswa
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {
              //@ts-ignore
              SCHOLARSHIP_DATA.map((item, index) => (
                <AnimatedCount
                  key={item.university}
                  count={item.count}
                  university={item.university}
                />
              ))}
            </div>
          </div>

          {/* Profile Messages Section */}
          <section className="py-20 relative">
            <div className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
                : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent'
            }`} />

            <div className="container mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className={`text-4xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  PESAN GENBI
                </h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mt-4" />
             </motion.div>

              {/* Presidents Section */}
              <div className="mb-16">
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Presiden Komisariat
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'president')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Secretaries Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Sekretaris Umum
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'secretary')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Treasurer Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Bendahara Umum
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'treasure')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

              {/* Treasurer Section */}
              <div>
                <motion.h3
                  className={`text-2xl font-semibold text-center my-8 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Deputi
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {struktur
                    .filter(profile => profile.type === 'deputy')
                    .map((profile, index) => (
                      <ProfileCard
                        key={profile.id}
                        profile={profile}
                        index={index}
                      />
                    ))}
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Organization;
