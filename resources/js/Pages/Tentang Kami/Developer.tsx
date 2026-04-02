import MainLayout from '@/Layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Developer = () => {
    const [developers, setDevelopers] = useState<any>({});
    const [selectedDev, setSelectedDev] = useState<any>(null);
    const [activePeriode, setActivePeriode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const sectionRefs = useRef<any>({});

    const isDark = useSelector((state) => state.theme.isDark);

    // Sync theme
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        }, [isDark]);

    // GROUPING
    const groupByPeriode = (data: any[]) => {
        return data.reduce((acc, item) => {
            if (!acc[item.periode]) acc[item.periode] = [];
            acc[item.periode].push(item);
            return acc;
        }, {});
    };

    // FETCH
    useEffect(() => {
        fetch(`${BASE_URL}/api/developer`)
            .then(res => res.json())
            .then(res => {
                const grouped = groupByPeriode(res.data);
                setDevelopers(grouped);
            })
            .finally(() => setLoading(false));
    }, []);

    const sortedPeriode = Object.keys(developers).sort((a, b) =>
        b.localeCompare(a)
    );

    // SCROLL DETECT ACTIVE PERIODE
    useEffect(() => {
        const handleScroll = () => {
            let current = null;

            sortedPeriode.forEach((periode) => {
                const el = sectionRefs.current[periode];
                if (!el) return;

                const rect = el.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    current = periode;
                }
            });

            if (current) setActivePeriode(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sortedPeriode]);

    const scrollToPeriode = (periode: string) => {
        const el = sectionRefs.current[periode];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <MainLayout title="Developer">
            <Head title="Developer GenBI" />

            <main className="container mx-auto lg:pt-28 lg:pb-20 py-20 px-6">

                {/* TITLE */}
                <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-300">Tim Developer</h1>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        History tim pengembang website GenBI Purwokerto
                    </p>
                    <div className="w-16 h-1 bg-blue-500 mx-auto mt-4" />
                </motion.header>

                {/* TIMELINE INTERACTIVE */}
                <div className="flex overflow-x-auto gap-8 mb-16 pb-4">
                    {sortedPeriode.map((periode) => (
                        <button
                            key={periode}
                            onClick={() => scrollToPeriode(periode)}
                            className={`flex flex-col items-center min-w-[100px] transition ${
                                activePeriode === periode
                                    ? 'text-blue-500'
                                    : 'opacity-60'
                            }`}
                        >
                            <div className={`w-4 h-4 rounded-full ${
                                activePeriode === periode
                                    ? 'bg-blue-500'
                                    : 'bg-gray-400'
                            }`} />
                            <div className="w-1 h-8 bg-gray-300" />
                            <span className="text-sm font-semibold">
                                {periode}
                            </span>
                        </button>
                    ))}
                </div>

                {/* SKELETON */}
                {loading && (
                    <div className="grid md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded-2xl border p-4"
                            >
                                <div className="h-40 bg-gray-300 mb-4 rounded-lg" />
                                <div className="h-4 bg-gray-300 mb-2 w-2/3" />
                                <div className="h-3 bg-gray-200 w-1/2" />
                            </div>
                        ))}
                    </div>
                )}

                {/* CONTENT */}
                {!loading && sortedPeriode.map((periode) => (
                    <motion.div
                        key={periode}
                        ref={(el) => (sectionRefs.current[periode] = el)}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h2 className="text-2xl font-bold mb-8">
                            {periode}
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {developers[periode].map((dev: any) => (
                                <motion.div
                                    key={dev.id}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedDev(dev)}
                                    className="cursor-pointer rounded-2xl overflow-hidden border bg-white dark:bg-gray-800"
                                >
                                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                                        {dev.image ? (
                                            <img
                                                src={
                                                    dev?.image
                                                        ? `${BASE_URL}/storage/${dev?.image}`
                                                        : "../images/NO IMAGE AVAILABLE.jpg"
                                                }
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold">
                                                {dev.nama.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold">
                                            {dev.nama}
                                        </h3>
                                        <p className="text-blue-500 text-sm">
                                            {dev.role}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* MODAL */}
                <AnimatePresence>
                    {selectedDev && (
                        <motion.div
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDev(null)}
                        >
                            <motion.div
                                onClick={(e) => e.stopPropagation()}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-lg w-full shadow-xl"
                            >
                                {/* IMAGE */}
                                <div className="h-56 mb-4 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
                                    {selectedDev.image ? (
                                        <img
                                            src={
                                                selectedDev?.image
                                                    ? `${BASE_URL}/storage/${selectedDev?.image}`
                                                    : "../images/NO IMAGE AVAILABLE.jpg"
                                            }
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-4xl font-bold">
                                            {selectedDev.nama.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* NAME */}
                                <h2 className="text-xl font-bold mb-1">
                                    {selectedDev.nama}
                                </h2>

                                {/* ROLE */}
                                <p className="text-blue-500 mb-3">
                                    {selectedDev.role}
                                </p>

                                {/* DESC */}
                                <p className="text-sm mb-5 text-gray-600 dark:text-gray-300">
                                    {selectedDev.deskripsi_role}
                                </p>

                                {/* CONTACT */}
                                <div className="flex flex-wrap gap-3 text-sm mb-6">

                                    {/* IG */}
                                    {selectedDev.sosmed_ig && (
                                        <a
                                            href={`https://instagram.com/${selectedDev.sosmed_ig}`}
                                            target="_blank"
                                            className="px-3 py-1 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
                                        >
                                            Instagram
                                        </a>
                                    )}

                                    {/* WA */}
                                    {selectedDev.sosmed_wa && (
                                        <a
                                            href={`https://wa.me/${selectedDev.sosmed_wa.replace('+','')}`}
                                            target="_blank"
                                            className="px-3 py-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition"
                                        >
                                            WhatsApp
                                        </a>
                                    )}

                                    {/* EMAIL (conditional tampil) */}
                                    {selectedDev.email && (
                                        <a
                                            href={`mailto:${selectedDev.email}`}
                                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                        >
                                            Email
                                        </a>
                                    )}
                                </div>

                                {/* CLOSE */}
                                <button
                                    onClick={() => setSelectedDev(null)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                                >
                                    Tutup
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </MainLayout>
    );
};

export default Developer;
