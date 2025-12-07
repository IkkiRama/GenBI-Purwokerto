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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
        {/* About GenBI */}
        <div className="col-span-1 lg:col-span-2">
          <img
            src="/images/genbi-logo.png"
            alt="GenBI Logo"
            className="h-12 w-auto mb-4"
          />
          <p className="text-blue-100 mt-4 text-sm sm:text-base">
            Generasi Baru Indonesia (GenBI) adalah komunitas penerima beasiswa Bank Indonesia yang berkomitmen untuk keunggulan dan dampak sosial.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Changed Link to anchor tag for external links */}
            <a
              href="https://www.instagram.com/genbipurwokerto/"
              className="text-blue-100 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <Instagram size={24} />
            </a>
            <a
              href="https://www.youtube.com/@genbipurwokerto1177"
              className="text-blue-100 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">YouTube</span>
              <Youtube size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@genbipurwokerto"
              className="text-blue-100 hover:text-white transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">TikTok</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/tentang" className="text-blue-100 hover:text-white transition duration-300 block">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/kegiatan" className="text-blue-100 hover:text-white transition duration-300 block">
                Kegiatan
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="text-blue-100 hover:text-white transition duration-300 block">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-4">
            <li>
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=medeksgenbi@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group space-x-3 text-blue-100 hover:text-white transition duration-300"
                >
                    <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm sm:text-base">medeksgenbi@gmail.com</span>
                </a>

            </li>
            <li>
              <div
                className="flex items-center group space-x-3 text-blue-100 hover:text-white transition duration-300"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col">
                    <a href="http://wa.me/+6282133320489" target="_blank" rel="noopener noreferrer">
                        <span className="text-sm sm:text-base">Unsoed : +62 821-3332-0489 (Rifki)</span>
                    </a>

                    <a href="http://wa.me/+6288980289823" target="_blank" rel="noopener noreferrer">
                        <span className="text-sm sm:text-base">UIN : +62 889-8028-9823 (Anis)</span>
                    </a>

                    <a href="http://wa.me/+6289646437334" target="_blank" rel="noopener noreferrer">
                        <span className="text-sm sm:text-base">UMP : +62 896-4643-7334 (Dinda)</span>
                    </a>
                </div>
              </div>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/9iGh4hGHk8z4L2vy8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start group space-x-3 text-blue-100 hover:text-white transition duration-300"
              >
                <MapPin className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mt-1" />
                <span className="text-sm sm:text-base">
                  Jl. Jend. Gatot Subroto No.98, Brubahan, Purwanegara, Kec. Purwokerto Tim., Kabupaten Banyumas, Jawa Tengah 53116
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-6 border-t border-blue-800">
        <p className="text-center text-blue-100 text-sm">
          © {new Date().getFullYear()} GenBI. All rights reserved.
        </p>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
