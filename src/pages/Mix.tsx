import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MixCard } from '../components/MixCard';
import { fetchMixContent, MixContent } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaSearch, FaTv, FaTimes } from 'react-icons/fa';

export default function Mix() {
  const [content, setContent] = useState<MixContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<MixContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = sessionStorage.getItem('mixScrollIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    loadContent();
    return () => {
      sessionStorage.setItem('mixScrollIndex', currentIndex.toString());
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem('mixScrollIndex', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContent(content);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = content.filter(item => {
        const tags = item.tags.join(' ').toLowerCase();
        const title = (item.title || '').toLowerCase();
        const contentText = (item.content || '').toLowerCase();
        return tags.includes(query) || 
               title.includes(query) || 
               contentText.includes(query);
      });
      setFilteredContent(filtered);
    }
  }, [searchQuery, content]);

  const loadContent = async () => {
    setLoading(true);
    const data = await fetchMixContent();
    setContent(data);
    setFilteredContent(data);
    setLoading(false);
  };

  const LiveStreamModal = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
    onClick={() => setShowLiveModal(false)}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="w-full max-w-md mx-auto bg-gray-900 rounded-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <h2 className="text-xl font-bold text-white">TV9 Live Stream</h2>
        <button
          onClick={() => setShowLiveModal(false)}
          className="p-2 hover:bg-gray-700 rounded-xl transition-colors"
        >
          <FaTimes className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* YouTube iframe */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/jdJoOhqCipA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </motion.div>
  </motion.div>
);


  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Search Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Live Stream Button */}
      <button
        onClick={() => setShowLiveModal(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <FaTv className="w-6 h-6" />
      </button>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-[calc(100vh-8rem)] mt-14 overflow-y-scroll hide-scrollbar snap-y snap-mandatory">
          {filteredContent.map((item, index) => (
            <MixCard
              key={item.id}
              content={item}
              onInView={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {showLiveModal && <LiveStreamModal />}
      </AnimatePresence>
    </div>
  );
}
