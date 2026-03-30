import DashboardLayout from "@/Layouts/DashboardLayout";
import { setActiveMenu } from "@/Store/menuSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { motion } from 'framer-motion';
import { Link } from "@inertiajs/react";

export default function ArtikelDashboard() {
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tab, setTab] = useState("incoming");

  useEffect(() => {
    dispatch(setActiveMenu("Artikel"));
  }, [dispatch]);

  // 🔥 Dummy Data (nanti ganti API)
  const data = useMemo(() => [
    { id: 1, title: "Digital Rupiah", views: 120, is_published: false, created_at: "2026-03-20" },
    { id: 2, title: "Inflasi Indonesia", views: 980, is_published: true, created_at: "2026-03-18" },
    { id: 3, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 4, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 5, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 6, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 7, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 8, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 9, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 10, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 11, title: "Ekonomi aaa", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 12, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 13, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 14, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 15, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 16, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
    { id: 17, title: "Ekonomi Global", views: 450, is_published: true, created_at: "2026-03-10" },
  ], [])

  const comments = [
    { id: 1, nama: "Budi", artikel: "Inflasi Indonesia", komentar: "Mantap!", created_at: "2026-03-25" },
  ];

  // 🔥 FILTER
  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        if (statusFilter === "published") return item.is_published;
        if (statusFilter === "pending") return !item.is_published;
        return true;
      })
      .filter((item) =>
        item.title.toLowerCase().includes(globalFilter.toLowerCase())
      );
  }, [data, globalFilter, statusFilter]);

  // 🔥 COLUMN
  const columns = useMemo(() => [
    {
      header: "Judul",
      accessorKey: "title",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.original.is_published
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.original.is_published ? "Published" : "Pending"}
        </span>
      ),
    },
    {
      header: "Views",
      accessorKey: "views",
    },
    {
      header: "Tanggal",
      accessorKey: "created_at",
    },
    {
      header: "Aksi",
      cell: () => (
        <div className="flex gap-2 text-sm">
          <button className="text-blue-500 hover:underline">Edit</button>
          <button className="text-red-500 hover:underline">Hapus</button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <DashboardLayout title="Dashboard Artikel">
      <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">

        {/* HERO */}
        <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 mb-6
        bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400
        text-white shadow-xl"
        >
        {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-900/30 rounded-full blur-2xl"></div>

            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Kelola Artikel Kamu ✍️
                </h1>

                <p className="text-sm md:text-base opacity-90 mt-2 max-w-md">
                Tulis, pantau, dan kelola kontribusi literasi kamu dengan lebih mudah dan terorganisir.
                </p>

                {/* Button */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Link
                        href="/dashboard/artikel/buat"
                        className="mt-5 inline-flex items-center gap-2
                        bg-white text-blue-600 px-5 py-2.5
                        rounded-xl text-sm font-semibold
                        shadow-md hover:shadow-lg
                        hover:bg-gray-100 transition-all duration-200"
                    >
                        <PlusCircle size={18} />
                        Tulis Artikel
                    </Link>
                </motion.div>
            </div>
        </motion.div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">
          <h1 className="text-xl font-bold">Manajemen Artikel</h1>

          <div className="flex gap-2">
            <input
              placeholder="Cari artikel..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border
              bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border
              bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <option value="all">Semua</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-900">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-3 text-left">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-t dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <p>
            Page {table.getState().pagination.pageIndex + 1}
          </p>

          <div className="flex gap-2">
            <button className="cursor-pointer" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Prev
            </button>
            <button className="cursor-pointer" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </button>
          </div>
        </div>

        {/* KOMENTAR */}
        <div className="mt-10">
          <h2 className="font-bold text-lg mb-4">Komentar</h2>

          {/* TAB */}
          <div className="flex gap-2 mb-4">
            {["incoming", "mine"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 rounded-full text-sm ${
                  tab === t
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              >
                {t === "incoming" ? "Masuk" : "Saya"}
              </button>
            ))}
          </div>

          {/* LIST */}
          <div className="border rounded-xl divide-y dark:border-gray-800">
            {comments.map((c) => (
              <div key={c.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900">
                <p className="text-sm font-medium">
                  {tab === "incoming" ? c.nama : c.artikel}
                </p>
                <p className="text-xs text-gray-400">{c.created_at}</p>
                <p className="text-sm mt-2 line-clamp-2">{c.komentar}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
