"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LogoNode {
  id: string;
  name: string;
  src: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export default function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logos, setLogos] = useState<LogoNode[]>([]);
  const requestRef = useRef<number>(0);
  const logosRef = useRef<LogoNode[]>([]);

  // 1. Setup metadata for all 14 tech logos
  const logoList = [
    { id: 'react', name: 'React', ext: '.svg' },
    { id: 'nextjs', name: 'Next.js', ext: '.svg' },
    { id: 'tailwind', name: 'Tailwind CSS', ext: '.svg' },
    { id: 'typescript', name: 'TypeScript', ext: '.svg' },
    { id: 'js', name: 'JavaScript', ext: '.svg' },
    { id: 'html', name: 'HTML5', ext: '.svg' },
    { id: 'css', name: 'CSS3', ext: '.svg' },
    { id: 'python', name: 'Python', ext: '.svg' },
    { id: 'tanstack', name: 'TanStack', ext: '.svg' },
    { id: 'github', name: 'GitHub', ext: '.svg' },
    { id: 'gitlab', name: 'GitLab', ext: '.svg' },
    { id: 'docker', name: 'Docker', ext: '.svg' },
    { id: 'aws', name: 'AWS', ext: '.svg' },
    { id: 'cicd', name: 'CI/CD', ext: '.svg' }
  ];

  // 2. Initialize positions & initial random speed vectors
  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const initialLogos: LogoNode[] = logoList.map((logo, idx) => {
      // Space them out randomly
      const x = Math.random() * (width - 60) + 10;
      const y = Math.random() * (height - 180) + 100; // Leave space for horizontal top icons
      
      // Random direction vectors
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 0.8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      return {
        id: logo.id,
        name: logo.name,
        src: `/logos/${logo.id}${logo.ext}`,
        x,
        y,
        vx,
        vy,
        size: 42 // Circular icon bounds
      };
    });

    logosRef.current = initialLogos;
    setLogos(initialLogos);
  }, []);

  // 3. Physics update loop
  useEffect(() => {
    const updatePhysics = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      const friction = 0.985;
      const baseVelocity = 0.7; // Retention float speed limit

      const updated = logosRef.current.map(logo => {
        let x = logo.x + logo.vx;
        let y = logo.y + logo.vy;
        let vx = logo.vx;
        let vy = logo.vy;

        // Apply drag friction to damp clicked explosions
        vx *= friction;
        vy *= friction;

        // Assure base drift speeds remain active
        const magnitude = Math.sqrt(vx * vx + vy * vy);
        if (magnitude < baseVelocity) {
          const ratio = baseVelocity / (magnitude || 1);
          vx *= ratio;
          vy *= ratio;
        }

        // Boundary collision logic (bounces)
        if (x < 0) {
          x = 0;
          vx = Math.abs(vx);
        } else if (x > width - logo.size) {
          x = width - logo.size;
          vx = -Math.abs(vx);
        }

        if (y < 0) {
          y = 0;
          vy = Math.abs(vy);
        } else if (y > height - logo.size) {
          y = height - logo.size;
          vy = -Math.abs(vy);
        }

        return { ...logo, x, y, vx, vy };
      });

      logosRef.current = updated;
      setLogos(updated);

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 4. Elastic click blast handler
  const handleLogoClick = (id: string) => {
    const updated = logosRef.current.map(logo => {
      if (logo.id !== id) return logo;

      const angle = Math.random() * Math.PI * 2;
      const force = 16 + Math.random() * 6; // Kinetic impact velocity
      const vx = Math.cos(angle) * force;
      const vy = Math.sin(angle) * force;

      return { ...logo, vx, vy };
    });

    logosRef.current = updated;
    setLogos(updated);
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full"
    >
      {logos.map((logo) => (
        <div
          key={logo.id}
          style={{
            position: 'absolute',
            left: `${logo.x}px`,
            top: `${logo.y}px`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
          }}
          className="pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleLogoClick(logo.id)}
            className="w-full h-full flex items-center justify-center bg-transparent border-none outline-none cursor-pointer focus:outline-none"
            title={logo.name}
          >
            <img 
              src={logo.src} 
              alt={logo.name} 
              className="w-full h-full object-contain pointer-events-none opacity-40 hover:opacity-90 transition-opacity duration-300 select-none filter drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]"
            />
          </motion.button>
        </div>
      ))}
    </div>
  );
}
