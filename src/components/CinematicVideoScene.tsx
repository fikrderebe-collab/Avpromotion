import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'motion/react';
import { Code2, Mouse } from 'lucide-react';
import imgMobile from '../assets/images/aapromotion_exact_mobile_1790222216008.jpg';
import imgWide from '../assets/images/aapromotion_exact_widescreen_1790222203146.jpg';
import { VolumetricRays } from './VolumetricRays';
import { LensFlares } from './LensFlares';
import { CinematicSparkles } from './CinematicSparkles';
import { TransparentHeader } from './TransparentHeader';
import { ContentSections } from './ContentSections';
import { SourceModal } from './SourceModal';

export const CinematicVideoScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSourceModalOpen, setIsSourceModalOpen] = useState<boolean>(false);
  const [isWheelScrolling, setIsWheelScrolling] = useState<boolean>(false);

  // Responsive device check
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Update activeTab based on user scroll position
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'team', 'portfolio', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =========================================================================
  // MOUSE SCROLL DRIVEN ANIMATION ENGINE (ANIMATION ON MOUSE SCROLL ONLY)
  // =========================================================================
  // Tracks page scroll progress [0, 1]
  const { scrollYProgress } = useScroll();

  // Mouse wheel physical impulse spring
  const wheelDeltaSpring = useSpring(0, { stiffness: 140, damping: 22, mass: 0.5 });

  // Spring-smoothed scroll progress for organic camera deceleration
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    mass: 0.6,
  });

  // Listen to wheel events directly for instantaneous mouse scroll responsiveness
  useEffect(() => {
    let wheelTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      setIsWheelScrolling(true);
      // Normalized impulse based on mouse scroll direction & magnitude
      const impulse = Math.max(-20, Math.min(20, e.deltaY * 0.12));
      wheelDeltaSpring.set(impulse);

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        wheelDeltaSpring.set(0);
        setIsWheelScrolling(false);
      }, 180);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [wheelDeltaSpring]);

  // Mouse scroll transforms:
  // 1. 3D Pitch (Rotate X): Sweeps smoothly along scroll sections and reacts to wheel impulse
  const baseRotateX = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile ? [0, 6, -5, 4, 0] : [0, 9, -7, 6, 0]
  );
  const wheelRotX = useTransform(wheelDeltaSpring, [-20, 20], [-4, 4]);

  // Combined X rotation driven solely by mouse scroll
  const scrollRotateX = useTransform(
    [baseRotateX, wheelRotX],
    ([base, wheel]: number[]) => base + wheel
  );

  // 2. 3D Yaw (Rotate Y): Sweeps through 3D orbital perspective as mouse scrolls
  const baseRotateY = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    isMobile ? [-4, 12, -10, 8, -3] : [-7, 20, -16, 14, -5]
  );
  const wheelRotY = useTransform(wheelDeltaSpring, [-20, 20], [-3, 3]);
  const scrollRotateY = useTransform(
    [baseRotateY, wheelRotY],
    ([base, wheel]: number[]) => base + wheel
  );

  // 3. 3D Roll (Rotate Z): Subtle dynamic camera bank on mouse scroll
  const scrollRotateZ = useTransform(smoothScroll, [0, 0.5, 1], [-1.2, 2.0, -0.8]);

  // 4. 3D Depth Zoom (Scale): Zooms inward at middle sections, settles at ends
  const baseScale = useTransform(
    smoothScroll,
    [0, 0.35, 0.7, 1],
    isMobile ? [1.0, 1.05, 1.02, 1.0] : [1.02, 1.14, 1.07, 1.02]
  );
  const wheelScale = useTransform(wheelDeltaSpring, [-20, 0, 20], [0.03, 0, 0.03]);
  const scrollScale = useTransform(
    [baseScale, wheelScale],
    ([base, wheel]: number[]) => base + wheel
  );

  // 5. Lateral & Vertical Parallax
  const scrollTransX = useTransform(
    smoothScroll,
    [0, 0.3, 0.7, 1],
    isMobile ? [-6, 10, -8, 0] : [-12, 18, -14, 0]
  );
  const scrollTransY = useTransform(
    smoothScroll,
    [0, 0.3, 0.7, 1],
    isMobile ? [-4, 8, -6, 0] : [-8, 14, -10, 0]
  );

  // 6. Volumetric God-Rays Rotation: Spins strictly in proportion to mouse scroll
  const scrollRaysRotate = useTransform(smoothScroll, [0, 1], [0, 360]);

  // 7. Specular Sheen Beam across 3D logo typography on mouse scroll
  const scrollSheenLeft = useTransform(smoothScroll, [0, 1], ['-50vw', '130vw']);

  // 8. Lens Flares scale and intensity driven by mouse scroll velocity & position
  const scrollFlareScale = useTransform(smoothScroll, [0, 0.35, 0.7, 1], [0.9, 1.35, 1.1, 0.92]);
  const scrollFlareOpacity = useTransform(
    smoothScroll,
    [0, 0.25, 0.5, 0.75, 1],
    [0.65, 1.0, 0.72, 0.95, 0.65]
  );

  // 9. Holographic Glow opacity linked to mouse scroll
  const holoGlowOpacity = useTransform(smoothScroll, [0, 0.5, 1], [0.2, 0.45, 0.22]);

  return (
    <div
      id="cinematic-video-stage"
      className="relative w-full min-h-screen bg-[#05020c] select-none"
    >
      {/* ========================================================================= */}
      {/* FIXED 3D BACKGROUND LAYER (ANIMATION CONTROLLED BY MOUSE SCROLL ONLY)      */}
      {/* ========================================================================= */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="absolute inset-[-4%] md:inset-[-6%] w-[108%] md:w-[112%] h-[108%] md:h-[112%] flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: scrollRotateX,
            rotateY: scrollRotateY,
            rotateZ: scrollRotateZ,
            scale: scrollScale,
            x: scrollTransX,
            y: scrollTransY,
          }}
        >
          {/* Layer 1: Deep Volumetric Atmosphere & Moving God Rays (Driven by Mouse Scroll) */}
          <VolumetricRays scrollRotate={scrollRaysRotate} scrollScale={scrollScale} />

          {/* Layer 2: Main 3D High-Def Backdrop (Exact AAPromotion Emblem) */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Dedicated 9:16 portrait on mobile, 16:9 on desktop */}
            <picture className="w-full h-full flex items-center justify-center">
              {/* Desktop and Tablet Widescreen */}
              <source media="(min-width: 768px)" srcSet={imgWide} />
              {/* Mobile Portrait Screens: Dedicated full-view 9:16 portrait */}
              <img
                src={imgMobile}
                alt="AAPromotion 3D Cinematic Visual"
                referrerPolicy="no-referrer"
                className={`w-full h-full ${
                  isMobile
                    ? 'object-contain object-center max-w-full max-h-[92vh] scale-100 p-2'
                    : 'object-cover object-center'
                } filter brightness-[1.03] contrast-[1.09] saturate-[1.08]`}
              />
            </picture>

            {/* Holographic Color Sheen overlay modulated by mouse scroll */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge"
              style={{
                opacity: holoGlowOpacity,
                background:
                  'radial-gradient(ellipse at 50% 45%, rgba(192, 132, 252, 0.5) 0%, rgba(236, 72, 153, 0.2) 40%, transparent 75%)',
              }}
            />

            {/* Cinematic Vignette Framing for Depth & Text Readability */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(
                    circle at 50% 48%,
                    rgba(5, 2, 12, 0.2) 20%,
                    rgba(5, 2, 12, 0.6) 65%,
                    rgba(3, 1, 8, 0.92) 90%,
                    #030108 100%
                  )
                `,
              }}
            />
          </div>

          {/* Layer 3: Dynamic Specular Lens Flares, Glints & Sheen (Driven by Mouse Scroll) */}
          <LensFlares
            scrollScale={scrollFlareScale}
            scrollOpacity={scrollFlareOpacity}
            scrollSheenLeft={scrollSheenLeft}
          />

          {/* Layer 4: Floating 3D Diamond Stardust & Ambient Bokeh Particles */}
          <CinematicSparkles />
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* TOP TRANSPARENT NAVIGATION HEADER                                         */}
      {/* ========================================================================= */}
      <TransparentHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById(tab);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenQuickView={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSource={() => setIsSourceModalOpen(true)}
      />

      {/* ========================================================================= */}
      {/* MODERN SCROLLABLE TRANSPARENT CONTENT SECTIONS                            */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full">
        <ContentSections
          onContactClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreServicesClick={() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSource={() => setIsSourceModalOpen(true)}
        />
      </main>

      {/* ========================================================================= */}
      {/* FLOATING ACTION HUD: SOURCE BUTTON & MOUSE SCROLL INDICATOR               */}
      {/* ========================================================================= */}
      {/* Mouse Scroll 3D Indicator Badge (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-neutral-950/85 border border-purple-500/30 backdrop-blur-md text-[11px] text-neutral-300 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(168,85,247,0.2)] pointer-events-none">
        <Mouse
          className={`w-3.5 h-3.5 text-purple-400 transition-transform ${
            isWheelScrolling ? 'scale-125 text-fuchsia-300 animate-bounce' : ''
          }`}
        />
        <span className="font-medium text-white/90">Mouse Scroll 3D Active</span>
        <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden ml-1">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full"
            style={{ width: useTransform(smoothScroll, [0, 1], ['5%', '100%']) }}
          />
        </div>
      </div>

      {/* Omnipresent Floating Source Code Button (Bottom Right) */}
      <motion.button
        id="floating-source-code-btn"
        onClick={() => setIsSourceModalOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-950/90 text-purple-200 border border-purple-500/50 shadow-[0_4px_24px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-md text-xs font-bold hover:text-white hover:border-purple-300 transition-all cursor-pointer"
        aria-label="View Project Source Code & Architecture"
      >
        <Code2 className="w-4 h-4 text-purple-300 animate-pulse" />
        <span>Source Code</span>
        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
      </motion.button>

      {/* ========================================================================= */}
      {/* INTERACTIVE SOURCE CODE & VERCEL DEPLOYMENT MODAL                         */}
      {/* ========================================================================= */}
      <SourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
      />
    </div>
  );
};
