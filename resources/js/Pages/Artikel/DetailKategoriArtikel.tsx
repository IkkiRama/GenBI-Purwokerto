import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";

const DetailKategoriArtikel = ({ slug }: { slug: string }) => {
    const [kategori, setKategori] = useState<any>(null);
    const [artikels, setArtikels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const MotionLink = motion(Link);
    const isDark = useSelector((state) => state.theme.isDark);

    // Sync theme
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    // FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${BASE_URL}/api/artikel/kategori/${slug}`);

                if (!res.ok) throw new Error('Fetch gagal');

                const json = await res.json();
                console.log('API:', json);

                setKategori(json.kategori);
                setArtikels(json.data || []);
            } catch (err) {
                console.error('ERROR:', err);
                setArtikels([]);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    return (
        <MainLayout title={kategori?.nama}>
            <Head>
                <title>{kategori?.nama || 'Kategori'}</title>
                <meta name="description" content={kategori?.deskripsi || ''} />
            </Head>

            <main className="container mx-auto pt-28 pb-16 px-4">

                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-3xl p-8 mb-12 ${
                        isDark ? 'bg-gray-900' : 'bg-gray-100'
                    }`}
                >
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <img
                            src={
                                kategori?.thumbnail
                                    ? `${BASE_URL}/storage/${kategori.thumbnail}`
                                    : "../../images/NO IMAGE AVAILABLE.jpg"
                            }
                            className="w-32 h-32 object-cover rounded-xl shadow"
                        />

                        <div>
                            <h1 className="text-3xl font-bold dark:text-white">
                                {kategori?.nama || 'Kategori'}
                            </h1>
                            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl">
                                {kategori?.deskripsi || 'Tidak ada deskripsi'}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LIST ARTIKEL */}
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                                        <div className="mt-3 h-4 bg-gray-200 dark:bg-gray-700 w-3/4 rounded" />
                                        <div className="mt-2 h-3 bg-gray-200 dark:bg-gray-700 w-1/2 rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : artikels.length === 0 ? (
                            <p className="text-gray-500">Belum ada artikel</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {artikels.map((item, i) => (
                                    <MotionLink
                                        key={item.id}
                                        href={`/artikel/${item.slug}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`group rounded-2xl overflow-hidden border transition hover:shadow-lg ${
                                            isDark
                                                ? 'bg-gray-900 border-gray-800'
                                                : 'bg-white border-gray-100'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={
                                                    item.thumbnail
                                                        ? `${BASE_URL}/storage/${item.thumbnail}`
                                                        : "../../images/NO IMAGE AVAILABLE.jpg"
                                                }
                                                className="w-full h-40 object-cover group-hover:scale-105 transition"
                                            />
                                        </div>

                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg dark:text-white line-clamp-2">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm mt-2 text-gray-500 line-clamp-2">
                                                {item.excerpt || 'Tidak ada deskripsi'}
                                            </p>

                                            <div className="mt-3 flex justify-between text-xs text-gray-400">
                                                <span>{item.views} views</span>
                                                <span>
                                                    {item.published_at
                                                        ? new Date(item.published_at).toLocaleDateString('id-ID')
                                                        : '-'}
                                                </span>
                                            </div>
                                        </div>
                                    </MotionLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            <h2 className="text-lg font-semibold dark:text-white">
                                🔥 Artikel Populer
                            </h2>

                            {loading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="flex gap-3 animate-pulse">
                                            <div className="w-20 h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                artikels.slice(0, 5).map(item => (
                                    <Link
                                        key={item.id}
                                        href={`/artikel/${item.slug}`}
                                        className="flex gap-3 group"
                                    >
                                        <img
                                            src={
                                                item.thumbnail
                                                    ? `${BASE_URL}/storage/${item.thumbnail}`
                                                    : "../../images/NO IMAGE AVAILABLE.jpg"
                                            }
                                            className="w-20 h-16 object-cover rounded"
                                        />

                                        <div>
                                            <p className="text-sm font-medium dark:text-gray-200 line-clamp-2 group-hover:text-blue-500">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {item.views} views
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </MainLayout>
    );
};

export default DetailKategoriArtikel;
