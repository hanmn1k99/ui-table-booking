import { motion } from 'motion/react';
import { Footer } from './Footer';
import { useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-white flex flex-col px-6">
      {/* Content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-linear-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-5xl">🍽️</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-orange-600 mb-2"
          >
            Quản Lý Đặt Bàn
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 max-w-xs mx-auto"
          >
            Đặt bàn nhanh – Ăn ngon trọn vị
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12"
        >
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer - bottom */}
      <Footer />
    </div>
  );
}