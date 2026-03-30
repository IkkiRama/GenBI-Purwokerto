import DashboardLayout from "@/Layouts/DashboardLayout";
import { setActiveMenu } from "@/Store/menuSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";

export default function CreateArtikel() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    dispatch(setActiveMenu("Artikel"));
  }, [dispatch]);

  const [form, setForm] = useState({
    title: "",
    kategori_id: "",
    thumbnail: null,
    excerpt: "",
    keyword: "",
    content: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      const file = files[0];
      setForm({ ...form, thumbnail: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setForm({ ...form, thumbnail: file });
    setPreview(URL.createObjectURL(file));
  };

  return (
    <DashboardLayout title="Tulis Artikel">
      <div className="p-4 md:p-8 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold dark:text-slate-200">Tulis Artikel</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bagikan insight kamu ke komunitas 🚀
          </p>
        </div>

        {/* TITLE */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul artikel kamu..."
            className="w-full text-xl font-semibold bg-transparent outline-none placeholder-gray-400 border-1 dark:border-slate-100 rounded-lg dark:text-slate-300"
          />
        </div>

        {/* THUMBNAIL */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5">
          <p className="text-sm font-medium mb-2 dark:text-slate-300 ">Thumbnail</p>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition"
          >
            {preview ? (
              <img
                src={preview}
                className="mx-auto max-h-60 rounded-lg object-cover"
              />
            ) : (
              <p className="text-sm text-gray-500">
                Drag & drop gambar atau klik untuk upload
              </p>
            )}

            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              className="hidden"
            />
          </div>
        </div>

        {/* META */}
        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
            <p className="text-sm font-medium mb-1 dark:text-slate-300 ">Kategori</p>
            <select
              name="kategori_id"
              value={form.kategori_id}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-sm dark:border-gray-800 dark:text-slate-300 text-slate-700 cursor-pointer border-1 rounded-lg  "
            >
              <option className="dark:text-slate-700" value="">Pilih kategori</option>
              <option className="dark:text-slate-700" value="1">Ekonomi</option>
              <option className="dark:text-slate-700" value="2">Digital</option>
            </select>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
            <p className="text-sm font-medium mb-1 dark:text-slate-300">Keyword</p>
            <input
              name="keyword"
              value={form.keyword}
              onChange={handleChange}
              placeholder="contoh: ekonomi, inflasi"
              className="w-full bg-transparent outline-none text-sm border-1 dark:border-slate-100 rounded-lg dark:text-slate-300"
            />
            <p className="text-xs text-gray-400 mt-1">
              Untuk membantu SEO artikel kamu
            </p>
          </div>

        </div>

        {/* EXCERPT */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5">
          <p className="text-sm font-medium mb-1 dark:text-slate-300">Ringkasan Artikel</p>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={4}
            placeholder="Ringkasan singkat artikel (akan tampil di halaman utama)..."
            className="w-full bg-transparent outline-none text-sm resize-none border-1 dark:border-slate-100 rounded-lg dark:text-slate-300"
          />
          <p className="text-xs text-gray-400 mt-1">
            1-2 kalimat untuk menarik pembaca
          </p>
        </div>

        {/* EDITOR */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-5 border-1 dark:border-gray-800 resize-none">
          <p className="text-sm font-medium mb-3 dark:text-slate-300 ">Konten Artikel</p>

          <Editor
            apiKey={import.meta.env.VITE_TINY_EDITOR_API_KEY}
            value={form.content}
            key={isDark ? "dark" : "light"}
            onEditorChange={(content) =>
              setForm({ ...form, content })
            }
            init={{
                height: 400,
                menubar: true,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | \
                    link image media | code fullscreen",
                skin: isDark ? "oxide-dark" : "oxide",
                content_css: isDark ? "dark" : "default",
                branding: false,
            }}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 rounded-lg border text-sm dark:text-slate-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium">
            Simpan Draft
          </button>

          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 font-semibold ">
            Submit ke Admin
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}