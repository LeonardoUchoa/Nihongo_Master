import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      navigate(user ? '/home' : '/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, navigate, user]);

  return (
    <div className="size-full flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Sakura petals background decoration */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10"
      >
        <div className="text-[120px] mb-4" style={{ color: '#E63946' }}>日</div>
        <h1 className="text-white text-3xl mb-2">日本語マスター</h1>
        <p className="text-gray-400 text-lg mb-1">Nihongo Master</p>
        <p className="text-gray-500 text-sm">Aprenda japonês com repetição espaçada</p>
      </motion.div>

      {/* Loading bar */}
      <div className="absolute bottom-12 left-0 right-0 px-16">
        <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundColor: '#E63946' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
