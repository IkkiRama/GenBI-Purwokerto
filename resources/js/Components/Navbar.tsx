import { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Search,
  X
} from "lucide-react";

import {
  FaHome,
  FaInfoCircle,
  FaGamepad,
  FaBuilding,
  FaHistory,
  FaBullhorn,
  FaPhone,
  FaGraduationCap,
  FaChartBar,
  FaUsers,
  FaQuestionCircle,
  FaFolderOpen,
  FaNewspaper,
  FaPodcast,
  FaImages,
  FaBookOpen,
  FaLaptopCode,
  FaSearch
} from "react-icons/fa";

const Navbar = () => {
  const { url } = usePage();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState({});

    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const isAllEmpty = results &&
    (!results.artikels?.length &&
    !results.podcasts?.length &&
    !results.quizzes?.length &&
    !results.galeris?.length);


  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://genbi-data.test';

  const NAV = [
    {
      label: "Beranda",
      path: "/",
      icon: FaHome
    },
    {
      label: "Tentang Kami",
      icon: FaInfoCircle,
      children: [
        { label: "Tentang GenBI", path: "/tentang", icon: FaInfoCircle },
        { label: "Organisasi", path: "/organisasi", icon: FaBuilding },
        { label: "Sejarah", path: "/sejarah-kepengurusan", icon: FaHistory },
        { label: "Program Kerja", soon: true, icon: FaBullhorn },
        { label: "Pengumuman", soon: true, icon: FaBullhorn },
        { label: "Kontak", path: "/contact", icon: FaPhone },
        {
          label: "Beasiswa BI",
          icon: FaGraduationCap,
          path: "#",
          children: [
            { label: "Tentang Beasiswa BI", soon: true },
            { label: "Syarat & Ketentuan", soon: true },
            { label: "Cara Daftar", soon: true }
          ]
        },
        { label: "FAQ", soon: true, path: "#", icon: FaQuestionCircle },
        { label: "Testimoni", soon: true, path: "#", icon: FaUsers },
        { label: "Statistik", soon: true, path: "#", icon: FaChartBar },
        { label: "Tim Pengembang", path: "/sejarah-developer", icon: FaLaptopCode }
      ]
    },
    {
        label: "Media",
        icon: FaFolderOpen, // lebih cocok untuk kategori utama
        children: [
            { label: "Artikel", path: "/artikel", icon: FaNewspaper },
            { label: "Podcast", path: "/podcast", icon: FaPodcast },
            { label: "Galeri", path: "/galeri", icon: FaImages },
            { label: "Kuis", path: "/kuis", icon: FaQuestionCircle },

            {
            label: "Publikasi",
            icon: FaBookOpen,
            soon: true,
            children: [
                { label: "Data Keuangan", soon: true },
                { label: "Transparansi Poin", soon: true },
                { label: "Publikasi Ilmiah", soon: true }
            ]
            }
        ]
    },
    {
      label: "Game Edukasi",
      icon: FaGamepad,
      children: [
        {
          label: "Game Makro",
          icon: FaGamepad,
          soon: true,
          children: [
            { label: "Respon Kebijakan", soon: true },
            { label: "World Crisis Simulator", soon: true },
            { label: "Macro Tycoon", soon: true },
            { label: "Country Simulator", soon: true },
            { label: "Sawitisasi Simulator", soon: true },
            { label: "IS-LM Simulator", soon: true }
          ]
        },
        {
          label: "Game Metopen",
          icon: FaSearch,
          soon: true,
          children: [
            { label: "Metodolgy Suggestion", soon: true },
            { label: "Moderasi atau Mediasi", soon: true },
          ]
        },
        {
          label: "Game Statistik",
          icon: FaChartBar,
          soon: true,
          children: [
            { label: "Z-Score Reader", soon: true },
            { label: "T-Table Reader", soon: true },
            { label: "Sample Kalkulator", soon: true }
          ]
        }
      ]
    }
  ];

  const isActive = (path) => {
    if (!path) return false;
    return path === "/" ? url === "/" : url.startsWith(path);
  };

  const isParentActive = (item) => {
    if (item.path) return isActive(item.path);
    return item.children?.some((c) => c.path && isActive(c.path));
  };

  const timeoutRef = useRef(null);

  const handleEnter = (label) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(label);
      setActiveSub(null);
    }, 100);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSub(null);
    }, 200);
  };

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

    // UNTUK FETCH API SEARCH
    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim()) {
            fetchSearch();
            } else {
            setResults(null);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);

    const fetchSearch = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/api/search?q=${query}`);
            const data = await res.json();

            setResults(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
            setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isSearchOpen]);


  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <img src="/images/genbi-logo.png" className="h-8" />
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            {NAV.map((item) => {
              const hasChild = item.children;

              return hasChild ? (
                <div
                  key={item.label}
                  onMouseEnter={() => hasChild && handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                  className="relative"
                >
                  <button
                    onClick={() =>
                      hasChild &&
                      setActiveMenu(
                        activeMenu === item.label ? null : item.label
                      )
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-800 ${
                      isParentActive(item)
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon />
                    {item.label}
                    {hasChild && (
                      <ChevronDown
                        className={`w-4 ${
                          activeMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* MEGA MENU */}
                    <AnimatePresence>
                        {activeMenu === item.label && hasChild && (
                            <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-0 right-0 mt-4 flex justify-center z-50"
                            >
                            <div className="w-min-[900px] bg-white rounded-2xl shadow-xl p-6 flex gap-6">

                                {/* 🔥 HIGHLIGHT */}
                                <div className="hidden md:flex w-[240px] bg-blue-600 text-white rounded-xl p-4 flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                    {item.label}
                                    </h3>
                                    <p className="text-sm opacity-90 mt-2">
                                    Jelajahi berbagai fitur dan informasi menarik dari {item.label}.
                                    </p>
                                </div>
                                </div>

                                {/* SUB 1 */}
                                <div className="flex gap-6">
                                {chunk(item.children, 4).map((group, i) => (
                                    <div key={i} className="space-y-3 min-w-[180px]">
                                        {group.map((sub) => {
                                            const isSoon = sub.soon;
                                            const hasChildren = sub.children;

                                            return (
                                                <Link
                                                key={sub.label}
                                                href={isSoon ? "#" : sub.path || "#"}
                                                onClick={(e) => {
                                                    if (isSoon) {
                                                        e.preventDefault(); // ❌ ga redirect
                                                    }

                                                    if (hasChildren) {
                                                        e.preventDefault(); // ❌ jangan redirect kalau ada submenu
                                                        setActiveSub(sub.label);
                                                    } else {
                                                        setActiveMenu(null);
                                                    }
                                                }}
                                                className={`flex items-center justify-between p-2 rounded-lg text-sm text-slate-800 ${
                                                    activeSub === sub.label
                                                    ? "bg-gray-200"
                                                    : "hover:bg-gray-100"
                                                } ${isSoon ? "opacity-70" : ""}`}
                                                >
                                                <div className="flex items-center gap-2">
                                                    {sub.icon && <sub.icon />}
                                                    {sub.label}
                                                </div>

                                                {/* BADGE SOON */}
                                                {isSoon && (
                                                    <span className="text-[10px] bg-yellow-300 px-2 py-[2px] rounded">
                                                        Soon
                                                    </span>
                                                )}

                                                {/* ARROW */}
                                                {hasChildren && <ChevronRight size={14} />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ))}
                                </div>

                                {/* SUB 2 */}
                                {activeSub && (
                                    <div className="border-l pl-6 min-w-[250px] space-y-3">
                                        {item.children
                                        .find((c) => c.label === activeSub)
                                        ?.children?.map((sub2) => (
                                            <div className="flex">
                                                <Link
                                                    href=""
                                                    key={sub2.label}
                                                    className="text-sm hover:text-blue-600 text-slate-800"
                                                >
                                                    {sub2.label}
                                                </Link>
                                                {/* 🔥 BADGE SOON */}
                                                {sub2.soon && (
                                                    <span className="ml-3 text-[10px] bg-yellow-300 px-2 py-[2px] rounded">
                                                    Soon
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              ) :(
                <div
                  key={item.label}
                  onMouseEnter={() => hasChild && handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                  className="relative"
                >
                  <Link
                    href={item.path}
                    onClick={() =>
                      hasChild &&
                      setActiveMenu(
                        activeMenu === item.label ? null : item.label
                      )
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-800 ${
                      isParentActive(item)
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <item.icon />
                    {item.label}
                    {hasChild && (
                      <ChevronDown
                        className={`w-4 ${
                          activeMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* MEGA MENU */}
                    <AnimatePresence>
                        {activeMenu === item.label && hasChild && (
                            <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-0 right-0 mt-4 flex justify-center z-50"
                            >
                            <div className="w-min-[900px] bg-white rounded-2xl shadow-xl p-6 flex gap-6">

                                {/* 🔥 HIGHLIGHT */}
                                <div className="hidden md:flex w-[240px] bg-blue-600 text-white rounded-xl p-4 flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                    {item.label}
                                    </h3>
                                    <p className="text-sm opacity-90 mt-2">
                                    Jelajahi berbagai fitur dan informasi menarik dari {item.label}.
                                    </p>
                                </div>
                                </div>

                                {/* SUB 1 */}
                                <div className="flex gap-6">
                                {chunk(item.children, 4).map((group, i) => (
                                    <div key={i} className="space-y-3 min-w-[180px]">
                                        {group.map((sub) => {
                                            const isSoon = sub.soon;
                                            const hasChildren = sub.children;

                                            return (
                                                <Link
                                                key={sub.label}
                                                href={isSoon ? "#" : sub.path || "#"}
                                                onClick={(e) => {
                                                    if (isSoon) {
                                                        e.preventDefault(); // ❌ ga redirect
                                                    }

                                                    if (hasChildren) {
                                                        e.preventDefault(); // ❌ jangan redirect kalau ada submenu
                                                        setActiveSub(sub.label);
                                                    } else {
                                                        setActiveMenu(null);
                                                    }
                                                }}
                                                className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                                                    activeSub === sub.label
                                                    ? "bg-gray-200"
                                                    : "hover:bg-gray-100"
                                                } ${isSoon ? "opacity-70" : ""}`}
                                                >
                                                <div className="flex items-center gap-2">
                                                    {sub.icon && <sub.icon />}
                                                    {sub.label}
                                                </div>

                                                {/* BADGE SOON */}
                                                {isSoon && (
                                                    <span className="text-[10px] bg-yellow-300 px-2 py-[2px] rounded">
                                                        Soon
                                                    </span>
                                                )}

                                                {/* ARROW */}
                                                {hasChildren && <ChevronRight size={14} />}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                ))}
                                </div>

                                {/* SUB 2 */}
                                {activeSub && (
                                    <div className="border-l pl-6 min-w-[250px] space-y-3">
                                        {item.children
                                        .find((c) => c.label === activeSub)
                                        ?.children?.map((sub2) => (
                                            <div className="flex">
                                                <Link
                                                    href=""
                                                    key={sub2.label}
                                                    className="text-sm hover:text-blue-600"
                                                >
                                                    {sub2.label}
                                                </Link>
                                                {/* 🔥 BADGE SOON */}
                                                {sub2.soon && (
                                                    <span className="ml-3 text-[10px] bg-yellow-300 px-2 py-[2px] rounded">
                                                    Soon
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              )


            })}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSearchOpen(true)}>
              <Search className="text-slate-800" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
            >
              ☰
            </button>

            <Link
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-full h-full bg-white z-50 p-6 overflow-y-auto"
          >
            <button onClick={() => setMobileOpen(false)}>
              <X />
            </button>

            {NAV.map((item) => (
              <div key={item.label} className="mb-4">
                <div
                  onClick={() =>
                    setMobileSub((prev) => ({
                      ...prev,
                      [item.label]: !prev[item.label]
                    }))
                  }
                  className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown />}
                </div>

                {/* SUB 1 + SUB 2 */}
                {mobileSub[item.label] &&
                  item.children?.map((sub) => (
                    <div key={sub.label} className="pl-4">
                      <div
                        onClick={() =>
                          sub.children &&
                          setMobileSub((prev) => ({
                            ...prev,
                            [sub.label]: !prev[sub.label]
                          }))
                        }
                        className="flex justify-between py-2 text-sm"
                      >
                        {sub.label}
                        {sub.children && <ChevronDown size={14} />}
                      </div>

                      {sub.children && mobileSub[sub.label] && (
                        <div className="pl-4">
                          {sub.children.map((sub2) => (
                            <div
                              key={sub2.label}
                              className="py-1 text-xs text-gray-600"
                            >
                              {sub2.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

        {/* MODAL SEARCH */}
        <AnimatePresence>
            {isSearchOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSearchOpen(false)} // ✅ klik luar
                    className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24"
                >
                    <div
                        onClick={(e) => e.stopPropagation()} // ❗ biar klik dalam ga nutup
                        className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-4"
                    >

                    {/* INPUT */}
                    <div className="flex items-center gap-2 border-b pb-2">
                    <Search size={18} />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari apa saja..."
                        className="w-full outline-none text-sm"
                    />
                    <button onClick={() => setIsSearchOpen(false)}>
                        <X size={18} />
                    </button>
                    </div>

                    {/* RESULTS */}
                    <div className="max-h-[400px] overflow-y-auto mt-3 space-y-4">

                    {/* LOADING */}
                    {loading && (
                        <p className="text-sm text-gray-500">Searching...</p>
                    )}

                    {/* EMPTY */}
                    {!loading && results && isAllEmpty && (
                        <div className="text-center py-6">
                            <p className="text-sm text-gray-500">
                            Tidak ada hasil untuk "<span className="font-semibold">{query}</span>"
                            </p>
                        </div>
                    )}

                    {/* Saat belum ngetik apa-apa */}
                    {!query && !loading && (
                        <p className="text-sm text-gray-400 text-center py-6">
                            Mulai ketik untuk mencari...
                        </p>
                    )}

                    {/* ARTIKEL */}
                    {results?.artikels?.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2">Artikel</p>
                            {results.artikels.map(item => (
                                <Link
                                key={item.id}
                                href={`/artikel/${item.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                                onClick={() => setIsSearchOpen(false)}
                                >
                                    <img src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"} alt={item.title} className="w-20 h-20 rounded object-cover" />
                                    <div>
                                        <p className="text-sm font-medium">{item.title}</p>
                                        <p className="text-xs text-gray-500 line-clamp-3">{item.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* PODCAST */}
                    {results?.podcasts?.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2">Podcast</p>
                            {results.podcasts.map(item => (
                                <Link
                                key={item.id}
                                href={`/podcast/${item.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <img src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"} alt={item.title} className="w-20 h-20 rounded object-cover" />
                                    <p className="text-sm">{item.title}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* QUIZ */}
                    {results?.quizzes?.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2">Kuis</p>
                            {results.quizzes.map(item => (
                                <Link
                                key={item.id}
                                href={`/quiz/${item.uuid}`}
                                className="block p-2 rounded-lg hover:bg-gray-100 text-sm"
                                >
                                {item.title}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* GALERI */}
                    {results?.galeris?.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-400 mb-2">Galeri</p>
                            {results.galeris.map(item => (
                                <Link
                                key={item.id}
                                href={`/galeri/${item.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <img src={item.thumbnail ? BASE_URL + `/storage/${item.thumbnail}` : "./images/NO IMAGE AVAILABLE.jpg"} alt={item.title} className="w-20 h-20 rounded object-cover" />
                                    <p className="text-sm">{item.title}</p>
                                </Link>
                            ))}
                        </div>
                    )}

                    </div>
                </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};

export default Navbar;
