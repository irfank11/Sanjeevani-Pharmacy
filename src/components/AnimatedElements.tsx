import { motion } from 'framer-motion';

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            background: `radial-gradient(circle, rgba(20, 184, 150, ${0.08 + i * 0.03}), transparent)`,
            left: `${15 + i * 20}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -30 - i * 10, 0],
            x: [0, 15 + i * 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute w-[500px] h-[500px] -top-40 -right-40 opacity-30">
        <motion.div
          className="w-full h-full rounded-full animate-morph"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 150, 0.3), rgba(163, 230, 53, 0.1), transparent)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="absolute w-[400px] h-[400px] -bottom-20 -left-20 opacity-20">
        <motion.div
          className="w-full h-full rounded-full animate-morph"
          style={{
            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.3), rgba(20, 184, 150, 0.1), transparent)',
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-mint-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
