import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  baseSize: number;
  color: string;
  hue: number;
  alpha: number;
  angle: number;
  speed: number;
  energy: number;
  history: { x: number; y: number }[];
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  strength: number;
  color: string;
  alpha: number;
}

const PALETTE = [
  { hue: 190, color: 'rgba(0, 240, 255, ' }, // Electric Cyan
  { hue: 275, color: 'rgba(168, 85, 247, ' }, // Neon Purple
  { hue: 320, color: 'rgba(236, 72, 153, ' }, // Vibrant Magenta
  { hue: 220, color: 'rgba(59, 130, 246, ' }, // Deep Blue
  { hue: 45,  color: 'rgba(251, 191, 36, ' }, // Amber Spark
];

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse & interaction state
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      prevX: width * 0.5,
      prevY: height * 0.5,
      vx: 0,
      vy: 0,
      active: false,
      lastActiveTime: Date.now(),
    };

    const shockwaves: Shockwave[] = [];

    // Resize handling with devicePixelRatio for ultra-crisp retina display
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles system initialization
    const particleCount = Math.min(220, Math.floor((width * height) / 7500));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pTheme = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        baseX: x,
        baseY: y,
        size: Math.random() * 2.8 + 1.2,
        baseSize: Math.random() * 2.8 + 1.2,
        color: pTheme.color,
        hue: pTheme.hue,
        alpha: Math.random() * 0.7 + 0.3,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.8 + 0.4,
        energy: Math.random() * 0.5 + 0.5,
        history: [],
      });
    }

    // Pointer events
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouse.vx = clientX - mouse.x;
      mouse.vy = clientY - mouse.y;
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.active = true;
      mouse.lastActiveTime = Date.now();
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      // Create explosive crazy shockwave ring
      const colors = ['rgba(0, 240, 255, ', 'rgba(236, 72, 153, ', 'rgba(168, 85, 247, '];
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];

      shockwaves.push({
        x: clientX,
        y: clientY,
        radius: 5,
        maxRadius: Math.max(width, height) * 0.65,
        speed: 12 + Math.random() * 8,
        strength: 28,
        color: selectedColor,
        alpha: 0.9,
      });

      // Scatter nearby particles aggressively
      for (const p of particles) {
        const dx = p.x - clientX;
        const dy = p.y - clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260 && dist > 0) {
          const force = ((260 - dist) / 260) * 22;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.energy = 2.0;
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    let time = 0;

    // Aurora Ribbon harmonic parameters
    const ribbonCount = 3;

    // Main animation loop
    const render = () => {
      time += 0.016;

      // Idle check: if inactive for 2.5 seconds, generate autonomous cosmic center wandering
      if (Date.now() - mouse.lastActiveTime > 2500) {
        mouse.x += (width * 0.5 + Math.sin(time * 0.9) * (width * 0.28) - mouse.x) * 0.03;
        mouse.y += (height * 0.5 + Math.cos(time * 0.7) * (height * 0.22) - mouse.y) * 0.03;
        mouse.vx = Math.cos(time * 0.9) * 2;
        mouse.vy = -Math.sin(time * 0.7) * 2;
      }

      // Smooth clear with subtle trail persistence
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Undulating Crazy Aurora Wave Ribbons in background
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let r = 0; r < ribbonCount; r++) {
        const ribbonTime = time * (0.8 + r * 0.3) + r * 2.1;
        const grad = ctx.createLinearGradient(0, 0, width, height);

        if (r === 0) {
          grad.addColorStop(0, 'rgba(0, 240, 255, 0.0)');
          grad.addColorStop(0.3, 'rgba(0, 240, 255, 0.22)');
          grad.addColorStop(0.7, 'rgba(147, 51, 234, 0.2)');
          grad.addColorStop(1, 'rgba(236, 72, 153, 0.0)');
        } else if (r === 1) {
          grad.addColorStop(0, 'rgba(236, 72, 153, 0.0)');
          grad.addColorStop(0.4, 'rgba(244, 63, 94, 0.18)');
          grad.addColorStop(0.8, 'rgba(99, 102, 241, 0.18)');
          grad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');
        } else {
          grad.addColorStop(0, 'rgba(168, 85, 247, 0.0)');
          grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
          grad.addColorStop(1, 'rgba(168, 85, 247, 0.0)');
        }

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 3 + r * 2;

        const baseElevation = height * (0.35 + r * 0.2);
        const steps = 48;
        const stepWidth = width / steps;

        for (let s = 0; s <= steps; s++) {
          const sx = s * stepWidth;
          // Crazy multi-harmonic wave formula
          const wave1 = Math.sin(sx * 0.0035 + ribbonTime) * 85;
          const wave2 = Math.cos(sx * 0.007 - ribbonTime * 1.4) * 45;
          const wave3 = Math.sin(sx * 0.0015 + ribbonTime * 0.6) * 110;
          const sy = baseElevation + wave1 + wave2 + wave3;

          if (s === 0) {
            ctx.moveTo(sx, sy);
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.stroke();

        // Secondary glow layer for ribbon
        ctx.lineWidth = 14 + r * 6;
        ctx.globalAlpha = 0.25;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
      ctx.restore();

      // 2. Shockwaves Update & Render
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        if (sw.alpha <= 0.01) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.lineWidth = Math.max(1, 8 * sw.alpha);
        ctx.strokeStyle = `${sw.color}${sw.alpha * 0.85})`;
        ctx.stroke();

        // Secondary inner chromatic ring
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 12), 0, Math.PI * 2);
        ctx.lineWidth = Math.max(1, 3 * sw.alpha);
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.9})`;
        ctx.stroke();
      }
      ctx.restore();

      // 3. Particles physics & rendering
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Complex flow field + chaotic attractor
        const noiseAngle =
          Math.sin(p.x * 0.002 + time * 0.6) * Math.cos(p.y * 0.002 + time * 0.4) * Math.PI * 4;
        p.vx += Math.cos(noiseAngle) * 0.08 * p.speed;
        p.vy += Math.sin(noiseAngle) * 0.08 * p.speed;

        // Gravitational vortex around pointer
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 320 && dist > 15) {
          const force = (1 - dist / 320) * 0.75;
          // Tangential swirl (crazy vortex)
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle + Math.PI * 0.45) * force * 2.8;
          p.vy += Math.sin(angle + Math.PI * 0.45) * force * 2.8;

          // Inward pull
          p.vx += (dx / dist) * force * 1.2;
          p.vy += (dy / dist) * force * 1.2;
          p.energy = Math.min(2.5, p.energy + force * 0.3);
        }

        // Apply friction/drag
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Energy cooldown
        p.energy = Math.max(0.6, p.energy * 0.985);

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Warp bounds
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // History track for crazy hyper-light motion trails
        p.history.unshift({ x: p.x, y: p.y });
        if (p.history.length > 8) {
          p.history.pop();
        }

        // Draw light-speed trails
        if (p.history.length > 2) {
          ctx.beginPath();
          ctx.moveTo(p.history[0].x, p.history[0].y);
          for (let h = 1; h < p.history.length; h++) {
            ctx.lineTo(p.history[h].x, p.history[h].y);
          }
          const trailAlpha = p.alpha * (p.energy > 1.2 ? 0.6 : 0.25);
          ctx.strokeStyle = `${p.color}${trailAlpha})`;
          ctx.lineWidth = p.size * (p.energy > 1.2 ? 1.6 : 0.8);
          ctx.stroke();
        }

        // Draw particle head with glowing halo
        const currentSize = p.baseSize * p.energy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(1, p.alpha * p.energy)})`;
        ctx.fill();

        // Hot bright core
        if (p.energy > 1.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.fill();
        }
      }

      // 4. Crazy Constellation Laser Filaments between close particles
      const connectionDistance = 88;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / connectionDistance) * 0.22 * Math.min(pi.energy, pj.energy);

            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(180, 220, 255, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="modern-animated-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
