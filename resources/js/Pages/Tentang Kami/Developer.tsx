// pages/Developer.tsx

import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { X } from 'lucide-react';
import { useTheme } from '@/Hooks/useTheme';

interface DeveloperItem {
  id: number;
  nama: string;
  role: string;
  periode: string;
  image?: string | null;
  deskripsi_role?: string | null;
  sosmed_ig?: string | null;
  sosmed_wa?: string | null;
  email?: string | null;
}

type GroupedDevelopers = Record<string, DeveloperItem[]>;

const Developer = () => {
  const { isDark } = useTheme();

  const [developers, setDevelopers] =
    useState<GroupedDevelopers>({});

  // Data developer tetap disimpan sampai animasi keluar selesai.
  const [modalDev, setModalDev] =
    useState<DeveloperItem | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePeriode, setActivePeriode] =
    useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

  const sectionRefs =
    useRef<Record<string, HTMLDivElement | null>>({});

  const groupByPeriode = (
    data: DeveloperItem[],
  ): GroupedDevelopers => {
    return data.reduce<GroupedDevelopers>((result, item) => {
      const periode = item.periode || 'Tanpa Periode';

      if (!result[periode]) {
        result[periode] = [];
      }

      result[periode].push(item);

      return result;
    }, {});
  };

  // Sinkronisasi class dark dengan useTheme.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Mengambil data developer.
  useEffect(() => {
    const controller = new AbortController();

    const fetchDevelopers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${BASE_URL}/api/developer`,
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

        if (!result?.success || !Array.isArray(result.data)) {
          throw new Error(
            result?.message || 'Data developer tidak valid.',
          );
        }

        setDevelopers(groupByPeriode(result.data));
      } catch (err: any) {
        if (err?.name === 'AbortError') return;

        console.error('Gagal mengambil developer:', err);

        setError(
          err?.message || 'Gagal memuat data developer.',
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDevelopers();

    return () => controller.abort();
  }, [BASE_URL]);

  const sortedPeriode = useMemo(() => {
    return Object.keys(developers).sort((a, b) =>
      b.localeCompare(a, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    );
  }, [developers]);

  // Menentukan periode yang sedang terlihat.
  useEffect(() => {
    if (sortedPeriode.length === 0) return;

    const handleScroll = () => {
      let currentPeriode: string | null = null;

      sortedPeriode.forEach((periode) => {
        const element = sectionRefs.current[periode];

        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 170 && rect.bottom >= 170) {
          currentPeriode = periode;
        }
      });

      if (currentPeriode) {
        setActivePeriode(currentPeriode);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sortedPeriode]);

  const scrollToPeriode = (periode: string) => {
    setActivePeriode(periode);

    sectionRefs.current[periode]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const openModal = useCallback((developer: DeveloperItem) => {
    setModalDev(developer);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Escape untuk menutup modal dan mengunci body scroll.
  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, closeModal]);

  const getImageUrl = (image?: string | null) => {
    if (!image) return null;

    if (
      image.startsWith('http://') ||
      image.startsWith('https://')
    ) {
      return image;
    }

    return `${BASE_URL}/storage/${image}`;
  };

  const getWhatsAppUrl = (number: string) => {
    const normalizedNumber = number.replace(/\D/g, '');

    return `https://wa.me/${normalizedNumber}`;
  };

  return (
    <MainLayout title="Developer">
      <Head>
        <title>Developer GenBI Purwokerto</title>

        <meta
          name="description"
          content="Riwayat tim developer website GenBI Purwokerto dari setiap periode."
        />
      </Head>

      <main
        className="
          min-h-screen
          bg-gray-50 text-gray-900
          transition-colors duration-300
          dark:bg-gray-950 dark:text-gray-100
        "
      >
        <div className="container mx-auto px-6 py-20 lg:pb-20 lg:pt-28">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Tim Developer
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
              Riwayat tim pengembang website GenBI Purwokerto
              dari tahun ke tahun.
            </p>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-blue-500" />
          </motion.header>

          {/* Timeline */}
          {!loading && sortedPeriode.length > 0 && (
            <nav
              aria-label="Daftar periode developer"
              className="
                mb-16 flex gap-8 overflow-x-auto
                rounded-2xl border border-gray-200
                bg-white px-6 py-5 shadow-sm
                dark:border-gray-800 dark:bg-gray-900
              "
            >
              {sortedPeriode.map((periode) => {
                const isActive = activePeriode === periode;

                return (
                  <button
                    key={periode}
                    type="button"
                    onClick={() => scrollToPeriode(periode)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`
                      flex min-w-[100px] flex-col items-center
                      rounded-xl px-3 py-2 transition
                      focus:outline-none focus:ring-2
                      focus:ring-blue-500 focus:ring-offset-2
                      dark:focus:ring-offset-gray-900
                      ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                      }
                    `}
                  >
                    <div
                      className={`
                        h-4 w-4 rounded-full ring-4
                        ${
                          isActive
                            ? 'bg-blue-500 ring-blue-100 dark:ring-blue-950'
                            : 'bg-gray-400 ring-gray-100 dark:bg-gray-600 dark:ring-gray-800'
                        }
                      `}
                    />

                    <div
                      className={`
                        h-8 w-0.5
                        ${
                          isActive
                            ? 'bg-blue-400'
                            : 'bg-gray-300 dark:bg-gray-700'
                        }
                      `}
                    />

                    <span className="text-sm font-semibold">
                      {periode}
                    </span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Loading */}
          {loading && (
            <div
              aria-busy="true"
              aria-label="Memuat data developer"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    animate-pulse rounded-2xl
                    border border-gray-200 bg-white p-4
                    dark:border-gray-800 dark:bg-gray-900
                  "
                >
                  <div className="mb-4 h-56 rounded-xl bg-gray-200 dark:bg-gray-800" />
                  <div className="mb-3 h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              role="alert"
              className="
                rounded-2xl border border-red-200
                bg-red-50 px-6 py-5 text-center text-red-700
                dark:border-red-900/60 dark:bg-red-950/40
                dark:text-red-300
              "
            >
              <p className="font-semibold">
                Data developer gagal dimuat
              </p>

              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {/* Empty state */}
          {!loading &&
            !error &&
            sortedPeriode.length === 0 && (
              <div
                className="
                  rounded-2xl border border-gray-200
                  bg-white px-6 py-12 text-center
                  text-gray-600
                  dark:border-gray-800 dark:bg-gray-900
                  dark:text-gray-300
                "
              >
                Belum ada data developer.
              </div>
            )}

          {/* Developer list */}
          {!loading &&
            !error &&
            sortedPeriode.map((periode) => (
              <motion.section
                key={periode}
                ref={(element) => {
                    //@ts-ignore
                  sectionRefs.current[periode] = element;
                }}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.1 }}
                className="mb-24 scroll-mt-32"
              >
                <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                  {periode}
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {developers[periode].map((developer) => {
                    const imageUrl = getImageUrl(
                      developer.image,
                    );

                    return (
                      <motion.button
                        key={developer.id}
                        type="button"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openModal(developer)}
                        className="
                          overflow-hidden rounded-2xl border
                          border-gray-200 bg-white text-left
                          shadow-sm transition-shadow
                          hover:shadow-lg
                          focus:outline-none focus:ring-2
                          focus:ring-blue-500 focus:ring-offset-2
                          dark:border-gray-800 dark:bg-gray-900
                          dark:focus:ring-offset-gray-950
                        "
                      >
                        <div className="flex h-64 items-center justify-center bg-gray-100 dark:bg-gray-800">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={`Foto ${developer.nama}`}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="text-5xl font-bold text-gray-400 dark:text-gray-500">
                              {developer.nama
                                ?.charAt(0)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {developer.nama}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                            {developer.role}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>
            ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          // Data baru dibuang setelah animasi keluar selesai.
          setModalDev(null);
        }}
      >
        {isModalOpen && modalDev && (
          <motion.div
            key="developer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="developer-modal-title"
            initial={{
              opacity: 0,
              pointerEvents: 'none',
            }}
            animate={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            exit={{
              opacity: 0,
              pointerEvents: 'none',
            }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
            onMouseDown={(event) => {
              // Hanya tutup kalau pengguna benar-benar
              // menekan area backdrop.
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
            className="
              fixed inset-0 z-[1000]
              flex items-center justify-center
              overflow-y-auto bg-black/60
              px-4 py-8 backdrop-blur-sm
              dark:bg-black/75
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 15,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
              onMouseDown={(event) => event.stopPropagation()}
              className="
                relative w-full max-w-lg
                overflow-hidden rounded-2xl
                border border-gray-200 bg-white
                shadow-2xl
                dark:border-gray-700 dark:bg-gray-900
              "
            >
              {/* Tombol X */}
              <button
                type="button"
                aria-label="Tutup modal"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={closeModal}
                className="
                  absolute right-3 top-3 z-10
                  flex h-10 w-10 items-center justify-center
                  rounded-full bg-white/90 text-gray-700
                  shadow-md backdrop-blur
                  transition hover:bg-gray-100
                  focus:outline-none focus:ring-2
                  focus:ring-blue-500
                  dark:bg-gray-800/90 dark:text-gray-200
                  dark:hover:bg-gray-700
                "
              >
                <X size={20} />
              </button>

              {/* Foto */}
              <div className="flex h-64 items-center justify-center bg-gray-100 dark:bg-gray-800">
                {getImageUrl(modalDev.image) ? (
                  <img
                    src={getImageUrl(modalDev.image) as string}
                    alt={`Foto ${modalDev.nama}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-6xl font-bold text-gray-400 dark:text-gray-500">
                    {modalDev.nama?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h2
                  id="developer-modal-title"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {modalDev.nama}
                </h2>

                <p className="mt-1 font-medium text-blue-600 dark:text-blue-400">
                  {modalDev.role}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {modalDev.deskripsi_role ||
                    'Belum ada deskripsi peran.'}
                </p>

                {/* Kontak */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {modalDev.sosmed_ig && (
                    <a
                      href={`https://instagram.com/${modalDev.sosmed_ig.replace(
                        '@',
                        '',
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        rounded-full bg-pink-100
                        px-4 py-2 text-sm font-semibold
                        text-pink-700 transition
                        hover:bg-pink-200
                        dark:bg-pink-950/50
                        dark:text-pink-300
                        dark:hover:bg-pink-900/60
                      "
                    >
                      Instagram
                    </a>
                  )}

                  {modalDev.sosmed_wa && (
                    <a
                      href={getWhatsAppUrl(
                        modalDev.sosmed_wa,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        rounded-full bg-green-100
                        px-4 py-2 text-sm font-semibold
                        text-green-700 transition
                        hover:bg-green-200
                        dark:bg-green-950/50
                        dark:text-green-300
                        dark:hover:bg-green-900/60
                      "
                    >
                      WhatsApp
                    </a>
                  )}

                  {modalDev.email && (
                    <a
                      href={`mailto:${modalDev.email}`}
                      className="
                        rounded-full bg-blue-100
                        px-4 py-2 text-sm font-semibold
                        text-blue-700 transition
                        hover:bg-blue-200
                        dark:bg-blue-950/50
                        dark:text-blue-300
                        dark:hover:bg-blue-900/60
                      "
                    >
                      Email
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onMouseDown={(event) =>
                    event.stopPropagation()
                  }
                  onClick={closeModal}
                  className="
                    mt-7 w-full rounded-xl
                    bg-blue-600 py-2.5
                    font-semibold text-white
                    transition hover:bg-blue-700
                    focus:outline-none focus:ring-2
                    focus:ring-blue-500 focus:ring-offset-2
                    dark:bg-blue-500 dark:hover:bg-blue-600
                    dark:focus:ring-offset-gray-900
                  "
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default Developer;
