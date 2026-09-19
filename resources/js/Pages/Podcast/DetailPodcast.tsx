// pages/DetailPodcast.tsx

import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomPlayer from '@/Components/CustomPlayer';
import { useTheme } from '@/Hooks/useTheme';
import {
  PictureInPicture2,
  Radio,
} from 'lucide-react';

interface Podcast {
  id: number;
  slug: string;
  title: string;
  date?: string;
  description?: string;
  videoId: string;
  thumbnail?: string | null;
}

interface DetailPodcastProps {
  slug: string;
}

const DetailPodcast = ({ slug }: DetailPodcastProps) => {
  const { isDark } = useTheme();

  const [podcast, setPodcast] =
    useState<Podcast | null>(null);

  const [recommendations, setRecommendations] =
    useState<Podcast[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] =
    useState<string | null>(null);

  const [isMini, setIsMini] = useState(false);

  /*
   * Sentinel merupakan kandang/posisi asli player.
   * Elemen ini tidak berpindah ketika player menjadi fixed.
   */
  const playerSentinelRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Ref dipakai untuk mencegah setState berulang ketika
   * IntersectionObserver menghasilkan nilai yang sama.
   */
  const isMiniRef = useRef(false);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://genbi-data.test';

  // Sinkronisasi dark mode.
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      isDark,
    );
  }, [isDark]);

  // Mengambil data podcast.
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setIsMini(false);
      isMiniRef.current = false;

      try {
        const response = await fetch(
          `${BASE_URL}/api/podcast/${encodeURIComponent(
            slug,
          )}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (!result?.data) {
          throw new Error(
            result?.message ||
              'Podcast tidak ditemukan.',
          );
        }

        setPodcast(result.data);

        setRecommendations(
          Array.isArray(result.recommendations)
            ? result.recommendations
            : [],
        );
      } catch (err: any) {
        if (err?.name === 'AbortError') return;

        console.error(
          'Gagal memuat detail podcast:',
          err,
        );

        setError(
          err?.message ||
            'Podcast gagal dimuat.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [BASE_URL, slug]);

  // Membuat antrean podcast sekaligus menghapus duplikat.
  const queue = useMemo(() => {
    if (!podcast) return [];

    const combined = [
      podcast,
      ...recommendations,
    ];

    return combined.filter(
      (item, index, items) =>
        items.findIndex(
          (candidate) =>
            candidate.id === item.id ||
            candidate.slug === item.slug,
        ) === index,
    );
  }, [podcast, recommendations]);

  // Menentukan index podcast yang sesuai dengan slug halaman.
  useEffect(() => {
    if (queue.length === 0) {
      setCurrentIndex(0);
      return;
    }

    const index = queue.findIndex(
      (item) => item.slug === slug,
    );

    setCurrentIndex(index >= 0 ? index : 0);
  }, [queue, slug]);

  const current =
    queue[currentIndex] ?? podcast;

  /*
   * Mengubah status mini hanya ketika nilainya benar-benar
   * berubah. Ini mencegah render berulang dan kedipan.
   */
  const updateMiniPlayer = useCallback(
    (value: boolean) => {
      if (isMiniRef.current === value) return;

      isMiniRef.current = value;
      setIsMini(value);
    },
    [],
  );

  /*
   * Player menjadi floating apabila:
   * - pengguna sudah scroll melewati bagian atas player; dan
   * - bagian player yang terlihat tinggal 40% atau kurang.
   *
   * Yang diamati adalah kandang asli, bukan player fixed.
   */
  useEffect(() => {
    const sentinel =
      playerSentinelRef.current;

    if (!sentinel || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;

        const hasScrolledPastPlayer =
          rect.top < 100;

        const onlyThirtyPercentVisible =
          entry.intersectionRatio <= 0.7;

        if (
          hasScrolledPastPlayer &&
          onlyThirtyPercentVisible
        ) {
          updateMiniPlayer(true);
        } else {
          updateMiniPlayer(false);
        }
      },
      {
        threshold: [
          0,
          0.1,
          0.2,
          0.3,
          0.31,
          0.5,
          0.75,
          1,
        ],
        rootMargin: '-80px 0px 0px 0px',
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      isMiniRef.current = false;
    };
  }, [
    loading,
    current?.videoId,
    updateMiniPlayer,
  ]);

  const playPodcast = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [],
  );

  const playNext = useCallback(() => {
    if (queue.length <= 1) return;

    setCurrentIndex((previousIndex) => {
      const nextIndex = previousIndex + 1;

      return nextIndex >= queue.length
        ? 0
        : nextIndex;
    });
  }, [queue.length]);

  const scrollBackToPlayer = useCallback(() => {
    playerSentinelRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  const getThumbnailUrl = (
    thumbnail?: string | null,
  ) => {
    if (!thumbnail) {
      return '/images/NO IMAGE AVAILABLE.jpg';
    }

    if (
      thumbnail.startsWith('http://') ||
      thumbnail.startsWith('https://')
    ) {
      return thumbnail;
    }

    return `${BASE_URL}/storage/${thumbnail}`;
  };

  return (
    <MainLayout
      title={current?.title || 'Detail Podcast'}
    >
      <Head>
        <title>
          {current?.title
            ? `${current.title} - GenBI Purwokerto`
            : 'Detail Podcast - GenBI Purwokerto'}
        </title>

        <meta
          name="description"
          content={
            current?.title
              ? `Dengarkan podcast ${current.title}.`
              : 'Podcast GenBI Purwokerto.'
          }
        />
      </Head>

      <main
        className="
          min-h-screen bg-gray-50
          text-gray-900
          transition-colors duration-300
          dark:bg-gray-950 dark:text-gray-100
        "
      >
        <div className="container mx-auto px-4 pb-16 pt-28">
          {error ? (
            <div
              role="alert"
              className="
                rounded-2xl border border-red-200
                bg-red-50 p-6 text-center
                text-red-700
                dark:border-red-900/60
                dark:bg-red-950/40
                dark:text-red-300
              "
            >
              <h1 className="font-bold">
                Podcast gagal dimuat
              </h1>

              <p className="mt-2 text-sm">
                {error}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Kolom utama */}
              <div className="lg:col-span-2">
                {/*
                 * Kandang asli player.
                 * Ukuran tetap dipertahankan ketika player floating,
                 * sehingga halaman tidak meloncat.
                 */}
                <div
                  ref={playerSentinelRef}
                  className="
                    relative aspect-video
                    w-full overflow-visible
                    rounded-xl
                  "
                >
                  {loading ? (
                    <div
                      className="
                        absolute inset-0
                        animate-pulse rounded-xl
                        bg-gray-200
                        dark:bg-gray-800
                      "
                    />
                  ) : (
                    <>
                      {/*
                       * Keterangan pada kandang asli.
                       * Tampil ketika player berada di kanan bawah.
                       */}
                      {isMini && (
                        <button
                          type="button"
                          onClick={
                            scrollBackToPlayer
                          }
                          className="
                            absolute inset-0 z-0
                            flex w-full flex-col
                            items-center justify-center
                            overflow-hidden rounded-xl
                            border-2 border-dashed
                            border-blue-300
                            bg-gradient-to-br
                            from-blue-50 via-white
                            to-indigo-50
                            px-6 text-center
                            transition
                            hover:border-blue-500
                            hover:from-blue-100
                            hover:to-indigo-100
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:ring-offset-2

                            dark:border-blue-800
                            dark:from-gray-900
                            dark:via-gray-900
                            dark:to-blue-950/40
                            dark:hover:border-blue-600
                            dark:hover:from-gray-800
                            dark:hover:to-blue-950/60
                            dark:focus:ring-offset-gray-950
                          "
                        >
                          {/* Dekorasi */}
                          <div
                            aria-hidden="true"
                            className="
                              absolute -left-16
                              -top-16 h-48 w-48
                              rounded-full
                              bg-blue-200/40
                              blur-3xl
                              dark:bg-blue-700/10
                            "
                          />

                          <div
                            aria-hidden="true"
                            className="
                              absolute -bottom-16
                              -right-16 h-48 w-48
                              rounded-full
                              bg-indigo-200/40
                              blur-3xl
                              dark:bg-indigo-700/10
                            "
                          />

                          {/* Ikon picture in picture */}
                          <div
                            className="
                              relative flex h-20 w-20
                              items-center justify-center
                              rounded-2xl bg-blue-600
                              text-white shadow-xl
                              shadow-blue-500/20
                              dark:bg-blue-500
                              dark:shadow-blue-950/40
                            "
                          >
                            <PictureInPicture2
                              size={38}
                            />
                          </div>

                          {/* Status */}
                          <div className="relative mt-5 flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span
                                className="
                                  absolute inline-flex
                                  h-full w-full
                                  animate-ping
                                  rounded-full
                                  bg-red-400 opacity-75
                                "
                              />

                              <span
                                className="
                                  relative inline-flex
                                  h-2.5 w-2.5
                                  rounded-full bg-red-500
                                "
                              />
                            </span>

                            <span
                              className="
                                text-xs font-bold
                                uppercase tracking-wider
                                text-red-600
                                dark:text-red-400
                              "
                            >
                              Sedang diputar
                            </span>
                          </div>

                          <h3
                            className="
                              relative mt-3
                              text-lg font-bold
                              text-gray-900
                              dark:text-white
                            "
                          >
                            Video berada di mini player
                          </h3>

                          <p
                            className="
                              relative mt-2 max-w-md
                              text-sm leading-6
                              text-gray-600
                              dark:text-gray-300
                            "
                          >
                            Podcast tetap diputar di
                            pojok kanan bawah. Klik area
                            ini untuk kembali ke pemutar
                            utama.
                          </p>

                          <div
                            className="
                              relative mt-5
                              inline-flex items-center
                              gap-2 rounded-full
                              bg-blue-100 px-4 py-2
                              text-sm font-semibold
                              text-blue-700
                              dark:bg-blue-950/70
                              dark:text-blue-300
                            "
                          >
                            <Radio size={16} />
                            Kembali ke video
                          </div>
                        </button>
                      )}

                      {/*
                       * Player yang sama hanya berubah posisi.
                       * Tidak di-unmount sehingga durasi dan status
                       * pemutaran tidak dimulai ulang.
                       */}
                      <div
                        className={
                          isMini
                            ? `
                              fixed bottom-4 right-4
                              z-[1000]
                              w-[calc(100%-2rem)]
                              max-w-[380px]
                              overflow-hidden
                              rounded-xl
                              border border-white/10
                              bg-black shadow-2xl
                              shadow-black/40

                              md:bottom-6
                              md:right-6
                              md:w-[380px]
                            `
                            : `
                              absolute inset-0
                              z-10 h-full w-full
                            `
                        }
                      >
                        {/* Header mini player */}
                        {isMini && (
                          <div
                            className="
                              flex items-center
                              justify-between
                              border-b
                              border-white/10
                              bg-gray-950
                              px-3 py-2
                              text-white
                            "
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <span className="relative flex h-2 w-2 flex-none">
                                <span
                                  className="
                                    absolute
                                    inline-flex
                                    h-full w-full
                                    animate-ping
                                    rounded-full
                                    bg-red-400
                                    opacity-75
                                  "
                                />

                                <span
                                  className="
                                    relative
                                    inline-flex
                                    h-2 w-2
                                    rounded-full
                                    bg-red-500
                                  "
                                />
                              </span>

                              <p className="truncate text-xs font-medium">
                                {current?.title}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={
                                scrollBackToPlayer
                              }
                              className="
                                ml-3 flex-none
                                rounded-md px-2
                                py-1 text-[11px]
                                font-semibold
                                text-blue-300
                                transition
                                hover:bg-white/10
                                hover:text-blue-200
                              "
                            >
                              Kembali
                            </button>
                          </div>
                        )}

                        <CustomPlayer
                          key={current?.videoId}
                          videoId={
                            current?.videoId
                          }
                          onEnd={playNext}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Detail podcast */}
                <article
                  className="
                    mt-7 rounded-2xl
                    border border-gray-200
                    bg-white p-6 shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                  "
                >
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="h-7 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

                      <div className="mt-3 h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

                      <div className="mt-7 space-y-3">
                        <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {current?.title}
                      </h1>

                      {current?.date && (
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {current.date}
                        </p>
                      )}

                      <div
                        className="
                          mt-6 max-w-none
                          text-gray-700
                          dark:text-gray-300

                          [&_a]:text-blue-600
                          [&_a]:underline
                          dark:[&_a]:text-blue-400

                          [&_blockquote]:border-l-4
                          [&_blockquote]:border-gray-300
                          [&_blockquote]:pl-4
                          dark:[&_blockquote]:border-gray-700

                          [&_h1]:font-bold
                          [&_h1]:text-gray-900
                          dark:[&_h1]:text-white

                          [&_h2]:font-bold
                          [&_h2]:text-gray-900
                          dark:[&_h2]:text-white

                          [&_h3]:font-semibold
                          [&_h3]:text-gray-900
                          dark:[&_h3]:text-white

                          [&_li]:my-1

                          [&_ol]:list-decimal
                          [&_ol]:pl-6

                          [&_p]:my-3
                          [&_p]:leading-7

                          [&_strong]:text-gray-900
                          dark:[&_strong]:text-white

                          [&_ul]:list-disc
                          [&_ul]:pl-6
                        "
                        dangerouslySetInnerHTML={{
                          __html:
                            current?.description ||
                            '<p>Belum ada deskripsi podcast.</p>',
                        }}
                      />
                    </>
                  )}
                </article>
              </div>

              {/* Kolom rekomendasi */}
              <aside className="lg:col-span-1">
                <div className="space-y-4 lg:sticky lg:top-28">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Podcast Lainnya
                  </h2>

                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({
                        length: 5,
                      }).map((_, index) => (
                        <div
                          key={index}
                          className="
                            flex animate-pulse
                            gap-3 rounded-xl
                            border border-gray-200
                            bg-white p-2
                            dark:border-gray-800
                            dark:bg-gray-900
                          "
                        >
                          <div className="h-20 w-28 flex-none rounded-lg bg-gray-200 dark:bg-gray-800" />

                          <div className="flex-1 space-y-3 py-2">
                            <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                            <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {queue.map(
                        (item, index) => {
                          const active =
                            index ===
                            currentIndex;

                          return (
                            <button
                              key={
                                item.id ??
                                item.slug
                              }
                              type="button"
                              onClick={() =>
                                playPodcast(
                                  index,
                                )
                              }
                              className={`
                                flex w-full
                                gap-3 rounded-xl
                                border p-2
                                text-left transition
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500

                                ${
                                  active
                                    ? `
                                      border-blue-200
                                      bg-blue-50
                                      dark:border-blue-800
                                      dark:bg-blue-950/50
                                    `
                                    : `
                                      border-transparent
                                      bg-white
                                      hover:border-gray-200
                                      hover:bg-gray-100
                                      dark:bg-gray-900
                                      dark:hover:border-gray-700
                                      dark:hover:bg-gray-800
                                    `
                                }
                              `}
                            >
                              <img
                                src={getThumbnailUrl(
                                  item.thumbnail,
                                )}
                                alt={`Thumbnail ${item.title}`}
                                loading="lazy"
                                className="
                                  h-20 w-28
                                  flex-none rounded-lg
                                  bg-gray-200
                                  object-cover
                                  dark:bg-gray-800
                                "
                              />

                              <div className="min-w-0 py-1">
                                <p
                                  className={`
                                    line-clamp-2
                                    text-sm font-semibold

                                    ${
                                      active
                                        ? `
                                          text-blue-700
                                          dark:text-blue-300
                                        `
                                        : `
                                          text-gray-800
                                          dark:text-gray-200
                                        `
                                    }
                                  `}
                                >
                                  {item.title}
                                </p>

                                {item.date && (
                                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                    {item.date}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
};

export default DetailPodcast;
