import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';



const ProfileCard: React.FC<{ profile, index: number, isDark:boolean }> = ({ profile, index, isDark }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://data.genbipurwokerto.com';

  if (profile.type === "president") {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative group"
        >
            <div className={`rounded-xl overflow-hidden shadow-lg border h-full ${
            isDark
                ? 'bg-gray-800/70 backdrop-blur-sm border-gray-700/50'
                : 'bg-white/70 backdrop-blur-sm border-blue-100/50'
            }`}>

            <div className="relative h-[460px] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <img
                src={BASE_URL+`/storage/${profile.foto}`}
                alt={profile.nama_lengkap}
                className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>

            <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
                }`}>
                {profile.nama_lengkap}
                </h3>
                <p className={`text-sm mb-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                {profile.jabatan}
                <br />
                {profile.university}
                </p>
                <div className={`h-px my-4 ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`} />
                <p className={`italic text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {profile.quote}
                </p>
            </div>
            </div>
        </motion.div>
    )
  }
  return (
    <Link href={`/organisasi/struktur/${profile.periode}/${profile.jabatan}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="relative group"
      >
        <div className={`rounded-xl overflow-hidden shadow-lg border h-full ${
          isDark
            ? 'bg-gray-800/70 backdrop-blur-sm border-gray-700/50'
            : 'bg-white/70 backdrop-blur-sm border-blue-100/50'
        }`}>

          <div className="relative h-[460px] overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <img
              src={BASE_URL+`/storage/${profile.foto}`}
              alt={profile.nama_lengkap}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>

          <div className="p-6">
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {profile.nama_lengkap}
            </h3>
            <p className={`text-sm mb-4 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {profile.jabatan}
              <br />
              {profile.university}
            </p>
            <div className={`h-px my-4 ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <p className={`italic text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {profile.quote}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};


export default ProfileCard
