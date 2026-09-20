import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Share2,
  Megaphone,
  Palette,
  Target,
  Search,
  Code,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Send,
  SendHorizontal,
  ExternalLink,
  Play,
  Quote,
  Users,
  Award,
  Clock,
  ChevronRight,
  Instagram,
  Heart,
  MessageCircle,
  ArrowUp,
} from 'lucide-react';

interface ContentSectionsProps {
  onContactClick?: () => void;
  onExploreServicesClick?: () => void;
}

// Hook to detect phone screens (< 768px). PC is kept completely untouched.
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// Modern animated typography component with letter/word stagger
export const AnimatedTitle: React.FC<{
  text: string;
  className?: string;
  gradient?: boolean;
}> = ({ text, className = '', gradient = false }) => {
  const isMobile = useIsMobile();
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-block ${className} ${isMobile ? 'phone-title-animated' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: isMobile ? 0.08 : 0.06,
          },
        },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-2 ${
            gradient
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400'
              : ''
          } ${isMobile ? 'phone-word-glow' : ''}`}
          variants={{
            hidden: isMobile
              ? { opacity: 0, y: 22, scale: 0.88 }
              : { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: isMobile
                ? {
                    type: 'spring',
                    damping: 14,
                    stiffness: 160,
                    duration: 0.65,
                  }
                : { duration: 0.5, ease: 'easeOut' },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const ContentSections: React.FC<ContentSectionsProps> = ({
  onContactClick,
  onExploreServicesClick,
}) => {
  const isMobile = useIsMobile();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      title: 'Social Media Management',
      desc: 'End-to-end social media strategy, content scheduling, community engagement, and performance analytics across all major platforms.',
      icon: Share2,
      tag: 'Organic Reach',
    },
    {
      title: 'Digital Marketing',
      desc: 'Data-driven campaigns that reach the right audience at the right time — maximizing ROI across every digital channel.',
      icon: Megaphone,
      tag: 'Performance',
    },
    {
      title: 'Content Creation',
      desc: 'Compelling visuals, copy, and video content crafted to tell your brand story and drive meaningful engagement.',
      icon: Palette,
      tag: 'Viral Creative',
    },
    {
      title: 'Branding',
      desc: 'Distinctive brand identity development — from logo design to brand guidelines that set you apart from competitors.',
      icon: Sparkles,
      tag: 'Identity & 3D',
    },
    {
      title: 'Facebook & Instagram Ads',
      desc: 'Precision-targeted paid campaigns on Meta platforms designed to convert viewers into loyal customers.',
      icon: Target,
      tag: 'High Conversion',
    },
    {
      title: 'SEO',
      desc: 'Search engine optimization that improves your visibility, drives organic traffic, and builds long-term authority.',
      icon: Search,
      tag: 'Search Ranking',
    },
    {
      title: 'Website Development',
      desc: 'Fast, responsive, and conversion-optimized websites built with modern technologies and best UX practices.',
      icon: Code,
      tag: 'Web & Mobile',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Data-Driven Strategy',
      desc: 'Every decision is backed by analytics and market research to maximize your return on investment.',
      icon: TrendingUp,
    },
    {
      title: 'Creative Excellence',
      desc: 'Our team produces standout content and campaigns that capture attention and inspire action.',
      icon: Sparkles,
    },
    {
      title: 'Dedicated Support',
      desc: "You'll have a dedicated account manager who knows your business and is always available.",
      icon: Users,
    },
    {
      title: 'Transparent Reporting',
      desc: 'Clear, regular reports so you always know exactly how your campaigns are performing.',
      icon: CheckCircle2,
    },
    {
      title: 'Fast Turnaround',
      desc: 'We move quickly without sacrificing quality — delivering results on time, every time.',
      icon: Clock,
    },
    {
      title: 'Long-Term Partnership',
      desc: "We're invested in your success for the long haul, not just a one-off project.",
      icon: Award,
    },
  ];

  // Exact TikTok videos requested from @aapromotiondire
  const tiktokVideos = [
    {
      id: '7687189590553136391',
      title: 'AA Promotion Commercial Reel',
      subtitle: 'Modern, mobile-first with online ordering integration',
      tag: 'Video Production',
      desc: 'Cinematic promotional reel with high-impact visuals, dynamic pacing, and conversion architecture.',
      tiktokUrl:
        'https://www.tiktok.com/@aapromotiondire/video/7687189590553136391?is_from_webapp=1&sender_device=pc&web_id=7683196717721798164',
    },
    {
      id: '7682811387072072967',
      title: 'Strategic Brand Growth Campaign',
      subtitle: 'Viral content series & targeted conversions',
      tag: 'Content & Ads',
      desc: 'High-energy motion storytelling and targeted social creative delivering maximum viewer engagement.',
      tiktokUrl:
        'https://www.tiktok.com/@aapromotiondire/video/7682811387072072967?is_from_webapp=1&sender_device=pc&web_id=7683196717721798164',
    },
  ];

  const instagramLink =
    'https://www.instagram.com/aapromotiondire?igsh=dXlweXh2bWVhMTgz';

  const testimonials = [
    {
      quote:
        '“AA Promotion transformed our social media presence completely. Our engagement tripled within three months, and the team is always responsive and creative.”',
      author: 'Sarah Mitchell',
      role: 'CEO, Bloom Boutique',
    },
    {
      quote:
        '“Their digital marketing strategy delivered measurable results from day one. We saw a 40% increase in qualified leads within the first quarter.”',
      author: 'James Rodriguez',
      role: 'Founder, TechStart Solutions',
    },
    {
      quote:
        '“Professional, strategic, and genuinely invested in our success. AA Promotion doesn’t just manage accounts — they become part of your team.”',
      author: 'Emily Chen',
      role: 'Marketing Director, GreenLeaf Co.',
    },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="w-full text-white pointer-events-auto">
      {/* ========================================================================= */}
      {/* 1. HERO CALL-TO-ACTION & STRATEGY PILLARS */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Animated Tag */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 mb-6 border border-white/10 ${
              isMobile ? 'phone-float-badge' : ''
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span
              className={`text-xs uppercase tracking-widest text-purple-200 font-medium ${
                isMobile ? 'phone-word-glow' : ''
              }`}
            >
              Digital Marketing & Growth Agency
            </span>
          </motion.div>

          {/* Animated Hero Headline with Staggered Word Reveal */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            <AnimatedTitle text="Elevate Your Brand with" />
            <br />
            <motion.span
              className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-400 inline-block animate-pulse ${
                isMobile ? 'phone-shimmer-headline phone-title-animated' : ''
              }`}
              animate={
                isMobile
                  ? {
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      scale: [1, 1.02, 1],
                    }
                  : {
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }
              }
              transition={{
                duration: isMobile ? 3.5 : 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Strategic Digital Growth
            </motion.span>
          </h1>

          {/* Subtitle with Animated Fade Entry */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            className={`text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] ${
              isMobile ? 'phone-word-glow' : ''
            }`}
          >
            We help businesses build powerful online presences through social media management,
            digital marketing, and creative content that drives real results.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <a
              href="#contact"
              onClick={onContactClick}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_4px_25px_rgba(168,85,247,0.5)] active:scale-95 transition-all"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="#services"
              onClick={onExploreServicesClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white/90 bg-white/10 hover:bg-white/20 active:scale-95 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
            >
              <span>Explore Services</span>
            </a>
          </motion.div>

          {/* 4 Value Pillars with Stagger InView Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
            {[
              { title: 'Strategy that works', sub: 'Precision Roadmaps' },
              { title: 'Content that connects', sub: 'High Engagement' },
              { title: 'Growth that lasts', sub: 'Sustainable Scale' },
              { title: 'Results that matter', sub: 'Clear ROI' },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-3.5 sm:p-4 rounded-2xl bg-black/25 text-left transition-all hover:bg-black/40 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400 mb-2 shadow-[0_0_8px_#c084fc]" />
                <h4
                  className={`text-xs sm:text-sm font-semibold text-white leading-tight ${
                    isMobile ? 'phone-title-animated' : ''
                  }`}
                >
                  {pillar.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">{pillar.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT US & IMPACT STATS */}
      {/* ========================================================================= */}
      <section
        id="about"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <span
              className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
                isMobile ? 'phone-float-badge' : ''
              }`}
            >
              About Us
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <AnimatedTitle text="Your Partner in Digital Excellence" />
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <p>
                <strong className="text-white font-semibold">AA Promotion</strong> is a full-service
                digital marketing and social media management agency built on a simple belief:{' '}
                <em className="text-purple-200">great marketing should be strategic, creative, and measurable.</em>
              </p>
              <p>
                We work closely with businesses of all sizes to craft tailored strategies that
                connect with audiences, build brand loyalty, and drive sustainable growth. From
                content creation to paid advertising, our team brings expertise and passion to every
                project.
              </p>
              <p>
                Our approach combines data-driven insights with creative storytelling — ensuring
                every campaign delivers results that matter.
              </p>
            </div>
          </motion.div>

          {/* Right Stats Grid with Stagger */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { value: '150+', label: 'Projects Completed' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '2+', label: 'Years Experience' },
              { value: '15+', label: 'Active Clients' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="p-6 rounded-2xl bg-black/25 text-center hover:bg-black/40 transition-all border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <div
                  className={`text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 mb-1 drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)] ${
                    isMobile ? 'phone-shimmer-headline' : ''
                  }`}
                >
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR SERVICES */}
      {/* ========================================================================= */}
      <section
        id="services"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
              isMobile ? 'phone-float-badge' : ''
            }`}
          >
            Our Services
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <AnimatedTitle text="Everything You Need to Grow Online" />
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Comprehensive digital marketing solutions tailored to your business goals — from strategy
            to execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-6 sm:p-7 rounded-2xl bg-black/25 hover:bg-black/40 transition-all duration-300 flex flex-col justify-between border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-600/30 text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2.5 py-1 rounded-full">
                      {srv.tag}
                    </span>
                  </div>
                  <h3
                    className={`text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors ${
                      isMobile ? 'phone-title-animated' : ''
                    }`}
                  >
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{srv.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center text-xs font-medium text-purple-300 group-hover:text-purple-200">
                  <span>Explore service</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE US */}
      {/* ========================================================================= */}
      <section
        id="why-us"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
              isMobile ? 'phone-float-badge' : ''
            }`}
          >
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <AnimatedTitle text="The AA Promotion Difference" />
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            We combine strategic thinking with creative execution to deliver marketing that actually works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-black/25 hover:bg-black/40 transition-all duration-300 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-600/30 text-purple-200 mb-4 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3
                  className={`text-base sm:text-lg font-bold text-white mb-2 ${
                    isMobile ? 'phone-title-animated' : ''
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PORTFOLIO & RECENT WORK (THE 2 EXACT TIKTOK VIDEOS REQUESTED)          */}
      {/* ========================================================================= */}
      <section
        id="portfolio"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
              isMobile ? 'phone-float-badge' : ''
            }`}
          >
            Portfolio
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <AnimatedTitle text="Recent Work" />
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            A selection of projects where strategy, creativity, and execution came together to deliver outstanding results.
            Watch our featured video campaigns from our official TikTok channel below.
          </p>
        </motion.div>

        {/* 2 Featured TikTok Video Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {tiktokVideos.map((vid, i) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col rounded-3xl bg-black/35 overflow-hidden hover:bg-black/50 transition-all border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.5)]"
            >
              {/* Responsive Embedded TikTok Video Player */}
              <div className="relative w-full aspect-[9/16] max-h-[620px] bg-black/80 overflow-hidden flex items-center justify-center">
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${vid.id}?lang=en-US`}
                  title={vid.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Details and Direct Link */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-300 bg-purple-900/60 border border-purple-700/40 px-2.5 py-0.5 rounded-full">
                      {vid.tag}
                    </span>
                    <span className="text-[11px] text-purple-300/80 flex items-center gap-1 font-medium">
                      <Play className="w-3 h-3 text-purple-400 fill-current" />
                      <span>Featured Work</span>
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold text-white mb-1 ${
                      isMobile ? 'phone-title-animated' : ''
                    }`}
                  >
                    {vid.title}
                  </h3>
                  <p className="text-xs font-semibold text-purple-200/90 mb-2">{vid.subtitle}</p>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-5">{vid.desc}</p>
                </div>

                <a
                  href={vid.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-[0_2px_10px_rgba(0,0,0,0.3)] active:scale-95"
                >
                  <span>Open Video in TikTok</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct Link Banner to official TikTok channel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-3xl bg-black/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left border border-white/10 max-w-4xl mx-auto shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <Play className="w-7 h-7 fill-current" />
            </div>
            <div>
              <h4
                className={`text-lg font-bold text-white ${
                  isMobile ? 'phone-title-animated' : ''
                }`}
              >
                Follow @aapromotiondire on TikTok
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                Explore our full library of commercial reels, creative transformations, and growth strategy.
              </p>
            </div>
          </div>
          <a
            href="https://www.tiktok.com/@aapromotiondire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 transition-all active:scale-95 shadow-[0_4px_16px_rgba(168,85,247,0.3)]"
          >
            <span>Visit Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TESTIMONIALS */}
      {/* ========================================================================= */}
      <section
        id="testimonials"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
              isMobile ? 'phone-float-badge' : ''
            }`}
          >
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <AnimatedTitle text="What Our Clients Say" />
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-7 rounded-2xl bg-black/25 flex flex-col justify-between hover:bg-black/40 transition-all border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              <div>
                <Quote className="w-8 h-8 text-purple-400/50 mb-4" />
                <p
                  className={`text-sm text-neutral-200 leading-relaxed italic mb-6 ${
                    isMobile ? 'phone-word-glow' : ''
                  }`}
                >
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="font-bold text-white text-sm">{t.author}</div>
                <div className="text-xs text-purple-300">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. MEET THE MINDS / LEADERSHIP TEAM */}
      {/* ========================================================================= */}
      <section
        id="team"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span
            className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
              isMobile ? 'phone-float-badge' : ''
            }`}
          >
            Meet The Minds
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <AnimatedTitle text="Our Leadership Team" />
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            A dedicated group of visionaries and operators driving our mission forward. Experience,
            innovation, and passion combined.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="p-8 rounded-3xl bg-black/25 text-center hover:bg-black/40 transition-all flex flex-col items-center border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
            {/* Avatar / Monogram */}
            <div className="relative w-24 h-24 rounded-2xl mb-5 flex items-center justify-center bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-[0_0_25px_rgba(168,85,247,0.5)]">
              <span className="text-3xl font-extrabold text-white">AK</span>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-neutral-900 text-purple-300 border border-purple-500/40">
                Founder
              </span>
            </div>

            <h3
              className={`text-2xl font-bold text-white mb-1 ${
                isMobile ? 'phone-title-animated' : ''
              }`}
            >
              AKwak
            </h3>
            <p
              className={`text-sm font-semibold text-purple-300 mb-4 ${
                isMobile ? 'phone-word-glow' : ''
              }`}
            >
              CEO & Founder
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mb-6">
              2+ Years in Digital Marketing | Building the ultimate results-driven agency for client success
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://t.me/AA_PROMOTION"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/15 transition-all"
              >
                <SendHorizontal className="w-3.5 h-3.5 text-purple-300" />
                <span>Telegram @AA_PROMOTION</span>
              </a>

              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/15 transition-all"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CONTACT SECTION & DIRECT INQUIRY */}
      {/* ========================================================================= */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span
              className={`text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3 block ${
                isMobile ? 'phone-float-badge' : ''
              }`}
            >
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              <AnimatedTitle text="Let's Start a Conversation" />
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
              Ready to grow your brand? Reach out and we'll get back to you within 24 hours.
            </p>

            {/* Direct Info List - All transparent matching social media fields */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:aapromotiondire@gmail.com"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/25 hover:bg-black/40 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    Email
                  </div>
                  <div className="text-sm font-semibold text-white">aapromotiondire@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:0983860338"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/25 hover:bg-black/40 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    Phone
                  </div>
                  <div className="text-sm font-semibold text-white">0983860338</div>
                </div>
              </a>

              {/* Instagram field matching other social media links */}
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/25 hover:bg-black/40 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600/40 to-purple-600/40 flex items-center justify-center text-pink-200 group-hover:from-pink-600 group-hover:to-purple-600 group-hover:text-white transition-colors">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    Instagram
                  </div>
                  <div className="text-sm font-semibold text-white">@aapromotiondire</div>
                </div>
              </a>

              {/* TikTok field matching other social media links */}
              <a
                href="https://www.tiktok.com/@aapromotiondire"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/25 hover:bg-black/40 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    TikTok
                  </div>
                  <div className="text-sm font-semibold text-white">@aapromotiondire</div>
                </div>
              </a>

              {/* Telegram field matching other social media links */}
              <a
                href="https://t.me/AA_PROMOTION"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/25 hover:bg-black/40 transition-all group border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <SendHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    Telegram
                  </div>
                  <div className="text-sm font-semibold text-white">@AA_PROMOTION</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/25 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                    Location
                  </div>
                  <div className="text-sm font-semibold text-white">Available Worldwide</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-9 rounded-3xl bg-black/35 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
              <h3 className="text-xl font-bold text-white mb-2">Send Us a Direct Message</h3>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6">
                Fill in your project details and our growth team will connect with you.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-purple-950/60 text-center border border-purple-600/40">
                  <CheckCircle2 className="w-10 h-10 text-fuchsia-400 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-white mb-1">Message Received!</h4>
                  <p className="text-xs text-neutral-300">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm text-white rounded-xl bg-white/[0.06] border border-white/10 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm text-white rounded-xl bg-white/[0.06] border border-white/10 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-white rounded-xl bg-white/[0.06] border border-white/10 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm text-white rounded-xl bg-white/[0.06] border border-white/10 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 active:scale-[0.99] shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ENHANCED MODERN FOOTER SECTION WITH INSTAGRAM & BACK TO TOP             */}
      {/* ========================================================================= */}
      <footer className="relative border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-extrabold tracking-wider text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                AA PROMOTION
              </span>
            </div>
            <p className="text-sm text-neutral-300 max-w-md leading-relaxed mb-6">
              A full-service digital marketing agency dedicated to helping brands build powerful online
              presences through strategy, viral content, performance advertising, and measurable results.
            </p>

            {/* Social Channels Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-pink-300 transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@aapromotiondire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-300 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-purple-400 fill-current" />
                <span>TikTok</span>
              </a>

              <a
                href="https://t.me/AA_PROMOTION"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-200 transition-all"
              >
                <SendHorizontal className="w-4 h-4 text-purple-300" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              {quickLinks.map((ql, i) => (
                <li key={i}>
                  <a
                    href={ql.href}
                    className="hover:text-purple-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-300 transition-colors" />
                    <span>{ql.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Col */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-neutral-300 leading-relaxed">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a
                  href="mailto:aapromotiondire@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  aapromotiondire@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="tel:0983860338" className="hover:text-white transition-colors">
                  0983860338
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-300 transition-colors"
                >
                  @aapromotiondire
                </a>
              </div>
              <div className="flex items-center gap-3">
                <SendHorizontal className="w-4 h-4 text-purple-400 shrink-0" />
                <a
                  href="https://t.me/AA_PROMOTION"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 font-medium hover:text-white"
                >
                  @AA_PROMOTION
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 AA Promotion. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-300 transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@aapromotiondire"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
            >
              TikTok
            </a>
            <a
              href="https://t.me/AA_PROMOTION"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
            >
              Telegram
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors ml-2"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
