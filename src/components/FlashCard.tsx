import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flashcard } from '../services/api';
import { useInView } from 'react-intersection-observer';
import { FaClock, FaBookmark, FaTag, FaNewspaper } from 'react-icons/fa';

interface FlashCardProps {
  card: Flashcard;
  onInView: () => void;
}

export function FlashCard({ card, onInView }: FlashCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) onInView();
    },
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      className="h-[100vh] snap-start snap-always flex items-center justify-center p-4"
    >
      <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="relative h-64">
          {card.videoUrl ? (
            <video
              src={card.videoUrl}
              poster={card.imageUrl}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 mix-blend-overlay z-10" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 z-20"
          >
            <button className="p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white hover:bg-black/30 transition-colors">
              <FaBookmark className="w-5 h-5" />
            </button>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                <FaClock className="w-3 h-3 mr-2" />
                {card.publishedAt}
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                <FaTag className="w-3 h-3 mr-2" />
                {card.category}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaNewspaper className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{card.source} • {card.readTime}</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4"
          >
            {card.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 text-base line-clamp-3 mb-6"
          >
            {card.content}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <Link 
              to={`/post/${card.id}`}
              className="flex-1 text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-600/20 dark:shadow-blue-900/30"
            >
              Read Full Story
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}