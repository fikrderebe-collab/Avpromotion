import React from 'react';
import { motion } from 'motion/react';

export const VolumetricRays: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
      {/* Central Volumetric Light Cone projecting from behind the crystal arrow */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full filter blur-[100px] pointer-events-none"
        style={{
          left: '50%',
          top: '44%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(139, 92, 246, 0.25) 45%, rgba(109, 40, 217, 0.1) 70%, rgba(3, 3, 10, 0) 85%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          scale: [1, 1.18, 0.96, 1.12, 1],
          opacity: [0.65, 0.9, 0.6, 0.85, 0.65],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Rotating God Rays Pinwheel */}
      <motion.div
        className="absolute w-[160vw] h-[160vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-25"
        style={{
          left: '50%',
          top: '42%',
          mixBlendMode: 'color-dodge',
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(192, 132, 252, 0.35) 15deg,
              transparent 30deg,
              transparent 60deg,
              rgba(236, 72, 153, 0.3) 75deg,
              transparent 90deg,
              transparent 120deg,
              rgba(168, 85, 247, 0.4) 140deg,
              transparent 160deg,
              transparent 200deg,
              rgba(192, 132, 252, 0.3) 220deg,
              transparent 240deg,
              transparent 280deg,
              rgba(216, 180, 254, 0.35) 305deg,
              transparent 320deg,
              transparent 360deg
            )
          `,
          maskImage: 'radial-gradient(circle at 50% 50%, black 15%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 15%, transparent 75%)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 65,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Counter-rotating Secondary Soft Beam */}
      <motion.div
        className="absolute w-[140vw] h-[140vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20"
        style={{
          left: '50%',
          top: '42%',
          mixBlendMode: 'screen',
          background: `
            conic-gradient(
              from 45deg,
              transparent 0deg,
              rgba(244, 114, 182, 0.28) 25deg,
              transparent 50deg,
              transparent 100deg,
              rgba(147, 51, 234, 0.35) 130deg,
              transparent 160deg,
              transparent 220deg,
              rgba(232, 121, 249, 0.3) 250deg,
              transparent 280deg,
              transparent 360deg
            )
          `,
          maskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 68%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 68%)',
        }}
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 85,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};
