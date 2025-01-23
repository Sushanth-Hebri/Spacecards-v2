import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FlashCard } from '../components/FlashCard';
import { fetchFlashcards, Flashcard } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Feed() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setLoading(true);
    const cards = await fetchFlashcards();
    setFlashcards(cards);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-100 dark:bg-gray-900">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-[calc(100vh-4rem)] overflow-y-scroll hide-scrollbar snap-y snap-mandatory">
          {flashcards.map((card, index) => (
            <FlashCard
              key={card.id}
              card={card}
              onInView={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}