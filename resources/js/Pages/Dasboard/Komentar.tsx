import DashboardLayout from "@/Layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { setActiveMenu } from "@/Store/menuSlice";
import { useDispatch } from "react-redux";
import api from "@/lib/api";

export default function KomentarDashboard() {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("incoming");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    dispatch(setActiveMenu("Komentar"));
  }, [dispatch]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/api/dashboard/artikel/komentar?type=${tab}`);
      setComments(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [tab]);

  const handleDelete = async (id) => {
    if (!confirm("Hapus komentar ini?")) return;

    try {
      await api.delete(`/api/dashboard/artikel/komentar/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Gagal hapus");
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment.id);
    setEditingText(comment.komentar);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async (id) => {
    try {
      const formData = new FormData();
      formData.append("komentar", editingText);
      formData.append("_method", "PUT");

      await api.post(`/api/dashboard/artikel/komentar/${id}`, formData);

      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, komentar: editingText } : c))
      );

      cancelEdit();
    } catch {
      alert("Gagal edit komentar");
    }
  };

  return (
    <DashboardLayout title="Komentar">
      <div className="p-4 md:p-8 space-y-6">
        <h1 className="text-xl font-bold">Manajemen Komentar</h1>

        {/* TAB */}
        <div className="flex gap-2 mb-4">
          {["incoming", "mine"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-full text-sm ${
                tab === t ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {t === "incoming" ? "Masuk" : "Saya"}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="border rounded-xl divide-y dark:border-gray-800">
          {loading ? (
            <p className="p-4 text-sm text-gray-400">Loading...</p>
          ) : comments.length === 0 ? (
            <p className="p-4 text-sm text-gray-400">Tidak ada komentar</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="p-4 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.nama}</p>
                  <p className="text-xs text-gray-400">{c.created_at}</p>

                  {editingId === c.id ? (
                    <textarea
                      className="w-full p-2 mt-2 border rounded"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm mt-2">{c.komentar}</p>
                  )}
                </div>

                <div className="flex gap-2 text-sm">
                  {tab === "mine" && editingId !== c.id && (
                    <button onClick={() => startEdit(c)} className="text-blue-500">
                      Edit
                    </button>
                  )}

                  {editingId === c.id && (
                    <>
                      <button onClick={() => saveEdit(c.id)} className="text-green-500">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="text-gray-500">
                        Cancel
                      </button>
                    </>
                  )}

                  <button onClick={() => handleDelete(c.id)} className="text-red-500">
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
