import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaNewspaper, FaVideo, FaMusic, FaArrowRight } from 'react-icons/fa';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden hide-scrollbar">
      {/* Hero Section */}
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 sm:py-20">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <FaRocket className="w-20 h-20 mx-auto text-blue-600 dark:text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-7xl font-bold mb-6 gradient-text"
            >
              SpaceCards
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Your gateway to bite-sized space content. Discover articles, videos, music, and more in an engaging card format.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative inline-block group"
            >
              <Link
                to="/mix"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-600/20 dark:shadow-blue-900/30"
              >
                Start Exploring
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            {[{
              icon: FaNewspaper,
              title: "Articles & News",
              description: "Stay informed with the latest space news and discoveries in easy-to-digest formats"
            },
            {
              icon: FaVideo,
              title: "Videos & Media",
              description: "Watch exciting space launches, documentaries, and educational content"
            },
            {
              icon: FaMusic,
              title: "Audio Experience",
              description: "Listen to space-themed music and ambient sounds from the cosmos"
            }].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="about" className="min-h-screen py-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-3xl font-bold text-white">About Us</h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
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
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Sushanth Hebri
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Full-stack developer passionate about creating engaging and interactive web experiences. SpaceCards is a project that combines my love for space exploration with modern web technologies.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaRocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">About SpaceCards</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  SpaceCards is a modern web application that brings space-related content to life through an engaging card-based interface. Our platform aggregates articles, videos, music, and more, making space exploration accessible and entertaining for everyone.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
