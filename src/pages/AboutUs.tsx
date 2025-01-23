import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaRocket } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h1 className="text-3xl font-bold text-white">About Us</h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-48 h-48"
              >
                <img
                  src="https://github.com/Sushanth-Hebri/Sushanth-Hebri/blob/main/sushanth-render.png?raw=true"
                  alt="Sushanth Hebri"
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
              
              <div className="text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Sushanth Hebri
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-300 mb-6"
                >
                  Full-stack developer passionate about creating engaging and interactive web experiences. SpaceCards is a project that combines my love for space exploration with modern web technologies.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center md:justify-start gap-4"
                >
                  <a
                    href="https://github.com/Sushanth-Hebri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="mailto:sushanthhebri336@gmail.com"
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaEnvelope className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaRocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">About SpaceCards</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                SpaceCards is a modern web application that brings space-related content to life through an engaging card-based interface. Our platform aggregates articles, videos, music, and more, making space exploration accessible and entertaining for everyone.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}