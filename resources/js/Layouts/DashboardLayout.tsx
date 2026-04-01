import BottomNav from "@/Components/BottomNav";
import Sidebar from "@/Components/Sidebar";
import MainLayout from "./MainLayout";
import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";
import Unauthorized from "@/Components/Unauthorized";


interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({
  children,
  title = "Dashboard - Generasi Baru Indonesia",
}: DashboardLayoutProps) {

  const { isAuthenticated, loading } = useSelector((state) => state.auth);


    if (loading) {
        // full-screen loader (kept accessible)
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

    if (!isAuthenticated) {
        return (
            <Unauthorized />
        );
    }

  return (
    <MainLayout isDashboard={true}>

      {/* SEO */}
      <Head title={title}>
        <meta name="description" content="Dashboard GenBI Purwokerto" />
      </Head>

      {/* LAYOUT */}
      <div className="container mx-auto flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">

        {/* SIDEBAR */}
        <aside className="hidden md:block w-64 pt-24">
          <Sidebar />
        </aside>

        {/* MAIN */}
        <main className="flex-1 pt-24 pb-24 px-4 md:px-8">
          {children}
        </main>

      </div>

      {/* 📱 MOBILE NAV */}
      <BottomNav />

    </MainLayout>
  );
}
