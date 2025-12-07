import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { motion } from 'framer-motion';
import { Play, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }
};

// const podcastData = [
//     {
//       title: 'Ngobrol Asik dan Inspiratif Bersama Kepala KPw Bank Indonesia Purwokerto - GENBI SAY HI! EPISODE 2',
//       videoId: 'P7AfkIgCbHs',
//       youtubeUrl: 'https://youtu.be/P7AfkIgCbHs?si=AhOXRRphv_WVW-kc',
//       date: '2024',
//       description: 'Halo Sobat GenBI👋🏻 Selamat datang di Podcast GenBI Say Hi Episode 2! Dalam episode kali ini, kami menghadirkan narasumber spesial langsung dari Bank Indonesia yaitu Ibu Christoveny selaku Kepala KPw Bank Indonesia Purwokerto. Untuk menjadi seorang pemimpin pastinya harus melewati begitu banyak perjalanan dan tantangan. Dalam podcast GenBi Say Hi kali ini akan membahas tentang perjalanan karir Ibu Christoveny yang penuh inspirasi serta motivasi sebagai seorang pemimpin.'
//     },
//     {
//       title: 'PODCAST GETAH 2 - GENBI 2024',
//       videoId: '5JMuvkqk_wU',
//       youtubeUrl: 'https://youtu.be/5JMuvkqk_wU?si=i1aNklK6eBMmk9MH',
//       date: '2024',
//       description: 'Hallo Sobat GenBI✨ Kami GenBI Purwokerto hadir kembali membawakan podcast yang menarik dan edukatif dengan Tema “Kesadaran Diabetes di Usia Muda sebagai Upaya Pencegahan Gagal Ginjal di Era Modern” Gagal ginjal adalah kondisi serius di mana ginjal tidak mampu menjalankan fungsinya dengan baik untuk menyaring limbah dari darah. Penyebab gagal ginjal beragam, mulai dari komplikasi diabetes, tekanan darah tinggi, hingga penggunaan obat tertentu. Penyakit ini dapat menyerang siapa saja, tidak mengenal usia, dan seringkali terlambat disadari. Bagaimana mengenali gejala awal gagal ginjal? Dan apa saja yang bisa kita lakukan sebagai upaya pencegahan di era modern ini? 😉 Yuk tonton dan simak videonya agar kamu lebih memahami pentingnya menjaga kesehatan ginjal sejak dini! 🎧'
//     },
//     {
//       title: 'PODCAST GETAH 1 - GENBI 2024',
//       videoId: 'zkXqRLtgYKg',
//       youtubeUrl: 'https://youtu.be/zkXqRLtgYKg?si=1nBNelh0tLz3Tg8U',
//       date: '2024',
//       description: 'Hallo Sobat GenBI✨ Kami GenBI Purwokerto hadir kembali membawakan podcast yang menarik dan spesial dengan Tema “Kesadaran Diabetes di Usia Muda sebagai Upaya Pencegahan Gagal Ginjal di Era Modern” Diabetes melitus merupakan suatu kelompok penyakit metabolik dengan karakteristik hiperglikemia yang terjadi karena kelainan sekresi insulin, kerja insulin atau keduanya (PERKENI, 2021). Diabetes bukan hanya menyerang orang tua namun juga dewasa maupaun remaja. Diabetes juga dapat menyebabkan komplikasi seperti gagal ginjal. Nah, bagaimana si gejala serta tips dan trik agar terhindar dari penyakit diabetes di usia muda sebagai upaya pencegahan gagal ginjal di era modern? 🤔 Yuk tonton dan simak videonya supaya kamu tahu ya '
//     },
//     {
//       title: 'Sapa GenBI Part 3 : "Be The Changemarkers : Beasiswa Bank Indonesia Creating a Better Tomorrow"',
//       videoId: 'KM1LP6oklOc',
//       youtubeUrl: 'https://youtu.be/KM1LP6oklOc?si=Sip5fHvuHlbAdZT0',
//       date: '2023',
//       description: 'Hallo Sobat GenBI✨ Kami GenBI Purwokerto kembali menyapa sobat semua melalui podcast yang sangat spesial dengan tema: "Be The Changemakers: Beasiswa Bank Indonesia Creating a Better Tomorrow". Sebagai generasi muda, kita adalah agent of change bagi bangsa. Untuk menjadi pribadi yang berkualitas, tentunya membutuhkan ruang untuk meningkatkan skill, pengetahuan, dan pengalaman. Salah satunya melalui Komunitas GenBI. Nah, seperti apakah pengalaman, kesan, serta manfaat yang didapat dengan bergabung ke dalam Komunitas GenBI? 🤔 Penasaran?🧐 Yuk simak informasi selengkapnya di 👇🏻 '
//     },
//     {
//       title: 'Gaya Hidup Sehat dengan Gizi Seimbang dan Diet Sehat - PODCAST GENBIRA #2',
//       videoId: '-6ZF3NmMOyk',
//       youtubeUrl: 'https://youtu.be/-6ZF3NmMOyk?si=0hTJ3YvTDvM31lkm',
//       date: '2023',
//       description: 'Hallo Sobat GenBI✨ Dalam rangka memeriahkan Hari Gizi Nasional 2024 yang ke-64, kami GenBI Purwokerto hadir kembali membawakan podcast yang menarik dan spesial dengan Tema “Gaya Hidup Sehat dengan Gizi Seimbang dan Diet Sehat” Hidup Sehat adalah hidup yang bebas dari semua masalah rohani (mental) ataupun masalah jasmani (fisik). Dalam hal mengupayakan hidup sehat, banyak orang sudah menerapkan gaya hidup sehat dengan gizi seimbang dan diet sehat dalam kesehariannya. Nah, bagaimana si tips dan trik menerapkan gaya hidup sehat dengan gizi seimbang dan diet sehat? 🤔 Yuk tonton dan simak videonya supaya kamu tahu ya '
//     },
//     {
//       title: 'Sapa GenBI Part 2 : "Building Connections: How GenBI Fosters Collaboration and Teamwork"',
//       videoId: 'a76zg9l4wWY',
//       youtubeUrl: 'https://youtu.be/a76zg9l4wWY?si=5T5kUzW8-M67ePTz',
//       date: '2023',
//       description: 'Hallo Sobat GenBI✨ Kami GenBI Purwokerto hadir kembali membawakan podcast yang menarik dan spesial dengan tema "Building Connections: How GenBI Fosters Collaboration and Teamwork" Dalam berorganisasi, kolaborasi dan kerja sama tim merupakan faktor penting dalam mencapai tujuan organisasi karena dapat membawa banyak manfaat, seperti meningkatkan kinerja, mempercepat pencapaian tujuan, dan memperkuat ikatan antar anggota tim. Nah, bagaimana si tips dan trik yang harus dilakukan dalam menumbuhkan kolaborasi dan kerja sama tim yang efektif? 🤔 Yuk simak informasi selengkapnya di 👇🏻 '
//     },
//     {
//       title: 'Sapa GenBI Part 1 : Unlock Your Potential With GenBI',
//       videoId: 'QuctlZzqWDM',
//       youtubeUrl: 'https://youtu.be/QuctlZzqWDM?si=XGazqNPUIKA11k4Z',
//       date: '2023',
//       description: 'Hello Sobat GenBl Purwokerto! Kami hadir lagi dengan agenda Sapa GenBI 2023✨ Pada sesi ini Sapa GenBI Part 1 ini kami hadir untuk kamu yang punya rasa ingin tahu tinggi tentang GenBI dan kegiatan apa saja yang ada didalamnya 💡 Pada Sapa GenBI 1 ini akan dibahas mendetail seputar GenBI dengan topik pembahasan "Unlock Your Potential With GenBI" yang dibawakan oleh salah satu presiden kita yaitu Shabrina Evita Rizki alias Ka Kiki selaku Presiden GenBI Purwokerto Komisariat UNSOED Periode 2023-2024 😉'
//     },
//     {
//       title: 'Tips and Trik Menghadapi "Quarter Life Crisis" - PODCAST GENBIRA #1',
//       videoId: '_-Pf3OuZYTc',
//       youtubeUrl: 'https://youtu.be/_-Pf3OuZYTc?si=-mS6pUrbVZQibFI2',
//       date: '2023',
//       description: 'Hallo Sobat GenBI✨ Dalam rangka memeriahkan World Mental Health Day, kami GenBI Purwokerto Hadir kembali membawakan podcast yang menarik dan spesial mengenai "Quarter Life Crisis" Quarter life crisis merupakan suatu kondisi atau keadaan bagi remaja usia antara 18-25 tahun yang berada di fase bimbang tentang tujuan hidup kita kedepannya seperti apa, mau jadi apa dan bagaimana. Nah, bagaimana si tips dan trik yang harus dilakukan dalam menghadapi quarter life crisis ? 🤔 Yuk tonton dan simak videonya supaya kamu tahu ya '
//     },
//     {
//       title: 'Podcast GenBI "Bersemi" (Tips Menghadapi Resesi Ekonomi Bagi Mahasiswa)',
//       videoId: 'tFBESeBc5UA',
//       youtubeUrl: 'https://youtu.be/tFBESeBc5UA',
//       date: '2023',
//       description: 'Hallo sobat GenBI🤩🤩 Ada podcast dari bidang ekonomi loh, yaitu Bersemi (Berdiskusi seputar ekonomi) Podcast ini mengambil tema "Tips Menghadapi Resesi Ekonomi Bagi Mahasiswa" dengan pemateri yaitu Ibu Ida Puspitarini, S.E, Ak., M.Si, CA. Kira-kira apa saja yaa tips yang dibutuhkan bagi mahasiswa untuk menghadapi resesi ekonomi dan dapat manajemen keuangan dengan baik?🤔  Yuk simak videonya di YouTube GenBI Purwokerto😍'
//     }
//   ];


const PodcastCard = ({ title, videoId, youtubeUrl, date, description, textClass, containerClass, buttonClass }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div {...fadeInUpAnimation} className="mb-6">
      <div className={`rounded-xl overflow-hidden shadow-lg ${containerClass}`}>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-white bg-blue-600 rounded-full">
                  {date}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${textClass}`}>{title}</h3>
                {description !== '-' && (
                  <>
                    <div className={`text-sm ${textClass} opacity-80 ${isExpanded ? '' : 'line-clamp-3'}`}>
                      {description}
                    </div>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className={`text-blue-500 text-sm mt-2 flex items-center hover:underline`}
                    >
                      {isExpanded ? 'Lihat lebih sedikit' : 'Lihat selengkapnya'}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </>
                )}
              </div>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg ${buttonClass} text-sm w-fit mt-3`}
              >
                <Play size={16} />
                <span>Tonton di YouTube</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
    const [podcasts, setPodcasts] = useState([]);
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
            const response = await fetch("https://data.genbipurwokerto.com/api/podcast");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setPodcasts(data.data); // Simpan data ke state
        } catch (err) {
            setError(err.message); // Tangkap error jika ada
        }
    };

    fetchData();
    }, []); // Array kosong memastikan ini hanya dijalankan sekali

    if (podcasts.length <= 0) return(
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

  if (podcasts.length > 0) return (
    <MainLayout isDark={isDark} title="Podcast">
        <Head>
            <meta name="description" content="Dengarkan podcast GenBI Purwokerto yang membahas berbagai topik inspiratif mengenai generasi muda, ekonomi, sosial, dan pendidikan." />
            <meta name="keywords" content="podcast, genbi purwokerto, podcast genbi, generasi muda, ekonomi, sosial, pendidikan" />
            <meta property="og:title" content="Podcast - GenBI Purwokerto" />
            <meta property="og:description" content="Dengarkan podcast GenBI Purwokerto yang membahas berbagai topik inspiratif mengenai generasi muda, ekonomi, sosial, dan pendidikan." />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content="https://genbipurwokerto.com/podcast" />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content="Podcast - GenBI Purwokerto" />
            <meta name="twitter:description" content="Dengarkan podcast GenBI Purwokerto yang membahas berbagai topik inspiratif mengenai generasi muda, ekonomi, sosial, dan pendidikan." />
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

      <div className="py-8 px-4 relative min-h-screen pt-20">
        <div className={`absolute inset-0 ${styles.gradient}`} />
        <div className="container mx-auto relative z-10">
          <motion.div {...fadeInUpAnimation} className="text-center mb-8">
            <h1 className={`text-2xl sm:text-3xl font-bold ${styles.text}`}>GenBI Podcast Series</h1>
            <p className={`mt-3 text-base sm:text-lg ${styles.text} opacity-80`}>
              Kumpulan podcast inspiratif dan edukatif dari GenBI Purwokerto
            </p>
            <div className="w-16 h-1 bg-blue-500 mx-auto mt-3" />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {podcasts.map((podcast, index) => (
              <PodcastCard
                key={index}
                {...podcast}
                textClass={styles.text}
                containerClass={styles.container}
                buttonClass={styles.button}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
