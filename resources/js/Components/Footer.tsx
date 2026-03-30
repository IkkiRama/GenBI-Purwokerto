import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => (
  <motion.footer
    className="bg-blue-900 text-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        {/* ================= LEFT (CONTACT) ================= */}
        <div className="max-w-md">

          <img
            src="/images/genbi-logo.png"
            alt="GenBI"
            className="h-9 mb-4"
          />

          <p className="text-blue-100 text-base leading-relaxed mb-6">
            Generasi Baru Indonesia (GenBI) adalah komunitas penerima beasiswa Bank Indonesia
            yang berfokus pada pengembangan generasi muda yang unggul dan berdampak.
          </p>

          <div className="space-y-4 text-base text-blue-100">

            {/* EMAIL */}
            <a
              href="mailto:medeksgenbi@gmail.com"
              className="flex items-center gap-3 hover:text-white transition"
            >
              <Mail size={25} />
              medeksgenbi@gmail.com
            </a>

            {/* PHONE */}
            <div className="flex items-start gap-3">
              <Phone size={25} className="mt-1" />
              <div className="flex flex-col gap-1">
                <a href="https://wa.me/6282133320489">Unsoed (Rifki) : +6282133320489</a>
                <a href="https://wa.me/6288980289823">UIN (Anis) : +6288980289823</a>
                <a href="https://wa.me/6289646437334">UMP (Dinda) : +6289646437334</a>
              </div>
            </div>

            {/* ADDRESS */}
            <a
              href="https://maps.app.goo.gl/9iGh4hGHk8z4L2vy8"
              target="_blank"
              className="flex items-start gap-3 hover:text-white transition"
            >
              <MapPin size={25} className="-mt-1" />
              <span>
                Purwokerto, Banyumas, Jawa Tengah
              </span>
            </a>

          </div>
        </div>

        {/* ================= RIGHT (LINKS) ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-full">

        {/* NAVIGASI */}
        <div>
            <h3 className="text-lg font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-base text-blue-100">
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/tentang">Tentang GenBI</Link></li>
            <li><Link href="/organisasi">Organisasi</Link></li>
            <li><Link href="/sejarah-kepengurusan">Sejarah</Link></li>

            <li className="flex items-center gap-2 opacity-60">
                Program Kerja <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
            </li>

            <li className="flex items-center gap-2 opacity-60">
                Pengumuman <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
            </li>

            <li><Link href="/contact">Kontak</Link></li>

            <li className="flex items-center gap-2 opacity-60">
                Statistik <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
            </li>
            </ul>
        </div>

        {/* TENTANG BI */}
        <div>
            <h3 className="text-lg font-bold mb-4">Tentang BI</h3>
            <ul className="space-y-2 text-base text-blue-100">

                <li className="flex items-center gap-2 opacity-60">
                    FAQ <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Testimoni <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Tentang Beasiswa BI
                    <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Syarat & Ketentuan
                    <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Cara Daftar
                    <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

            </ul>
        </div>

        {/* MEDIA */}
        <div>
            <h3 className="text-lg font-bold mb-4">Media</h3>
            <ul className="space-y-2 text-base text-blue-100">
            <li><Link href="/artikel">Artikel</Link></li>
            <li><Link href="/podcast">Podcast</Link></li>
            <li><Link href="/galeri">Galeri</Link></li>
            <li><Link href="/kuis">Kuis</Link></li>

            <li className="flex items-center gap-2 opacity-60">
                Data Keuangan <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
            </li>

            <li className="flex items-center gap-2 opacity-60">
                Transparansi Poin <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
            </li>

            <li className="flex items-center gap-2 opacity-60">
                Publikasi Ilmiah <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
            </li>
            </ul>
        </div>

        {/* LAINNYA */}
        <div>
            <h3 className="text-lg font-bold mb-4">Lainnya</h3>
            <ul className="space-y-2 text-base text-blue-100">
            <li><Link href="/contact">Kontak</Link></li>
            <li><a href="/sitemap.xml">Sitemap</a></li>
            <li><Link href="/sejarah-developer">Tim Pengembang</Link></li>
            </ul>
        </div>

        {/* GAME EDUKASI */}
        <div>
            <h3 className="text-lg font-bold mb-4">Game Edukasi</h3>
            <ul className="space-y-2 text-base text-blue-100">

                <li className="flex items-center gap-2 opacity-60">
                    Respon Kebijakan <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    World Crisis Simulator <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Macro Tycoon <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Country Simulator <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Sawitisasi Simulator <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    IS-LM Simulator <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

            </ul>
        </div>

        {/* GAME EDUKASI */}
        <div>
            <h3 className="text-lg font-bold mb-4">Game Metopen</h3>
            <ul className="space-y-2 text-base text-blue-100">

                <li className="flex items-center gap-2 opacity-60">
                    Metodolgy Suggestion <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Moderasi atau Mediasi <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

            </ul>
        </div>

        {/* GAME EDUKASI */}
        <div>
            <h3 className="text-lg font-bold mb-4">Game Statistik</h3>
            <ul className="space-y-2 text-base text-blue-100">

                <li className="flex items-center gap-2 opacity-60">
                    Z-Score Reader <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    T-Table Reader <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

                <li className="flex items-center gap-2 opacity-60">
                    Sample Kalkulator <span className="text-[10px] bg-yellow-300 text-black px-2 rounded">Soon</span>
                </li>

            </ul>
        </div>

        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="mt-12 pt-6 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* COPYRIGHT */}
        <p className="text-sm text-blue-100 text-center md:text-left">
          © {new Date().getFullYear()} GenBI Purwokerto. All rights reserved.
        </p>

        {/* SOCIAL (🔥 TARO SINI) */}
        <div className="flex gap-4">
          <a href="https://www.instagram.com/genbipurwokerto/" target="_blank" className="hover:scale-110 transition">
            <Instagram size={20} />
          </a>
          <a href="https://www.youtube.com/@genbipurwokerto1177" target="_blank" className="hover:scale-110 transition">
            <Youtube size={20} />
          </a>
          <a href="https://www.tiktok.com/@genbipurwokerto" target="_blank" className="hover:scale-110 transition">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
            </svg>
          </a>
        </div>

      </div>

    </div>
  </motion.footer>
);

export default Footer;
