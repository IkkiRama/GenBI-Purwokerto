import DashboardLayout from "@/Layouts/DashboardLayout";
import { setActiveMenu } from "@/Store/menuSlice";
import { IconShieldKeyhole } from "@irsyadadl/paranoid";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/api";
import { fetchUser, logout } from "@/Store/authSlice";
import toast from "react-hot-toast";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const isDark = useSelector((state) => state.theme.isDark);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    name: "",
    deskripsi: "",
    foto: null,
  });

  const [preview, setPreview] = useState("");

  // Ambil user via Redux
  useEffect(() => {
    dispatch(setActiveMenu("Account Settings"));
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

    // Set form ketika user sudah ada
    useEffect(() => {
    if (user) {
        setForm({
            name: user.name || "",
            deskripsi: user.deskripsi || "",
            foto: null,
        });

        let fotoUrl = "../images/NO IMAGE AVAILABLE.jpg";

        if (user.foto) {
        // cek apakah sudah URL (http / https)
        if (user.foto.startsWith("http")) {
            fotoUrl = user.foto;
        } else {
            // kalau dari storage
            fotoUrl = `${BASE_URL}/storage/${user.foto}`;
        }
        }

        setPreview(fotoUrl);
    }
    }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      const file = files[0];
      setForm({ ...form, foto: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("deskripsi", form.deskripsi || "");
      if (form.foto) formData.append("foto", form.foto);

      formData.append("_method", "PUT");
      await api.post("/api/dashboard/user/profile", formData);

      toast.success("Profile berhasil diupdate!");

      // Update Redux user langsung
      dispatch(fetchUser());

    } catch (err) {
        console.error(err);
        if(err?.data?.errors){
            console.log("Validation errors:", err.data.errors);
        }
        toast.error("Gagal update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

    if (loading) {
        return (
            <div className='flex justify-center items-center flex-col fixed z-[999] inset-0 bg-white dark:bg-gray-900 gap-3'>
                <img src='https://res.cloudinary.com/dlzratsmb/image/upload/v1774996069/logo_dp3yt1.png' className="lg:w-1/4 w-[60%]" alt='logo' />
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <p className="text-gray-700 dark:text-gray-300">Sedang Memuat Data...</p>
                </div>
            </div>
        );
    }

  return (
    <DashboardLayout title="Account Settings">
      <div className="p-4 md:p-8 space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              Account Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kelola profil dan keamanan akun kamu
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>

        {/* PROFILE */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border dark:border-gray-800 space-y-6">
          <h2 className="font-semibold text-lg dark:text-white">
            Profile Information
          </h2>

          <div className="flex items-center gap-5 md:flex-row flex-col md:flex-wrap">
            <div className="relative group">
              <img
                src={preview}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white cursor-pointer transition">
                Change
              </div>
            </div>

            <input
              type="file"
              name="foto"
              onChange={handleChange}
              className="text-sm dark:text-slate-300"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Nama Lengkap
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Email
              </label>
              <input
                name="email"
                value={user.email}
                disabled
                className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-transparent dark:text-white"
            />
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border dark:border-gray-800 space-y-5">
          <h2 className="font-semibold text-lg dark:text-white">Security</h2>

          <div className="flex justify-between items-center p-4 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              <LockClosedIcon className="w-5 h-5" />
              <div>
                <p className="font-medium dark:text-white">Password</p>
                <p className="text-xs text-gray-500">Last updated 3 months ago</p>
              </div>
            </div>

            <button className="px-4 py-1.5 text-sm rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800">
              Change
            </button>
          </div>

          <div className="flex justify-between items-center p-4 rounded-xl border hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div className="flex items-center gap-4">
              <IconShieldKeyhole />
              <div>
                <p className="font-medium dark:text-white">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Not enabled</p>
              </div>
            </div>

            <button className="px-4 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Enable
            </button>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="rounded-2xl p-6 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 space-y-4">
          <p className="text-sm font-semibold text-red-600">Danger Zone</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Logout akan menghapus session kamu
          </p>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
