import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';

interface OverlayModalProps {
  activeTab: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OverlayModal: React.FC<OverlayModalProps> = ({
  activeTab,
  isOpen,
  onClose,
}) => {
  if (!isOpen && activeTab === 'home') return null;

  const contentMap: Record<
    string,
    { title: string; subtitle: string; tag: string; description: string; highlights: string[] }
  > = {
    about: {
      title: 'About AAPromotion',
      subtitle: 'Creative Direction & Brand Evolution',
      tag: 'Our Story',
      description:
        'We design and engineer high-impact 3D cinematic visual identities, interactive digital experiences, and brand acceleration systems.',
      highlights: ['Dynamic 3D Motion Identity', 'Next-Gen Multi-Platform Distribution', 'Cinematic Soundscapes & Visuals'],
    },
    services: {
      title: 'Cinematic Creative Services',
      subtitle: '3D Visuals & Digital Signatures',
      tag: 'Creative Production',
      description:
        'Custom bespoke 3D identity animations, photorealistic ray-traced branding assets, and high-impact digital campaign visualizers.',
      highlights: ['Dynamic Gyro Spatial Parallax', 'Multi-device HDR Rendering', 'Bespoke Facet Logos'],
    },
    portfolio: {
      title: 'Featured Works & Campaigns',
      subtitle: 'Global Brand Scalability',
      tag: 'Signature Portfolio',
      description:
        'Amplify your signature visuals across mobile platforms, desktop video displays, digital billboards, and interactive touch screens.',
      highlights: ['Omnichannel Video Assets', 'Adaptive Aspect Ratios (9:16 to 21:9)', 'Direct Engagement Conversion'],
    },
    contact: {
      title: 'Connect with AAPromotion',
      subtitle: 'Start Your Brand Transformation',
      tag: 'Get In Touch',
      description:
        'Ready to elevate your digital presence with cutting-edge 3D branding and motion graphics? Reach out to our creative studio.',
      highlights: ['Direct Studio Consultation', 'Custom 3D Concept Previews', 'Rapid Production Turnaround'],
    },
  };

  const current = contentMap[activeTab] || {
    title: 'AAPromotion Cinematic Overview',
    subtitle: 'High-Impact Brand Identity',
    tag: 'Quick View',
    description:
      'Immerse in the responsive 3D cinematic canvas tailored specifically for mobile and desktop displays.',
    highlights: ['3D Spatial Parallax', 'Adaptive Viewport Fitting', 'Ultra-violet Ambient Glow'],
  };

  return (
    <AnimatePresence>
      {(isOpen || activeTab !== 'home') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75"
          />

          {/* Dialog Card - Clean Border-Free Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-neutral-950/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(168,85,247,0.2)] text-white"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-semibold uppercase tracking-wider text-purple-200 bg-purple-900/60 rounded-full">
                  {current.tag}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow">
                  {current.title}
                </h2>
                <p className="text-xs sm:text-sm text-purple-300/80 mt-0.5">
                  {current.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-purple-200/80 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
              {current.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 mb-6">
              {current.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-purple-950/40 text-xs sm:text-sm text-purple-100"
                >
                  <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-purple-200/80 hover:text-white rounded-xl hover:bg-white/5 transition-all"
              >
                Back to Scene
              </button>
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
