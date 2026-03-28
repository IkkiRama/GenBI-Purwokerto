import MainLayout from '@/Layouts/MainLayout';
import { useTheme } from '@/Hooks/useTheme';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CustomPlayer from '@/Components/CustomPlayer';

const DetailPodcast = ({ slug }: { slug: string }) => {
    const [podcast, setPodcast] = useState<any>(null);
    const [recom, setRecom] = useState<any[]>([]);
    const [queue, setQueue] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isMini, setIsMini] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const themeHook = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDark]);

    // FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/api/podcast/${slug}`);
            const json = await res.json();

            setPodcast(json.data);
            setRecom(json.recommendations || []);
            setLoading(false);
        };

        fetchData();
    }, [slug]);

    // QUEUE
    useEffect(() => {
        if (podcast) {
            const list = [podcast, ...recom];
            setQueue(list);

            const index = list.findIndex(p => p.slug === slug);
            setCurrentIndex(index !== -1 ? index : 0);
        }
    }, [podcast, recom]);

    const current = queue[currentIndex];

    // ✅ FIX MINI PLAYER (SMOOTH)
    useEffect(() => {
        const el = document.getElementById('player-section');
        if (!el) return;

        let timeout: any;

        const observer = new IntersectionObserver(
            ([entry]) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    setIsMini(!entry.isIntersecting);
                }, 80);
            },
            {
                threshold: 0.25,
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <MainLayout isDark={isDark} title={current?.title}>
            <Head>
                <title>{current?.title}</title>
            </Head>

            <main className="container mx-auto pt-28 pb-16 px-4">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* PLAYER */}
                    <div className="lg:col-span-2">

                        <div
                            id="player-section"
                            className={`
                                transition-all duration-300 ease-in-out
                                ${isMini
                                    ? 'fixed bottom-6 right-6 w-80 z-50 scale-95 shadow-xl'
                                    : 'w-full'
                                }
                            `}
                        >
                            {loading ? (
                                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                            ) : (
                                <CustomPlayer
                                    videoId={current?.videoId}
                                    thumbnail={`${BASE_URL}/storage/${current?.thumbnail}`}
                                    onEnd={() =>
                                        setCurrentIndex(i => (i + 1) % queue.length)
                                    }
                                />
                            )}
                        </div>

                        {/* DETAIL */}
                        <div className="mt-6">
                            <h1 className="text-2xl font-bold dark:text-white">
                                {current?.title}
                            </h1>

                            <p className="text-sm text-gray-500 mt-2">
                                {current?.date}
                            </p>

                            <div
                                className="mt-4 dark:text-gray-300 pb-[1000px]"
                                dangerouslySetInnerHTML={{ __html: current?.description }}
                            />
                        </div>

                    </div>

                    {/* REKOMENDASI */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky top-28 space-y-4">

                            <h2 className="font-semibold text-lg dark:text-white">
                                Podcast Lainnya
                            </h2>

                            {loading && (
                                <div className="space-y-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="flex gap-3 animate-pulse">
                                            <div className="w-28 h-20 bg-gray-200 dark:bg-gray-700 rounded" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {queue.map((item, i) => (
                                <div
                                    key={item.id}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`flex gap-3 cursor-pointer p-2 rounded-lg transition
                                    ${i === currentIndex
                                            ? 'bg-blue-100 dark:bg-blue-900'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <img
                                        src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "../images/NO IMAGE AVAILABLE.jpg"}
                                        className="w-28 h-20 object-cover rounded"
                                    />

                                    <div>
                                        <p className="text-sm font-medium dark:text-gray-200 line-clamp-2">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500">{item.date}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </main>
        </MainLayout>
    );
};

export default DetailPodcast;
