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
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="text-gray-500">Loading...</span>
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
