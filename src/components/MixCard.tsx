import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MixContent } from '../services/api';
import { useInView } from 'react-intersection-observer';
import { FaMusic, FaImage, FaVideo, FaNewspaper, FaHashtag, FaShare, FaArrowRight } from 'react-icons/fa';

interface MixCardProps {
  content: MixContent;
  onInView: () => void;
}

export function MixCard({ content, onInView }: MixCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) onInView();
    },
  });

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: content.title || 'Check this out!',
          text: content.content || 'Interesting content from SpaceCards',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const renderContent = () => {
    switch (content.type) {
      case 'video':
        const embedUrl = content.videoUrl ? getYouTubeEmbedUrl(content.videoUrl) : null;
        return (
          <div className="relative aspect-video bg-black rounded-3xl overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={content.title || "Video content"}
              />
            ) : (
              <video
                src={content.videoUrl}
                controls
                controlsList="nodownload"
                className="w-full h-full object-contain"
                poster={content.imageUrl}
              />
            )}
          </div>
        );
      case 'song':
        return (
          <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-3xl">
            {content.imageUrl && (
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img
                  src={content.imageUrl}
                  alt={content.title || "Song thumbnail"}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-blue-600/80" />
              </div>
            )}
            <FaMusic className="w-12 h-12 text-white/50 absolute top-4 right-4" />
            <h3 className="text-xl font-bold text-white mb-4 relative z-10">{content.title}</h3>
            <div className="relative z-10 w-full">
              <audio
                controls
                controlsList="nodownload"
                className="w-full mix-audio-player"
                style={{
                  minWidth: '200px',
                  height: '40px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <source src={content.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        );
      case 'image':
        return (
          <motion.div 
            className="relative aspect-square"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-full object-cover rounded-3xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        );
      case 'article':
        return (
          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {content.imageUrl && (
              <div className="relative">
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-48 object-cover rounded-3xl shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
              </div>
            )}
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              {content.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{content.content}</p>
            {content.content && content.content.length > 200 && (
              <Link
                to={`/article/${content.id}`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 font-medium"
              >
                Read More <FaArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        );
      case 'text':
        return (
          <motion.div 
            className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-3xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xl text-white font-medium leading-relaxed">{content.content}</p>
          </motion.div>
        );
    }
  };

  const TypeIcon = {
    video: FaVideo,
    song: FaMusic,
    image: FaImage,
    article: FaNewspaper,
    text: FaNewspaper
  }[content.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      className="min-h-screen snap-start snap-always flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          {/* Header */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center transform rotate-3">
                <TypeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{content.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{content.publishedAt}</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <FaShare className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {renderContent()}
          </motion.div>

          {/* Tags */}
          <motion.div 
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {content.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-700/50 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <FaHashtag className="w-3 h-3" />
                {tag}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
