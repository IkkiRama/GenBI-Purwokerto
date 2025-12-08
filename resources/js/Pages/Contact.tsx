import { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTiktok } from 'react-icons/fa';
import { useTheme } from '@/Hooks/useTheme';
import { Head } from '@inertiajs/react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [judul, setJudul] = useState("");
    const [pesan, setPesan] = useState("");

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



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');


        try {
            const response = await fetch('https://data.genbipurwokerto.com/api/kontak', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({nama, email, judul, pesan}),
            });

            if (!response.ok) {
                throw new Error('Failed to send your message. Please try again later.');
            }

            setSuccessMessage('Pesan Anda berhasil dikirim!');
            setNama("")
            setEmail("")
            setJudul("")
            setPesan("")

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



  const darkModeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-white',
    textPrimary: isDark ? 'text-white' : 'text-gray-800',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    border: isDark ? 'border-gray-600' : 'border-gray-300',
    inputBg: isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900',
    mapOpacity: isDark ? 'opacity-80' : 'opacity-100'
  };

  return (
    <MainLayout title="Contact" isDark={isDark}>
        <Head>
            <meta name="description" content="Hubungi GenBI Purwokerto untuk informasi lebih lanjut mengenai program, kegiatan, dan kontribusi kami dalam mendukung pendidikan dan pemberdayaan masyarakat." />
            <meta name="keywords" content="kontak, hubungi genbi purwokerto, informasi genbi, program genbi purwokerto, beasiswa bank indonesia" />
            <meta property="og:title" content="Kontak - GenBI Purwokerto" />
            <meta property="og:description" content="Hubungi GenBI Purwokerto untuk informasi lebih lanjut mengenai program, kegiatan, dan kontribusi kami." />
            <meta property="og:image" content="https://genbipurwokerto.com/images/logo.png" />
            <meta property="og:url" content="https://genbipurwokerto.com/kontak" />
            <meta property="og:type" content="website" />
            <meta name="twitter:title" content="Kontak - GenBI Purwokerto" />
            <meta name="twitter:description" content="Hubungi GenBI Purwokerto untuk informasi lebih lanjut mengenai program, kegiatan, dan kontribusi kami." />
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
            <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
            </button>
        </div>

      <div className={`min-h-screen ${darkModeClasses.bg}`}>
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left Column - Contact Info & Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 lg:mt-12 lg:ml-10"
            >
              <h1 className={`text-3xl font-bold mb-8 ${darkModeClasses.textPrimary}`}>Kontak Kami</h1>

              {/* Address */}
              <div className="flex items-start gap-3 mb-4">
                <FaMapMarkerAlt className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                <a
                  href="https://maps.app.goo.gl/9iGh4hGHk8z4L2vy8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-blue-500 transition-colors ${darkModeClasses.textSecondary}`}
                >
                  Jl. Jend. Gatot Subroto No.98, Brubahan, Purwanegara, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53116
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 mb-4">
                <FaEnvelope className="text-blue-500 text-xl" />
                <a
                  href="mailto:genbipurwokerto22@gmail.com"
                  className={`hover:text-blue-500 transition-colors ${darkModeClasses.textSecondary}`}
                >
                  genbipurwokerto22@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500 text-xl" />
                <a
                  href="tel:+6289667443651"
                  className={`hover:text-blue-500 transition-colors ${darkModeClasses.textSecondary}`}
                >
                  +62 89667443651
                </a>
              </div>

              {/* Social Media */}
              <h2 className={`text-2xl font-bold mb-4 ${darkModeClasses.textPrimary}`}>Follow Us</h2>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/genbipurwokerto/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 rounded-full bg-white border border-slate-400 text-2xl text-[#E4405F] hover:opacity-80 transition-opacity">
                        <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@genbipurwokerto1177" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-3 rounded-full bg-white border border-slate-400 text-2xl text-[#FF0000] hover:opacity-80 transition-opacity">
                  <FaYoutube />
                </a>
                <a href="https://www.tiktok.com/@genbipurwokerto" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={`p-3 rounded-full bg-white border border-slate-400 text-2xl hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-[#000000]'}`}>
                  <FaTiktok />
                </a>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'}`}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkModeClasses.textSecondary}`}>
                    Nama Kamu <span className="text-blue-500">*</span>
                  </label>
                  <input
                    value={nama}
                    onChange={(e)=> setNama(e.target.value)}
                    type="text"
                    id="name"
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${darkModeClasses.inputBg}`}
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkModeClasses.textSecondary}`}>
                    Email <span className="text-blue-500">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    type="email"
                    id="email"
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${darkModeClasses.inputBg}`}
                    required
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${darkModeClasses.textSecondary}`}>
                    Judul <span className="text-blue-500">*</span>
                  </label>
                  <input
                    value={judul}
                    onChange={(e)=> setJudul(e.target.value)}
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${darkModeClasses.inputBg}`}
                    required
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkModeClasses.textSecondary}`}>
                    Pesan Kamu <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    value={pesan}
                    onChange={(e)=> setPesan(e.target.value)}
                    id="message"
                    rows={6}
                    className={`w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none ${darkModeClasses.inputBg}`}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-medium">
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
              </form>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="w-full h-[450px] rounded-lg shadow-md overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.275747517947!2d109.23545331455244!3d-7.422063594645232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822abb7c155%3A0xb65889e5adffe6bc!2sKantor%20Perwakilan%20Bank%20Indonesia%20Purwokerto!5e0!3m2!1sid!2sid!4v1699427428625!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
