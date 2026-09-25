import React from 'react';
import { motion, MotionValue } from 'motion/react';

interface LensFlaresProps {
  scrollScale?: MotionValue<number>;
  scrollOpacity?: MotionValue<number>;
  scrollSheenLeft?: MotionValue<string>;
}

export const LensFlares: React.FC<LensFlaresProps> = ({
  scrollScale,
  scrollOpacity,
  scrollSheenLeft,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
      {/* 1. Primary Brilliant Starburst on the Arrow Tip (Synchronized with mouse scroll) */}
      <div className="absolute left-[68%] top-[25%] md:left-[64%] md:top-[27%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* Diamond Star core */}
        <motion.div
          className="relative w-16 h-16 flex items-center justify-center"
          style={{
            scale: scrollScale,
            opacity: scrollOpacity,
          }}
        >
          {/* Anamorphic Horizontal Blue-Violet Flare Streak */}
          <div
            className="absolute w-[240px] md:w-[380px] h-[3px] bg-gradient-to-r from-transparent via-purple-200 to-transparent -translate-x-1/2 left-1/2 rounded-full filter blur-[0.5px]"
            style={{
              boxShadow:
                '0 0 16px 2px rgba(216, 180, 254, 0.9), 0 0 35px 6px rgba(168, 85, 247, 0.6)',
            }}
          />

          {/* Cross Flare 45 deg */}
          <div className="absolute w-[70px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45" />
          <div className="absolute w-[70px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-45" />

          {/* Central Bright Hotspot */}
          <div className="w-5 h-5 rounded-full bg-white filter blur-[1.5px] shadow-[0_0_20px_6px_rgba(236,72,153,0.9)]" />
        </motion.div>
      </div>

      {/* 2. Secondary Shimmer on Gemstone Facet (Left crystal apex) */}
      <div className="absolute left-[33%] top-[45%] md:left-[36%] md:top-[43%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="relative w-10 h-10 flex items-center justify-center"
          style={{
            scale: scrollScale,
            opacity: scrollOpacity,
          }}
        >
          <div className="absolute w-[120px] md:w-[180px] h-[2px] bg-gradient-to-r from-transparent via-violet-200 to-transparent rounded-full filter blur-[0.5px]" />
          <div className="w-3 h-3 rounded-full bg-white filter blur-[1px] shadow-[0_0_14px_4px_rgba(192,132,252,0.85)]" />
        </motion.div>
      </div>

      {/* 3. Third Gemstone Glint on Center Diamond facet */}
      <div className="absolute left-[52%] top-[34%] md:left-[52%] md:top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="relative w-8 h-8 flex items-center justify-center"
          style={{
            scale: scrollScale,
            opacity: scrollOpacity,
          }}
        >
          <div className="absolute w-[100px] h-[2px] bg-gradient-to-r from-transparent via-pink-200 to-transparent rounded-full" />
          <div className="w-2.5 h-2.5 rounded-full bg-white filter blur-[1px] shadow-[0_0_12px_3px_rgba(244,114,182,0.8)]" />
        </motion.div>
      </div>

      {/* 4. Sweeping Specular Chrome Sheen Beam across the 3D typography - Driven by Mouse Scroll */}
      <motion.div
        className="absolute w-[45vw] h-[240%] top-[-70%] pointer-events-none opacity-30"
        style={{
          background:
            'linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.35) 50%, rgba(216, 180, 254, 0.6) 53%, transparent 68%)',
          mixBlendMode: 'color-dodge',
          left: scrollSheenLeft,
        }}
      />

      {/* 5. Lower-Right Luxury 4-Point Diamond Brand Seal Star */}
      <div className="absolute right-6 bottom-6 md:right-12 md:bottom-12 pointer-events-none">
        <motion.div
          className="relative w-8 h-8 flex items-center justify-center opacity-60"
          style={{
            scale: scrollScale,
            opacity: scrollOpacity,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 fill-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.7)]"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};
