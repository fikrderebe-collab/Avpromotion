import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // 3D depth layer (0.2 = far/blurred, 1.0 = focal plane, 1.8 = foreground)
  vx: number;
  vy: number;
  vz: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: number;
  type: 'diamond' | 'bokeh' | 'sparkle' | 'glint';
}

interface Burst {
  x: number;
  y: number;
  particles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: string;
    life: number;
  }[];
}

export const CinematicSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate cinematic 3D particles
    const count = Math.min(140, Math.floor((width * height) / 9000));
    const particles: Particle[] = [];

    const hues = [270, 285, 300, 315, 255]; // Royal amethyst to vivid magenta hues

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 1.6 + 0.3; // depth
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * 0.45 * z,
        vy: -(Math.random() * 0.5 + 0.2) * z, // gently drift upwards like luxury stardust
        vz: (Math.random() - 0.5) * 0.005,
        size: (Math.random() * 3.5 + 1.2) * z,
        baseAlpha: Math.random() * 0.6 + 0.25,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: hues[Math.floor(Math.random() * hues.length)],
        type: i % 5 === 0 ? 'diamond' : i % 3 === 0 ? 'bokeh' : 'sparkle',
      });
    }

    const bursts: Burst[] = [];

    const handleInteraction = (clientX: number, clientY: number) => {
      // Spawn burst of sparkling crystal particles
      const burstParticles = [];
      const burstColors = ['#e879f9', '#c084fc', '#a855f7', '#ffffff', '#f472b6'];
      for (let i = 0; i < 36; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        burstParticles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: Math.random() * 3.5 + 1.5,
          color: burstColors[Math.floor(Math.random() * burstColors.length)],
          life: 1.0,
        });
      }
      bursts.push({ x: clientX, y: clientY, particles: burstParticles });
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      handleInteraction(x, y);
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // 1. Render Cinematic Drifting 3D Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Motion physics with slight wave turbulence
        p.x += p.vx + Math.sin(time * 0.8 + p.twinklePhase) * 0.3 * p.z;
        p.y += p.vy;
        p.z += p.vz;
        p.twinklePhase += p.twinkleSpeed;

        if (p.z < 0.2) p.z = 1.8;
        if (p.z > 1.9) p.z = 0.3;

        // Wrap around viewport edges seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        const twinkle = Math.sin(p.twinklePhase) * 0.45 + 0.55;
        const currentAlpha = p.baseAlpha * twinkle;

        if (p.type === 'diamond') {
          // 4-point diamond star sparkle
          const s = p.size * (1 + twinkle * 0.4);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(time * 0.4 + p.twinklePhase);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${currentAlpha})`;
          ctx.beginPath();
          ctx.moveTo(0, -s * 2.2);
          ctx.lineTo(s * 0.5, 0);
          ctx.lineTo(0, s * 2.2);
          ctx.lineTo(-s * 0.5, 0);
          ctx.closePath();
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-s * 2.2, 0);
          ctx.lineTo(0, s * 0.5);
          ctx.lineTo(s * 2.2, 0);
          ctx.lineTo(0, -s * 0.5);
          ctx.closePath();
          ctx.fill();

          // Bright center jewel dot
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
          ctx.fill();
          ctx.restore();
        } else if (p.type === 'bokeh') {
          // Soft out-of-focus atmospheric bokeh orb
          const rad = p.size * 3.5;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
          grad.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${currentAlpha * 0.35})`);
          grad.addColorStop(0.6, `hsla(${p.hue + 15}, 90%, 60%, ${currentAlpha * 0.15})`);
          grad.addColorStop(1, `hsla(${p.hue}, 80%, 50%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Fine glowing crystal stardust
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 72%, ${currentAlpha})`;
          ctx.shadowColor = `hsl(${p.hue}, 95%, 65%)`;
          ctx.shadowBlur = 8 * p.z;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 2. Render Interactive Crystal Burst Particles
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        let alive = false;
        for (let i = 0; i < burst.particles.length; i++) {
          const bp = burst.particles[i];
          bp.x += bp.vx;
          bp.y += bp.vy;
          bp.vx *= 0.94;
          bp.vy *= 0.94;
          bp.life -= 0.024;
          bp.alpha = Math.max(0, bp.life);

          if (bp.life > 0) {
            alive = true;
            ctx.beginPath();
            ctx.arc(bp.x, bp.y, bp.size * bp.life, 0, Math.PI * 2);
            ctx.fillStyle = bp.color;
            ctx.globalAlpha = bp.alpha;
            ctx.shadowColor = '#c084fc';
            ctx.shadowBlur = 10;
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        if (!alive) {
          bursts.splice(b, 1);
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cinematic-sparkles-layer"
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
