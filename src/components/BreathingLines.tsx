import { motion } from 'framer-motion';

export default function BreathingLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            border: '1px solid var(--accent)',
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Floating orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full animate-morph"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            background: `radial-gradient(circle, ${i === 0 ? 'rgba(20, 184, 150, 0.15)' : i === 1 ? 'rgba(163, 230, 53, 0.1)' : 'rgba(20, 184, 150, 0.08)'}, transparent)`,
            left: `${70 + i * 5}%`,
            top: `${10 + i * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
