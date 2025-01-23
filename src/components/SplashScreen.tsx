import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-4"
        >
          <FaRocket className="w-20 h-20 text-white" />
        </motion.div>
        <motion.h1
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity
          }}
          className="text-4xl font-bold text-white bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent bg-[length:200%_auto]"
        >
          SpaceCards
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}