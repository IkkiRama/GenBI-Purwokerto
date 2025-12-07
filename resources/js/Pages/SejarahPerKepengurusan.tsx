// pages/SejarahPerKepengurusan.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import ProfileCard from '@/Components/ProfileCard';
import { Head } from '@inertiajs/react';


interface SejarahPerKepengurusanProps {
  periode: string;
}

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};


// Main Component
//@ts-ignore
const SejarahPerKepengurusan = React.FC<SejarahPerKepengurusanProps> = ({periode}) => {
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

    const fetchStruktur = async () => {
        try {
            const response = await fetch(`https://data.genbipurwokerto.com/api/struktur/${periode}`);
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

    useEffect(() => {
        fetchStruktur();
    }, []);

    if (struktur.length <= 0) return(
        <div className='flex justify-center items-center flex-col fixed z-[999] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] w-screen h-screen bg-white gap-3'>
            <img
                src='../../images/logo.png'
                className="lg:w-1/4 w-[80%] h-[40%]"
                alt='icon-splash'
            />
            <div className="flex items-center justify-center">
                <img src="../../images/Loader.svg" alt="loader image" className='w-10 mr-5' />
                <p>Sedang Memuat Data</p>
            </div>
        </div>
    );

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

    if (error) return <p>Error: {error}</p>;

  if (struktur.length > 0) return (
    <MainLayout isDark={isDark} title={`Struktur GenBI Purwokerto ${periode} - GenBI Purwokerto`}>
        <Head>
            <meta name="description" content="Pelajari sejarah setiap kepengurusan yang telah ada di GenBI Purwokerto dan kontribusi yang telah diberikan dalam perkembangan organisasi." />
            <meta name="keywords" content="sejarah kepengurusan, genbi purwokerto, sejarah organisasi genbi, kontribusi genbi purwokerto" />
            <meta property="og:title" content={`Struktur GenBI Purwokerto ${periode} - GenBI Purwokerto`} />
            <meta property="og:description" content="Pelajari sejarah setiap kepengurusan yang telah ada di GenBI Purwokerto dan kontribusinya." />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content={`https://genbipurwokerto.com/sejarah-kepengurusan/${periode}`} />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content={`Struktur GenBI Purwokerto ${periode} - GenBI Purwokerto`} />
            <meta name="twitter:description" content="Pelajari sejarah setiap kepengurusan yang telah ada di GenBI Purwokerto dan kontribusinya." />
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
        <div className="container mx-auto lg:py-0 py-8 px-4 relative min-h-screen lg:pt-28 lg:pb-20">
            <div className="mx-auto relative z-10">
                <motion.div {...fadeInUpAnimation} className="text-center mb-8">
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>Kepengurusan GenBI {periode}</h1>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
                </motion.div>
            </div>

          {/* Profile Messages Section */}
          <section className="pb-20 pt-3 relative">
            <div className={`absolute inset-0 ${
              isDark
                ? 'bg-gradient-to-b from-transparent via-gray-800/30 to-transparent'
                : 'bg-gradient-to-b from-transparent via-blue-50/30 to-transparent'
            }`} />

            <div className="container mx-auto relative z-10">
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

export default SejarahPerKepengurusan;
