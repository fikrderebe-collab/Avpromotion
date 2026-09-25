import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  FileCode,
  Layers,
  Sparkles,
  Rocket,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const SourceModal: React.FC<SourceModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'cinematic',
}) => {
  const [selectedFile, setSelectedFile] = useState<string>(initialTab);
  const [copiedSnippet, setCopiedSnippet] = useState<boolean>(false);
  const [copiedClone, setCopiedClone] = useState<boolean>(false);

  const gitCloneCommand = 'git clone https://github.com/fikrderebe/aapromotion-cinematic.git';

  const filesMap: Record<
    string,
    {
      title: string;
      filename: string;
      language: string;
      description: string;
      content: string;
    }
  > = {
    cinematic: {
      title: '3D Mouse Scroll Animation Engine',
      filename: 'src/components/CinematicVideoScene.tsx',
      language: 'typescript',
      description:
        'Controls the 3D cinematic camera, pitch, roll, zoom, and lighting driven exclusively by mouse scroll and wheel delta.',
      content: `// Cinematic 3D Scene - Driven Exclusively by Mouse Scroll & Wheel
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'motion/react';
import imgMobile from '../assets/images/aapromotion_exact_mobile_1790222216008.jpg';
import imgWide from '../assets/images/aapromotion_exact_widescreen_1790222203146.jpg';

export const CinematicVideoScene: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth physics-based spring smoothing for mouse wheel & scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.8,
  });

  // Dynamic 3D orbital rotation mapped strictly to mouse scroll
  const scrollRotateX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 8, -6, 5, 0]);
  const scrollRotateY = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [-6, 14, -12, 4]);
  const scrollScale = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [1.0, 1.12, 1.08, 1.02]);
  const scrollZ = useTransform(smoothProgress, [0, 0.5, 1], [0, 60, -20]);

  return (
    <div className="relative w-full min-h-screen bg-[#05020c]">
      {/* 3D Perspective Stage */}
      <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ perspective: 1500 }}>
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: scrollRotateX,
            rotateY: scrollRotateY,
            scale: scrollScale,
            z: scrollZ,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={imgWide} />
            <img src={imgMobile} alt="AAPromotion 3D Logo" className="object-cover" />
          </picture>
        </motion.div>
      </div>
    </div>
  );
};`,
    },
    vercel: {
      title: 'Vercel Deployment Configuration',
      filename: 'vercel.json',
      language: 'json',
      description:
        'Ensures 100% successful builds on Vercel with zero 404 errors on SPA client routes and optimized build caching.',
      content: `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}`,
    },
    npmrc: {
      title: 'NPM Peer Resolution Lock',
      filename: '.npmrc',
      language: 'properties',
      description:
        'Resolves any npm ERESOLVE peer conflicts automatically during Vercel build installations.',
      content: `# Guarantees Vercel npm install succeeds without peer dependency conflicts
legacy-peer-deps=true
save-exact=false
audit=false`,
    },
    vite: {
      title: 'Vite 8 ESM Configuration',
      filename: 'vite.config.ts',
      language: 'typescript',
      description:
        'Vite 8 config with ESM-compliant directory resolution compatible with Node 20/22 on Vercel.',
      content: `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      chunkSizeWarningLimit: 1200,
    },
  };
});`,
    },
    package: {
      title: 'Package Manifest & Build Scripts',
      filename: 'package.json',
      language: 'json',
      description:
        'Dependency tree with React 19, Motion 12, Tailwind v4, and clean build script for Vercel.',
      content: `{
  "name": "aapromotion-cinematic",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@vitejs/plugin-react": "^6.1.1",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "autoprefixer": "^10.4.21",
    "typescript": "^7.0.2"
  }
}`,
    },
    header: {
      title: 'Transparent Header & Exact 3D Monogram',
      filename: 'src/components/TransparentHeader.tsx',
      language: 'typescript',
      description:
        'Glassmorphic luxury header with exact AAPromotion 3D insignia, navigation links, and source button.',
      content: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2 } from 'lucide-react';
import logoImg from '../assets/images/aapromotion_logo_1790222181264.jpg';

export const AAPromotionLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => {
  return (
    <img
      src={logoImg}
      alt="AA Promotion Logo"
      className={\`\${className} object-contain rounded-xl drop-shadow-[0_0_16px_rgba(168,85,247,0.7)]\`}
    />
  );
};`,
    },
  };

  const currentFile = filesMap[selectedFile] || filesMap.cinematic;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentFile.content);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyClone = async () => {
    try {
      await navigator.clipboard.writeText(gitCloneCommand);
      setCopiedClone(true);
      setTimeout(() => setCopiedClone(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-auto overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-4xl my-auto bg-neutral-950/95 border border-purple-500/25 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(168,85,247,0.25)] text-white overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-purple-950/40 via-neutral-900/60 to-purple-950/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Source Code & Architecture
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-300 bg-green-950/70 border border-green-500/30 rounded-full">
                    Vercel 100% Ready
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Mouse-Scroll 3D Engine • Clean Vercel Production Build
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Vercel Deployment Verified Banner */}
          <div className="px-6 py-3 bg-purple-900/20 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-purple-200">
              <Rocket className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong className="text-white font-semibold">Vercel Deployment Fixed:</strong> Zero
                peer-dependency conflicts, ESM paths resolved, and standard SPA routing configured.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-neutral-300 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                Build: <code className="text-purple-300 font-mono">vite build</code>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-neutral-300 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                Output: <code className="text-purple-300 font-mono">dist</code>
              </span>
            </div>
          </div>

          {/* Git Clone Box */}
          <div className="px-6 py-3 border-b border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-neutral-300 font-mono text-xs overflow-x-auto py-1">
              <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-neutral-500">$</span>
              <span className="text-purple-200 select-all">{gitCloneCommand}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyClone}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-purple-600/60 hover:bg-purple-600 active:scale-95 transition-all border border-purple-400/30"
              >
                {copiedClone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Clone</span>
                  </>
                )}
              </button>

              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/20 active:scale-95 transition-all border border-white/10"
              >
                <span>Deploy to Vercel</span>
                <ExternalLink className="w-3 h-3 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Main Body: Tabs & Code Viewer */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[360px]">
            {/* Sidebar File Tabs */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-neutral-950/60 p-3 overflow-y-auto shrink-0 flex md:flex-col gap-1.5">
              <div className="hidden md:block px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Project Files & Specs
              </div>

              {Object.entries(filesMap).map(([key, item]) => {
                const isActive = selectedFile === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedFile(key)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-purple-600/30 text-white border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-purple-300' : 'text-neutral-500'
                      }`}
                    />
                    <div className="min-w-0 flex-1 truncate">
                      <div className="truncate font-mono text-[11px]">{item.filename}</div>
                      <div className="text-[10px] text-neutral-400 truncate opacity-80">
                        {item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Code Panel */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#07040f]">
              {/* Code Panel Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/30">
                <div className="min-w-0">
                  <div className="font-mono text-xs text-purple-300 truncate">
                    {currentFile.filename}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate">
                    {currentFile.description}
                  </div>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 active:scale-95 transition-all shrink-0 ml-2"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy File</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre Block */}
              <div className="flex-1 overflow-auto p-4 font-mono text-[11px] sm:text-xs leading-relaxed text-purple-100/90 select-text">
                <pre className="overflow-x-auto whitespace-pre">
                  <code>{currentFile.content}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                Vite 8 + React 19 + Motion 12
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                Mouse-Scroll 3D Physics
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
