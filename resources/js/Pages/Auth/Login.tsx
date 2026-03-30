import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { useTheme } from '@/Hooks/useTheme';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';

const Login = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL_LOGIN || 'http://localhost:8000';


  const themeHook = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (themeHook?.isDark !== undefined) return themeHook.isDark;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored) return stored === 'dark';
    return typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    //@ts-ignore
    themeHook?.setTheme?.(isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <MainLayout isDark={isDark} title="Masuk">
      <Head>
        <title>Masuk - GenBI</title>
        <meta
          name="description"
          content="Masuk ke platform GenBI untuk mengakses fitur dan konten eksklusif."
        />
      </Head>

      {/* Theme toggle */}
      <div className="fixed right-5 bottom-24 z-50">
        <button
          aria-label="Toggle theme"
          aria-pressed={isDark}
          onClick={() => setIsDark((s) => !s)}
          className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">
            {isDark ? '🌞 Light' : '🌙 Dark'}
          </span>
        </button>
      </div>

      <main className="container mx-auto py-20 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          className={`w-full max-w-md p-8 rounded-3xl shadow-lg border ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Masuk ke GenBI
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Akses fitur eksklusif dan jelajahi dunia GenBI
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={() => {
                window.location.href = `${BASE_URL}/auth-google-redirect`
            }}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border shadow-sm transition hover:scale-[1.02]
              bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Lanjutkan dengan Google
            </span>
          </button>

          {/* Info */}
          <div className="mt-6 flex gap-3 p-4 rounded-xl border bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
            <Info className="w-6 h-6 text-blue-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Pengguna baru akan otomatis dibuat saat login pertama kali dengan Google.
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Dengan masuk, Anda setuju dengan{' '}
            <a href="/syarat" className="text-blue-500 hover:underline">
              syarat
            </a>{' '}
            dan{' '}
            <a href="/kebijakan-privasi" className="text-blue-500 hover:underline">
              kebijakan privasi
            </a>
          </p>
        </motion.div>
      </main>
    </MainLayout>
  );
};

export default Login;
