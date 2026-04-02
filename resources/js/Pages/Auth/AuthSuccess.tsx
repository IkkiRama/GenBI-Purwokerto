import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function AuthSuccess() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");

  if (token) {
    localStorage.setItem("token", token);
    setTimeout(() => {
      window.location.replace("/dashboard");
    }, 1500);
  } else {
    setTimeout(() => {
      window.location.replace("/login");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      {/* subtle background accent */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#025496]/5" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white border border-gray-200 shadow-lg rounded-2xl p-10 w-full max-w-md text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <div className="bg-[#025496]/10 p-4 rounded-full">
            <FaCheckCircle className="text-[#025496] text-4xl" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Login Berhasil
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6">
          Mengarahkan ke dashboard...
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            className="h-full bg-[#025496]"
          />
        </div>
      </motion.div>
    </div>
  );
}
