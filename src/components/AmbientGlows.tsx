import React from 'react';
import { motion } from 'motion/react';

export const AmbientGlows: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {/* Dynamic Luminous Plasma Orb 1: Electric Cyan & Violet */}
      <motion.div
        className="absolute rounded-full filter blur-[90px] opacity-60 mix-blend-screen"
        style={{
          width: '45vw',
          height: '45vw',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.45) 0%, rgba(99, 102, 241, 0.25) 50%, rgba(0, 0, 0, 0) 75%)',
          top: '-10%',
          left: '-5%',
        }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, 60, 110, -50, 0],
          scale: [1, 1.25, 0.95, 1.15, 1],
          rotate: [0, 45, 120, 240, 360],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Dynamic Luminous Plasma Orb 2: Neon Magenta & Electric Rose */}
      <motion.div
        className="absolute rounded-full filter blur-[110px] opacity-55 mix-blend-screen"
        style={{
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.42) 0%, rgba(168, 85, 247, 0.28) 50%, rgba(0, 0, 0, 0) 75%)',
          bottom: '-15%',
          right: '-8%',
        }}
        animate={{
          x: [0, -90, 50, -70, 0],
          y: [0, -80, -120, 60, 0],
          scale: [1.1, 0.9, 1.3, 1, 1.1],
          rotate: [360, 270, 150, 60, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center Harmonic Pulse: Deep Amber / Electric Indigo Core */}
      <motion.div
        className="absolute rounded-full filter blur-[130px] opacity-40 mix-blend-color-dodge"
        style={{
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, rgba(59, 130, 246, 0.3) 40%, rgba(245, 158, 11, 0.15) 70%, rgba(0, 0, 0, 0) 85%)',
          top: '30%',
          left: '30%',
        }}
        animate={{
          scale: [0.85, 1.3, 0.95, 1.2, 0.85],
          opacity: [0.3, 0.55, 0.35, 0.5, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Cybernetic Geometric Grid Wave (Faint Perspective Accent) */}
      <div 
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
        }}
      />
    </div>
  );
};
