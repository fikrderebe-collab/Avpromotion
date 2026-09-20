import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface TransparentHeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenQuickView?: () => void;
}

// Authentic Vector representation of the AAPromotion Amethyst Upward Arrow Monogram Logo
export const AAPromotionLogo: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AAPromotion Logo"
    >
      <defs>
        <linearGradient id="amethystGlow" x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
        <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#d8b4fe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.9" />
        </linearGradient>
        <filter id="purpleGlint" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d946ef" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Main Left Diagonal Crystal Pillar */}
      <path
        d="M22 76L46 28C48 24 52 24 54 28L60 40L42 76H22Z"
        fill="url(#amethystGlow)"
        filter="url(#purpleGlint)"
      />

      {/* Internal Reflection Facet */}
      <path
        d="M26 73L48 30C49 28 51 28 52 30L55 36L38 73H26Z"
        fill="url(#facetHighlight)"
        opacity="0.75"
      />

      {/* Central Inner Amethyst Diamond */}
      <polygon
        points="52,38 60,49 52,60 44,49"
        fill="#f5d0fe"
        opacity="0.9"
        filter="url(#purpleGlint)"
      />

      {/* Right Ascending Arrow Shaft & Arrowhead */}
      <path
        d="M56 46L76 26"
        stroke="url(#amethystGlow)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M62 26H76V40"
        stroke="url(#amethystGlow)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Amethyst Chevron Base Wings */}
      <path
        d="M34 76L52 50L70 76"
        stroke="url(#amethystGlow)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sparkle star at the top of the arrow */}
      <circle cx="72" cy="32" r="3" fill="#ffffff" filter="url(#purpleGlint)" />
    </svg>
  );
};

export const TransparentHeader: React.FC<TransparentHeaderProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact typographic navigation items matching user reference
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="modern-transparent-header"
      className="fixed top-0 left-0 right-0 z-40 w-full pointer-events-auto select-none"
    >
      {/* 100% Border-Free, Clean Transparent Nav Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-2">
        <div className="relative flex items-center justify-between py-2 sm:py-3 bg-transparent">
          {/* Brand Logo & Two-Tier Typography */}
          <div className="flex items-center">
            <button
              id="header-brand-home-btn"
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              {/* AAPromotion Amethyst Insignia */}
              <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <AAPromotionLogo className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_14px_rgba(192,132,252,0.85)]" />
              </div>

              {/* Two-Line Stacked Clean Typography matching reference */}
              <div className="flex flex-col leading-none">
                <span className="text-sm sm:text-base font-extrabold tracking-wider text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-md:phone-title-animated">
                  AA
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-widest text-white/90 uppercase -mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-md:phone-word-glow">
                  PROMOTION
                </span>
              </div>
            </button>
          </div>

          {/* Desktop & Tablet Minimalist Text Nav Links with Underline Indicator */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 text-sm lg:text-[15px] font-normal transition-colors duration-200 ${
                    isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-white/90'
                  }`}
                >
                  <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">{item.label}</span>

                  {/* Clean Horizontal Underline Active Indicator matching reference */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-200 shadow-[0_0_8px_rgba(255,255,255,0.6)] rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA Button */}
          <div className="flex items-center gap-3">
            <button
              id="header-cta-get-started"
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white/90 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            >
              <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Get started</span>
            </button>

            {/* Mobile Hamburger Button (Clean & Transparent) */}
            <button
              id="header-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white active:scale-95 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 p-4 rounded-2xl bg-black/90 shadow-[0_20px_45px_rgba(0,0,0,0.9)] border border-white/10"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'text-white font-medium bg-white/10'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="w-2 h-0.5 bg-white rounded-full shadow-[0_0_6px_#ffffff]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <button
                  id="mobile-explore-btn"
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-medium text-white rounded-full bg-white/15 hover:bg-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
                >
                  <span>Get started</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
