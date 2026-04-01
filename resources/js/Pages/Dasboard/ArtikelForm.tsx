import DashboardLayout from "@/Layouts/DashboardLayout";
import { setActiveMenu } from "@/Store/menuSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function ArtikelForm({ artikel = null }) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://genbi-data.test";

  const isEdit = !!artikel;

  const [loadingType, setLoadingType] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: artikel?.title || "",
    kategori_id: artikel?.kategori_id || "",
    thumbnail: null,
    excerpt: artikel?.excerpt || "",
    keyword: artikel?.keyword || "",
    content: artikel?.content || "",
  });

  const [preview, setPreview] = useState(
    artikel?.thumbnail
      ? `${BASE_URL}/storage/${artikel.thumbnail}`
      : null
  );

  useEffect(() => {
    dispatch(setActiveMenu("Artikel"));
  }, [dispatch]);

  // FETCH KATEGORI
  useEffect(() => {
    fetch(`${BASE_URL}/api/kategori-artikel`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch(console.error);
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      const file = files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("File harus gambar");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Max 2MB");
        return;
      }

      setForm({ ...form, thumbnail: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // SUBMIT
  const handleSubmit = async (type = "draft") => {
    try {
      setLoadingType(type);
      setErrors({});

      if (type === "publish") {
        if (!form.title) return toast.error("Judul wajib diisi");
        if (!form.kategori_id) return toast.error("Kategori wajib dipilih");
        if (!form.content) return toast.error("Konten tidak boleh kosong");
      }

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      formData.append("status", type === "draft" ? "draft" : "pending");

      // beda endpoint
      let url = `${BASE_URL}/api/dashboard/artikel/buat`;
      let method = "POST";

      if (isEdit) {
        url = `${BASE_URL}/api/dashboard/artikel/${artikel.id}`;
        formData.append("_method", "PUT"); // Laravel trick
      }

      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else toast.error(data.message || "Terjadi kesalahan");
        return;
      }

      toast.success(
        isEdit
          ? "Artikel berhasil diperbarui"
          : type === "draft"
          ? "Draft berhasil disimpan"
          : "Artikel dikirim ke admin"
      );

      setTimeout(() => {
        router.visit("/dashboard/artikel");
      }, 1200);

    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoadingType(null);
    }
  };


    const handleDrop = (e) => {
        const MAX_SIZE = 2 * 1024 * 1024; // 2MB
        e.preventDefault();

        const file = e.dataTransfer.files?.[0];

        // Tidak ada file
        if (!file) return;

        // Bukan gambar
        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar");
            return;
        }

        // Ukuran terlalu besar
        if (file.size > MAX_SIZE) {
            alert("Ukuran maksimal 2MB");
            return;
        }

        // Generate preview
        const previewUrl = URL.createObjectURL(file);

        // Update state
        setForm((prev) => ({
            ...prev,
            thumbnail: file,
        }));

        setPreview(previewUrl);
    };

  return (
    <DashboardLayout title={isEdit ? "Edit Artikel" : "Tulis Artikel"}>
      <div className="p-4 md:p-8 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-200">
            {isEdit ? "Edit Artikel ✏️" : "Tulis Artikel 🚀"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bagikan insight kamu ke komunitas
          </p>
        </div>

        {/* TITLE */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul artikel..."
            className="w-full text-xl font-semibold bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* THUMBNAIL */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5">
          <p className="text-sm mb-2">Thumbnail</p>

          <div
            onClick={() => document.getElementById("thumb").click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed p-6 text-center cursor-pointer"
          >
            {preview ? (
                <div className="relative inline-block">
                    <img src={preview} className="mx-auto max-h-60 rounded-lg object-cover" />

                    {/* tombol hapus */}
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setForm({ ...form, thumbnail: null }); setPreview(null); }}
                        className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
                    >
                        Hapus
                    </button>
                </div>
            ) : (
              <p className="text-sm text-gray-500"> Drag & drop gambar atau klik untuk upload </p>
            )}

            <input
              id="thumb"
              type="file"
              name="thumbnail"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        {/* META */}
        <div className="grid md:grid-cols-2 gap-4 p-5 bg-white dark:bg-gray-900 rounded-xl">
          <div className="w-full">
            <select
                name="kategori_id"
                value={form.kategori_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 cursor-pointer"
            >
                <option value="">Pilih kategori</option>
                {categories.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.nama}
                </option>
                ))}
            </select>
          </div>

          <div className="w-full">
            <input
                name="keyword"
                value={form.keyword}
                onChange={handleChange}
                placeholder="Keyword, contoh: ekonomi, inflasi"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <p className="text-xs text-gray-400 mt-1"> Untuk membantu SEO artikel kamu </p>
          </div>
        </div>

        {/* EDITOR */}
        <Editor
          apiKey={import.meta.env.VITE_TINY_EDITOR_API_KEY}
          value={form.content}
          onEditorChange={(content) =>
            setForm({ ...form, content })
          }
          init={{
            height: 400,
            skin: isDark ? "oxide-dark" : "oxide",
            content_css: isDark ? "dark" : "default",
          }}
        />

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={loadingType !== null}
            className="px-4 py-2 border rounded font-medium"
          >
            {loadingType === "draft" ? "Menyimpan..." : "Simpan Draft"}
          </button>

            <button
                onClick={() => handleSubmit("publish")}
                disabled={loadingType !== null}
                className={`px-5 py-2 rounded transition font-semibold ${
                    isEdit
                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
                {loadingType === "publish"
                    ? "Mengirim..."
                    : isEdit
                    ? "Update ke Admin"
                    : "Submit ke Admin"}
            </button>
        </div>

      </div>
    </DashboardLayout>
  );
}
