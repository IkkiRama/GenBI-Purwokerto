import MainLayout from '@/Layouts/MainLayout'
import { Head, Link } from '@inertiajs/react'

export default function Unauthorized() {
  return (
    <MainLayout>
        <Head title="Akses Ditolak" />

        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 text-center px-4">
            <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Kamu belum login 👀
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mb-6">
                Silakan login terlebih dahulu untuk mengakses dashboard.
            </p>

            <Link
                href="/"
                className="inline-block px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                Kembali ke Beranda
            </Link>
            </div>
        </div>
    </MainLayout>
  )
}
