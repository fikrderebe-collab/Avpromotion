import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import imgMobile from '../assets/images/aapromotion_mobile_9_16_1789905271183.jpg';
import imgWide from '../assets/images/aapromotion_widescreen_3d_1789903131836.jpg';
import { VolumetricRays } from './VolumetricRays';
import { LensFlares } from './LensFlares';
import { CinematicSparkles } from './CinematicSparkles';
import { TransparentHeader } from './TransparentHeader';
import { ContentSections } from './ContentSections';

export const CinematicVideoScene: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');

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
    const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
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

  // Subtle natural interactive mouse / gyro tilt layered seamlessly over the 3D orbit
  const mouseX = useSpring(0, { stiffness: 40, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 25 });

  const interactiveRotX = useTransform(mouseY, [-0.5, 0.5], isMobile ? [3, -3] : [6, -6]);
  const interactiveRotY = useTransform(mouseX, [-0.5, 0.5], isMobile ? [-4, 4] : [-8, 8]);
  const interactiveTransX = useTransform(mouseX, [-0.5, 0.5], isMobile ? [-8, 8] : [-16, 16]);
  const interactiveTransY = useTransform(mouseY, [-0.5, 0.5], isMobile ? [-8, 8] : [-16, 16]);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const normX = clientX / window.innerWidth - 0.5;
      const normY = clientY / window.innerHeight - 0.5;
      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      id="cinematic-video-stage"
      className="relative w-full min-h-screen bg-[#05020c] select-none"
    >
      {/* ========================================================================= */}
      {/* FIXED 3D BACKGROUND LAYER (CONTINUOUS 3D ORBIT BEHIND ALL SECTIONS)        */}
      {/* ========================================================================= */}
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="absolute inset-[-4%] md:inset-[-6%] w-[108%] md:w-[112%] h-[108%] md:h-[112%] flex items-center justify-center pointer-events-none"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: interactiveRotX,
            rotateY: interactiveRotY,
            x: interactiveTransX,
            y: interactiveTransY,
          }}
          animate={{
            // Continuous 3D orbital trajectory calibrated for zero-crop on mobile
            rotateX: isMobile ? [2, -3, -1, 3, 2] : [3, -5, -2, 4, 3],
            rotateY: isMobile ? [-6, 6, 4, -5, -6] : [-11, 11, 8, -10, -11],
            rotateZ: isMobile ? [-0.8, 0.8, -0.5, 0.6, -0.8] : [-1.8, 1.8, -1.2, 1.2, -1.8],
            scale: isMobile ? [1.0, 1.03, 1.01, 1.03, 1.0] : [1.03, 1.09, 1.05, 1.08, 1.03],
            x: isMobile ? [-8, 8, -5, 7, -8] : [-18, 18, -12, 15, -18],
            y: isMobile ? [-5, 6, -4, 5, -5] : [-10, 12, -8, 10, -10],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Layer 1: Deep Volumetric Atmosphere & Moving God Rays */}
          <VolumetricRays />

          {/* Layer 2: Main 3D High-Def Backdrop (Dedicated 9:16 portrait on mobile, 16:9 on desktop) */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Responsive Picture: Dedicated vertical 9:16 mobile render showing the complete logo without edge cropping */}
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

            {/* Holographic Color Sheen overlay with slow breathing cycles */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-25"
              animate={{
                opacity: [0.15, 0.35, 0.18, 0.4, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
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

          {/* Layer 3: Dynamic Specular Lens Flares, Glints & Starburst Highlights */}
          <LensFlares />

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
        />
      </main>
    </div>
  );
};
