import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const Kuis = () => {
    const [isDark, setIsDark] = useState(false);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // THEME
    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const dark = stored === 'dark';
        setIsDark(dark);
        if (dark) document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // FETCH QUIZ
    useEffect(() => {
        fetch(`${BASE_URL}/api/kuis`)
            .then(res => res.json())
            .then(res => {
                setQuizzes(res.data || []);
            })
            .finally(() => setLoading(false));
    }, []);

    // START QUIZ
    const startQuiz = async (uuid: string) => {
        try {
            const res = await fetch(`${BASE_URL}/api/kuis/${uuid}`, {
                credentials: 'include'
            });

            // if (res.status === 401) {
            //     window.location.href = '/masuk';
            //     return;
            // }

            const data = await res.json();

            if (!data.success) {
                alert("Gagal memulai kuis");
                return;

            }            // OPTIONAL: simpan biar ga fetch ulang (boleh skip)
            localStorage.setItem(`quiz_${uuid}`, JSON.stringify(data.data));

            // redirect
            window.location.href = `/kuis/mulai/${uuid}`;

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setSelectedQuiz(null);
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <MainLayout isDark={isDark} title="Kuis Nusantara">
            <Head title="Kuis Nusantara" />

            {/* TOGGLE */}
            <div className="fixed right-5 bottom-24 z-50">
                <button
                    aria-label="Toggle theme"
                    aria-pressed={isDark}
                    onClick={() => setIsDark(s => !s)}
                    className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border bg-white/80 dark:bg-gray-800/80 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span className="pointer-events-none dark:text-white text-gray-900 font-semibold">{isDark ? '🌞 Light' : '🌙 Dark'}</span>
                </button>
            </div>

            <main className="container mx-auto lg:pt-28 lg:pb-20 py-20 px-6">

                {/* HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-300">
                        Kuis Ekonomi
                    </h1>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        Siap jadi generasi melek ekonomi? Yuk uji pengetahuanmu tentang inflasi, suku bunga, dan kebijakan Bank Indonesia lewat kuis seru ini!
                    </p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-4" />
                </motion.header>

                {/* SKELETON */}
                {loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse rounded-2xl border p-5">
                                <div className="h-5 bg-gray-300 mb-4 w-2/3" />
                                <div className="h-4 bg-gray-200 mb-2 w-full" />
                                <div className="h-4 bg-gray-200 w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* EMPTY */}
                {!loading && quizzes.length === 0 && (
                    <div className="text-center text-gray-500">
                        Belum ada kuis tersedia
                    </div>
                )}

                {/* QUIZ LIST */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz, i) => (
                        <motion.div
                            key={quiz.uuid}
                            onClick={() => setSelectedQuiz(quiz)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.03 }}
                            className={`rounded-2xl border p-5 flex flex-col justify-between cursor-pointer ${
                                isDark
                                ? 'bg-gray-900 border-gray-800'
                                : 'bg-white border-gray-200'
                            }`}
                        >
                            <div>
                                {/* TITLE */}
                                <h3 className="font-bold text-lg mb-2">
                                    {quiz.title}
                                </h3>

                                {/* DESC */}
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                    {quiz.description}
                                </p>

                                {/* INFO */}
                                <div className="flex flex-wrap gap-2 text-xs mb-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                        {quiz.duration_minutes} menit
                                    </span>

                                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
                                        {quiz.jumlah_soal} soal
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {selectedQuiz && (
                    <div
                        onClick={() => setSelectedQuiz(null)}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-lg rounded-2xl p-6 ${
                                isDark ? 'bg-gray-900 text-white' : 'bg-white'
                            }`}
                        >
                            {/* TITLE */}
                            <h2 className="text-xl font-bold mb-3">
                                {selectedQuiz.title}
                            </h2>

                            {/* FULL DESC */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                                {selectedQuiz.description}
                            </p>

                            {/* INFO */}
                            <div className="mb-4 flex gap-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                                {selectedQuiz.duration_minutes} menit
                                </span>
                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                                    {selectedQuiz.jumlah_soal} soal
                                </span>
                            </div>

                            {/* ACTION */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setSelectedQuiz(null)}
                                    className="px-4 py-2 rounded-lg border"
                                >
                                    Tutup
                                </button>

                                <button
                                    onClick={() => startQuiz(selectedQuiz.uuid)}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                >
                                Mulai Kuis
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </MainLayout>
    );
};

export default Kuis;
