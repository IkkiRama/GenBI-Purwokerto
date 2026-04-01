import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import ArtikelForm from "./ArtikelForm";
import api from "@/lib/api";

export default function EditArtikelPage() {
  const { props }: any = usePage();
  const { slug } = props; // kiriman dari Laravel

  const [artikel, setArtikel] = useState();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtikel = async () => {
            try {
                const res = await api.get(`/api/dashboard/artikel/edit/${slug}`);

                if (res.data) {
                    setArtikel(res.data);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtikel();
    }, [slug]);


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

  return <ArtikelForm artikel={artikel} />;
}
