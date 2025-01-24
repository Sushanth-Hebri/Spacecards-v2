import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MixContent } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowLeft, FaClock, FaBookmark, FaShare, FaTag } from 'react-icons/fa';

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<MixContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use mock data
        const mockArticle = {
          id: '1',
          type: 'article',
          title: 'The Future of Space Exploration',
          content: `As we venture further into space, new technologies are emerging that will revolutionize how we explore the cosmos. From advanced propulsion systems to sustainable habitats, the future of space exploration looks promising.

          Recent developments in ion propulsion and nuclear thermal propulsion systems are paving the way for faster and more efficient space travel. These technologies could significantly reduce travel times to Mars and other destinations in our solar system.

          Space habitats are another crucial area of development. Engineers and scientists are working on self-sustaining systems that can support human life for extended periods. These include advanced life support systems, radiation shielding, and artificial gravity solutions.

          The role of artificial intelligence and robotics in space exploration is also expanding. Autonomous systems are becoming more capable of conducting complex missions with minimal human intervention, reducing risks and costs associated with human spaceflight.

          Private companies are increasingly joining national space agencies in the pursuit of space exploration. This commercialization is driving innovation and reducing costs through competition and new approaches to traditional challenges.

          The next decade promises to be an exciting time for space exploration, with multiple missions planned to the Moon, Mars, and beyond. These missions will not only advance our scientific understanding but also bring us closer to becoming a multi-planetary species.`,
          imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000',
          author: 'Sarah Johnson',
          publishedAt: '2024-01-20T14:30:00Z',
          tags: ['space', 'technology', 'future']
        };
        setArticle(mockArticle);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="min-h-screen pt-16 bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Full Article</h1>
        </div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Featured Image */}
          <div className="relative h-64 md:h-96">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FaClock className="w-4 h-4" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </div>
              {article.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-300"
                >
                  <FaTag className="w-3 h-3" />
                  {tag}
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {article.title}
            </h2>

            <div className="prose dark:prose-invert max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
