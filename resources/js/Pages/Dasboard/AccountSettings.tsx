import DashboardLayout from "@/Layouts/DashboardLayout";
import { setActiveMenu } from "@/Store/menuSlice";
import { IconShieldKeyhole } from "@irsyadadl/paranoid";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDark);

  useEffect(() => {
    dispatch(setActiveMenu("Account Settings"));
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "Ahmad Rifai",
    email: "rifai.genbi@example.com",
    bio: "Passionate about editorial intelligence and data-driven storytelling.",
    password: "",
  });

  const [preview, setPreview] = useState(
    "https://i.pravatar.cc/150?img=3"
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="p-4 md:p-8 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold dark:text-slate-200">
              Account Settings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kelola profil, keamanan, dan preferensi akun kamu
            </p>
          </div>

          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 font-semibold">
            Save Changes
          </button>
        </div>

        <div className="">

            {/* PROFILE */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg dark:text-slate-200">
                Profile Information
              </h2>

              <div className="flex items-center gap-4">
                <img
                  src={preview}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div>
                  <label className="text-sm text-gray-500">
                    Ubah Foto
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    className="block text-sm mt-1 dark:text-slate-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama lengkap"
                  className="w-full p-3 rounded-lg border bg-transparent dark:text-slate-300"
                />

                <input
                  name="email"
                  value={form.email}
                  disabled
                  className="w-full p-3 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-slate-400"
                />
              </div>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-lg border bg-transparent dark:text-slate-300"
              />
            </div>

            {/* SECURITY */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-lg dark:text-slate-200">
                Security (Comming Soon)
              </h2>

              <div className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex items-center gap-4">
                    <div className="">
                        <LockClosedIcon></LockClosedIcon>
                    </div>
                    <div className="">
                        <p className="font-medium dark:text-slate-200">
                            Password
                        </p>
                        <p className="text-xs text-gray-500">
                            Last updated 3 months ago
                        </p>

                    </div>
                </div>

                <button className="text-sm text-blue-600 font-medium">
                  Change
                </button>
              </div>

              <div className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex items-center gap-4">
                    <div className="">
                        <IconShieldKeyhole></IconShieldKeyhole>
                    </div>
                    <div className="">
                        <p className="font-medium dark:text-slate-200">
                            Two-Factor Authentication
                        </p>
                        <p className="text-xs text-gray-500">
                            Not enabled
                        </p>
                    </div>
                </div>

                <button className="text-sm text-blue-600 font-medium">
                  Enable
                </button>
              </div>
            </div>

            {/* LOGOUT */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 space-y-3">
              <p className="text-sm text-red-600 font-semibold">
                Danger Zone
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Logout akan menghapus session kamu
              </p>

              <button className="w-full py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700">
                Logout Account
              </button>
            </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

/* TOGGLE COMPONENT */
function Toggle({ label }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm dark:text-slate-300">{label}</span>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            enabled ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}