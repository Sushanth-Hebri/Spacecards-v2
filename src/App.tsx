import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import LandingPage from './pages/LandingPage';
import Feed from './pages/Feed';
import Mix from './pages/Mix';
import FullPost from './pages/FullPost';
import Article from './pages/Article';

export default function App() {
  const { theme } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.documentElement.className = theme;
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <AnimatePresence>
          {showSplash && <SplashScreen />}
        </AnimatePresence>
        
        {!showSplash && (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/mix" element={<Mix />} />
              <Route path="/post/:id" element={<FullPost />} />
              <Route path="/article/:id" element={<Article />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}
