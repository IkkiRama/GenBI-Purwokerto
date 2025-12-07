// Updated AboutSection.tsx with improved dark mode and subtle animations
import { motion } from 'framer-motion';
import { ArrowRight, Users, Award, Target } from 'lucide-react';
import { Link } from '@inertiajs/react';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const GenBIPointSection = ({ isDark }: { isDark: boolean }) => {
  const features = [
    {
      icon: Award,
      title: "Sistem Penghargaan",
      description: "Apresiasi khusus untuk kontribusi aktif anggota dalam komunitas",
    },
    {
      icon: Users,
      title: "Kolaborasi Tim",
      description: "Mendorong kerja sama dan partisipasi dalam kegiatan komunitas",
    },
    {
      icon: Target,
      title: "Pencapaian Terukur",
      description: "Pantau dan tingkatkan performa dengan metrik yang jelas",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-gradient-to-br from-blue-950/20 bg-gray-900 to-gray-950/20'
            : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
        }`} />

      <div className="container mx-auto px-4 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-6">
              <div className="inline-block">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="bg-blue-600 h-1 w-16 mb-6"
                />
              </div>

              <h2 className={`text-3xl lg:text-5xl font-bold lg:leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                GenBI Point
              </h2>

              <p className={`text-lg lg:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Sistem penghargaan inovatif yang memberikan apresiasi kepada anggota GenBI atas kontribusi aktif dan partisipasi mereka dalam komunitas.
              </p>

              <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8 mt-12">
                {features.map((feature, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                      <feature.icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="mt-8">
                <Link href="/genbi-point" className={`group inline-flex items-center px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1 ${isDark ? 'bg-blue-600 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Lihat Selengkapnya
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative order-1 lg:order-2">
            <div className={`absolute inset-0 rounded-3xl ${isDark ? 'bg-gradient-to-br from-blue-600/10 to-purple-600/10' : 'bg-gradient-to-br from-blue-100/50 to-purple-100/50'} blur-3xl transform -rotate-6`} />
            <img src="./images/Hero Image GenBI Point.svg" alt="GenBI Point Illustration" className="relative w-full md:h-auto h-[300px] max-w-lg mx-auto transform hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default GenBIPointSection
