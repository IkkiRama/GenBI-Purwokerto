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
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import api from "@/lib/api";
import toast from "react-hot-toast";

export default function ArtikelDashboard() {
  const dispatch = useDispatch();

  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [articles, setArticles] = useState([]);

  const [commentsIncoming, setCommentsIncoming] = useState([]);
  const [commentsMine, setCommentsMine] = useState([]);
  const [activeTab, setActiveTab] = useState("incoming");

  const incomingCount = commentsIncoming.length;

  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    dispatch(setActiveMenu("Artikel"));
  }, [dispatch]);

  // FETCH ARTIKEL
  useEffect(() => {
    const fetchArtikel = async () => {
        try {
            const res = await api.get("/api/dashboard/artikel");

            // handle semua kemungkinan bentuk response
            const data = res.data?.data || res.data || res;

            setArticles(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setArticles([]);
        } finally {
            setLoading(false);
        }
    };

    fetchArtikel();
  }, []);

  // FETCH KOMENTAR TERBARU
  const fetchComments = async () => {
    try {
        const res = await api.get("/api/dashboard/artikel/komentar");

        setCommentsIncoming(res.data?.incoming || []);
        setCommentsMine(res.data?.mine || []);
    } catch (err) {
        console.error(err);
    } finally {
        setLoadingComments(false);
    }
  };

    useEffect(() => {
        fetchComments();

        const interval = setInterval(() => {
            fetchComments();
        }, 10000); // tiap 10 detik

        return () => clearInterval(interval);
    }, []);

  // FILTER
  const filteredData = useMemo(() => {
    return articles
      .filter((item) => {
        if (statusFilter === "published") return item.is_published;
        if (statusFilter === "pending") return !item.is_published;
        return true;
      })
      .filter((item) =>
        item.title?.toLowerCase().includes(globalFilter.toLowerCase())
      );
  }, [articles, globalFilter, statusFilter]);

  // COLUMN
  const columns = useMemo(
    () => [
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
        cell: ({ row }) => (
          <div className="flex gap-2 text-sm">
            <Link
              href={`/dashboard/artikel/edit/${row.original.slug}`}
              className="text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <button
                onClick={() => handleDelete(row.original.slug)}
                className="text-red-500 hover:underline"
            >
                Hapus
            </button>

          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

    const handleDelete = async (slug) => {
        if (!confirm("Apakah kamu yakin ingin menghapus artikel ini?")) return;

        try {
            await api.delete(`/api/dashboard/artikel/delete/${slug}`);
            toast.success("Artikel berhasil dihapus!");

            // Remove artikel dari state tanpa fetch ulang semua
            setArticles((prev) => prev.filter((a) => a.slug !== slug));
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Gagal menghapus artikel");
        }
    };

  return (
    <DashboardLayout title="Dashboard Artikel">
      <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-6 mb-6 bg-gradient-to-br from-indigo-600 to-cyan-400 text-white"
        >
          <h1 className="text-2xl font-bold">Kelola Artikel Kamu ✍️</h1>
          <p className="text-sm mt-2">
            Tulis dan kelola artikel kamu dengan mudah
          </p>

          <Link
            href="/dashboard/artikel/buat"
            className="mt-4 inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <PlusCircle size={18} />
            Tulis Artikel
          </Link>
        </motion.div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
          <h1 className="text-xl font-bold">Manajemen Artikel</h1>

          <div className="flex gap-2">
            <input
              placeholder="Cari artikel..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border"
            >
              <option value="all">Semua</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border">
          {loading ? (
            <p className="p-4 text-sm text-gray-400">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-3 text-left">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.accessorKey,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* KOMENTAR */}
        <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Komentar</h2>

                <Link
                href="/dashboard/artikel/komentar"
                className="text-sm text-blue-500"
                >
                Lihat semua →
                </Link>
            </div>

            {/* TAB */}
            <div className="flex gap-2 mb-4">
                <button
                onClick={() => setActiveTab("incoming")}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                    activeTab === "incoming"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
                >
                    Masuk
                    {incomingCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {incomingCount}
                        </span>
                    )}
                </button>

                <button
                onClick={() => setActiveTab("mine")}
                className={`px-3 py-1 rounded-full text-sm ${
                    activeTab === "mine"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
                >
                Saya
                </button>
            </div>

            {/* LIST */}
            <div className="border rounded-xl divide-y">
                {loadingComments ? (
                    <p className="p-4 text-sm text-gray-400">Loading...</p>
                ) : (
                <>
                    {(activeTab === "incoming"
                    ? commentsIncoming
                    : commentsMine
                    ).length === 0 ? (
                        <p className="p-4 text-sm text-gray-400">
                            Belum ada komentar
                        </p>
                    ) : (
                    (activeTab === "incoming"
                        ? commentsIncoming
                        : commentsMine
                    ).map((c) => (
                        <div key={c.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900">

                            {activeTab === "incoming" ? (
                                <p className="text-sm font-medium">
                                    {c.nama}
                                </p>
                            ) : (
                                <p className="font-semibold text-base">
                                    {c.artikel}
                                </p>
                            )}

                            <p className="text-xs text-gray-400">
                                {c.created_at}
                            </p>

                            {activeTab === "incoming" && (
                                <p className="text-xs text-gray-500 italic">
                                di artikel: {c.artikel}
                                </p>
                            )}

                            <p className="text-sm mt-2 line-clamp-2">
                                {c.komentar}
                            </p>
                        </div>
                    ))
                    )}
                </>
                )}
            </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
