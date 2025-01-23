import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MixCard } from '../components/MixCard';
import { fetchMixContent, MixContent } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Mix() {
  const [content, setContent] = useState<MixContent[]>([]);
  const [loading, setLoading] = useState(true);
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

  const loadContent = async () => {
    setLoading(true);
    const data = await fetchMixContent();
    setContent(data);
    setLoading(false);
    
    // Restore scroll position
    const container = document.querySelector('.mix-scroll-container');
    if (container && currentIndex > 0) {
      requestAnimationFrame(() => {
        container.scrollTo({
          top: currentIndex * window.innerHeight,
          behavior: 'auto'
        });
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mix-scroll-container h-[calc(100vh-4rem)] overflow-y-scroll hide-scrollbar snap-y snap-mandatory">
          {content.map((item, index) => (
            <MixCard
              key={item.id}
              content={item}
              onInView={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}