import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Contact Us
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6"
          >
            <a
              href="mailto:sushanthhebri336@gmail.com"
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <FaEnvelope className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold mb-1">Email Us</h2>
                <p className="text-blue-100">sushanthhebri336@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/Sushanth-Hebri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <FaGithub className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-semibold mb-1">GitHub</h2>
                <p className="text-gray-600 dark:text-gray-300">@Sushanth-Hebri</p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}