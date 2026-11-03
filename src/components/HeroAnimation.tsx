import { motion } from 'framer-motion';

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
      {/* 3D Eye illustration */}
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-mint-300/30 dark:border-mint-500/20"
          style={{ width: '320px', height: '320px', left: '-60px', top: '-60px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute rounded-full border border-mint-400/20"
          style={{ width: '260px', height: '260px', left: '-30px', top: '-30px' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Central eye shape */}
        <motion.div
          className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px]"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Eye outer */}
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2dd4b0" />
                <stop offset="40%" stopColor="#14b896" />
                <stop offset="70%" stopColor="#0d9478" />
                <stop offset="100%" stopColor="#0f7661" />
              </radialGradient>
              <radialGradient id="pupilGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a2e2a" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
              <linearGradient id="scleraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#f0fdf9" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Eye white (sclera) */}
            <ellipse cx="100" cy="100" rx="90" ry="60" fill="url(#scleraGradient)" stroke="#d1ebe5" strokeWidth="1" />
            
            {/* Iris */}
            <motion.circle
              cx="100" cy="100" r="40"
              fill="url(#irisGradient)"
              filter="url(#glow)"
              animate={{ r: [40, 42, 40] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Iris pattern lines */}
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={i}
                x1="100" y1="65" x2="100" y2="75"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
                transform={`rotate(${i * 30} 100 100)`}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
            
            {/* Pupil */}
            <motion.circle
              cx="100" cy="100" r="16"
              fill="url(#pupilGradient)"
              animate={{ r: [16, 14, 16] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Light reflection */}
            <circle cx="110" cy="90" r="6" fill="white" opacity="0.8" />
            <circle cx="95" cy="105" r="3" fill="white" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-mint-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
