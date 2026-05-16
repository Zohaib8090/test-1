'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dots = [];
    const spacing = 24;
    const attractionRadius = 180; // Increased to ensure it 'sticks' at high speeds
    const attractionForce = 0.5;   // Increased to react faster
    const returnForce = 0.15;      // Snappier return
    const friction = 0.95;        // Smoother, more liquid motion

    const initDots = () => {
      const isMobile = window.matchMedia('(pointer: coarse)').matches;
      dots.length = 0;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const dotSpacing = isMobile ? spacing * 1.5 : spacing;

      for (let x = dotSpacing / 2; x < canvas.width; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < canvas.height; y += dotSpacing) {
          dots.push({
            x, y,
            targetX: x, targetY: y,
            vx: 0, vy: 0
          });
        }
      }

      // If mobile, draw once and don't animate
      if (isMobile) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(dot => {
          ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const animate = () => {
      const isMobile = window.matchMedia('(pointer: coarse)').matches;
      if (isMobile) return; // Stop animation loop on mobile

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach(dot => {
        const dx = mouseRef.current.x - dot.x;
        const dy = mouseRef.current.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < attractionRadius) {
          const force = (attractionRadius - dist) / attractionRadius;
          // Attraction
          dot.vx += dx * force * attractionForce;
          dot.vy += dy * force * attractionForce;
        }

        // Return to original position
        const rx = dot.targetX - dot.x;
        const ry = dot.targetY - dot.y;
        dot.vx += rx * returnForce;
        dot.vy += ry * returnForce;

        // Apply friction
        dot.vx *= friction;
        dot.vy *= friction;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot
        const distRatio = Math.max(0, Math.min(1, (attractionRadius - dist) / attractionRadius));
        const opacity = 0.1 + (distRatio * 0.8);
        const size = 1 + (distRatio * 1);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', initDots);
    window.addEventListener('mousemove', handleMouseMove);
    initDots();
    animate();

    return () => {
      window.removeEventListener('resize', initDots);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="interactive-bg">
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      />
      <div className="spotlight"></div>
    </div>
  );
}
