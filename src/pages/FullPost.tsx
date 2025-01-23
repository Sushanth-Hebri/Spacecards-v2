import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flashcard } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowLeft, FaClock, FaBookmark, FaShare, FaTag, FaNewspaper } from 'react-icons/fa';

export default function FullPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Flashcard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
        const data = await response.json();
        setPost({
          id: data.id.toString(),
          title: data.title,
          content: data.summary,
          imageUrl: data.image_url,
          videoUrl: data.video_url || null,
          publishedAt: new Date(data.published_at).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          source: data.news_site || 'Space News',
          readTime: `${Math.ceil(data.summary.split(' ').length / 200)} min read`,
          category: data.category || 'General'
        });
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!post) return <div>Post not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="h-full flex flex-col">
        {/* Header Section */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white hover:bg-black/30 transition-all"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white hover:bg-black/30 transition-all">
              <FaBookmark className="w-5 h-5" />
            </button>
            <button className="p-3 bg-black/20 backdrop-blur-md rounded-2xl text-white hover:bg-black/30 transition-all">
              <FaShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Section */}
        <div className="relative h-[45vh]">
          {post.videoUrl ? (
            <video
              src={post.videoUrl}
              poster={post.imageUrl}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 mix-blend-overlay z-10" />
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-20 px-6 pb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                <FaClock className="w-3 h-3 mr-2" />
                {post.publishedAt}
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                <FaTag className="w-3 h-3 mr-2" />
                {post.category}
              </div>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
        
        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-y-auto hide-scrollbar p-6"
        >
          <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <FaNewspaper className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {post.source} • {post.readTime}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {post.content}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}