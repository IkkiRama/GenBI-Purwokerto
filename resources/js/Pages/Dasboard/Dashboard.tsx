import DashboardLayout from "@/Layouts/DashboardLayout";
import { setActiveMenu } from "@/Store/menuSlice";
import { motion } from "framer-motion";
import { BookOpen, BarChart3, Gamepad2, Calendar } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setActiveMenu("Dashboard"));
  }, [dispatch]);


  return (
    <DashboardLayout title="Dashboard | Generasi Baru Indonesia Purwokerto">
      <div className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 min-h-screen pb-24 transition-colors">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl mb-6 p-6 md:p-8
          bg-gradient-to-r from-blue-600 to-blue-400
          dark:from-blue-700 dark:to-blue-500 text-white shadow-lg"
        >
          <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

             <h1 className="text-2xl md:text-3xl font-bold">
                Selamat Datang, {loading ? "..." : user?.name || "User"}
            </h1>
            <p className="mt-2 text-sm opacity-90">
                Pantau perkembangan literasi ekonomi dan kontribusi kamu dalam ekosistem hari ini.
            </p>
        </motion.div>

        {/* STATS */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { title: "Total Artikel Views", value: "1.2K", badge: "+12%" },
            { title: "Total Quiz Selesai", value: "48", badge: "Rank 5" },
            { title: "Total Poin", value: "2,450", badge: "Expert" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="relative p-4 rounded-xl shadow-md
              bg-white dark:bg-gray-900
              border border-gray-100 dark:border-gray-800"
            >
              <span className="absolute top-3 right-3 text-xs
              bg-blue-100 dark:bg-blue-900
              text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                {item.badge}
              </span>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.title}
              </p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </motion.div>
          ))}
        </div> */}

        {/* ECOSYSTEM */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-4">Ecosystem Exploration</h2>

          <div className="grid md:grid-cols-3 gap-4">

            {/* PODCAST */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 p-6 rounded-xl relative overflow-hidden
              bg-gradient-to-br from-gray-900 to-black
              dark:from-gray-800 dark:to-gray-900 text-white shadow-lg"
            >
              <span className="text-xs bg-red-500 px-2 py-1 rounded">
                NEW EPISODE
              </span>

              <h3 className="text-lg font-bold mt-3">
                GenBI Podcast: Digital Rupiah
              </h3>

              <p className="text-sm opacity-80 mt-2">
                Menjelajahi masa depan transaksi digital bersama pakar ekonomi BI.
              </p>
            </motion.div>

            {/* PUBLIKASI */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-xl shadow
              bg-white dark:bg-gray-900
              border border-gray-100 dark:border-gray-800"
            >
              <BookOpen className="mb-3 text-blue-500" />
              <h3 className="font-semibold">Publikasi Riset</h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Akses jurnal dan laporan ekonomi terbaru.
              </p>

              <div className="mt-3 text-xs text-blue-500">
                340+ Dokumen • Updated Daily
              </div>
            </motion.div>

          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-xl shadow
            bg-white dark:bg-gray-900
            border border-gray-100 dark:border-gray-800"
          >
            <Calendar className="mb-2 text-blue-500" />
            <h3 className="font-semibold">Upcoming Event</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              GenBI Gathering 2024
            </p>
            <p className="text-xs mt-2 text-blue-500">Register Now</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-xl text-white shadow
            bg-gradient-to-br from-gray-900 to-gray-800"
          >
            <BarChart3 className="mb-2" />
            <h3 className="font-semibold">Statistik Global</h3>
            <p className="text-sm mt-2">Inflasi: 2.12%</p>
            <p className="text-sm">BI Rate: 6.25%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-xl text-white shadow
            bg-gradient-to-br from-orange-500 to-orange-400"
          >
            <Gamepad2 className="mb-2" />
            <h3 className="font-semibold">Games Hub</h3>
            <p className="text-sm">
              Belajar ekonomi dengan cara menyenangkan
            </p>
          </motion.div>

        </div>

        {/* LIBRARY */}
        <div>
          <h2 className="font-bold text-lg mb-4">
            Library Permainan & Simulasi
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {[
              {
                title: "Policy Response",
                desc: "Simulasi respon kebijakan terhadap pasar",
                action: ">",
              },
              {
                title: "Sample Calculator",
                desc: "Tool statistik penelitian",
                action: "Run",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl shadow flex justify-between items-center
                bg-white dark:bg-gray-900
                border border-gray-100 dark:border-gray-800"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>

                <span className="text-blue-500 text-sm">
                  {item.action}
                </span>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
