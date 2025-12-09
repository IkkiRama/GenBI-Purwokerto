import { motion } from 'framer-motion';

const Hero = () => (
  <motion.div
    className="relative overflow-hidden h-[100vh] flex items-center justify-center flex-col"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    style={{
      backgroundImage: "url('/images/bg-homepage.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    {/* Overlay gradasi untuk memastikan teks tetap terbaca */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-blue-100/90"></div>

    <div className="relative max-w-7xl ">
      <div className="text-center">
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-blue-600">GenBI </span>Purwokerto
        </motion.h1>
        <motion.p
          className="md:mt-8 mt-3 max-w-2xl mx-auto md:text-xl text-base dark:text-gray-900 text-gray-900 font-bold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          #ENERGI UNTUK NEGERI - TOGETHER WE ARE STRONGER
        </motion.p>
        <motion.div
          className="mt-12 flex justify-center gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </div>
    </div>

    {/* Decorative elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-blue-200/20 rounded-full filter blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-blue-300/10 rounded-full filter blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
    </div>
  </motion.div>
);

export default Hero;
