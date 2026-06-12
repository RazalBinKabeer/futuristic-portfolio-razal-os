"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LogoNode {
  id: string;
  keyId: string;
  name: string;
  src: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  popping?: boolean;
}

export default function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logos, setLogos] = useState<LogoNode[]>([]);
  const requestRef = useRef<number>(0);
  const logosRef = useRef<LogoNode[]>([]);

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

  const spawnBubble = (logoItem: typeof logoList[0]): LogoNode | null => {
    if (!containerRef.current) return null;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // Spawn at bottom-left corner
    const x = -20;
    const y = height + 20;

    // Shoot towards top-right (like a bubble gun)
    const angle = -Math.PI / 2 + Math.random() * (Math.PI / 4); // Up and right
    const speed = 12 + Math.random() * 8;
    const vx = Math.cos(angle) * speed + 4; // Add minimum rightward momentum
    const vy = Math.sin(angle) * speed; 

    return {
      id: logoItem.id,
      keyId: `${logoItem.id}-${Date.now()}-${Math.random()}`,
      name: logoItem.name,
      src: `/logos/${logoItem.id}${logoItem.ext}`,
      x,
      y,
      vx,
      vy,
      size: window.innerWidth < 768 ? 48 : 64 // Smaller on mobile
    };
  };

  // 1. Initial Bubble Gun Spawning Sequence
  useEffect(() => {
    let index = 0;
    const spawnInterval = setInterval(() => {
      if (index >= logoList.length) {
        clearInterval(spawnInterval);
        return;
      }
      const newBubble = spawnBubble(logoList[index]);
      if (newBubble) {
        logosRef.current = [...logosRef.current, newBubble];
        setLogos([...logosRef.current]);
      }
      index++;
    }, 150); // Shoot a bubble every 150ms

    return () => clearInterval(spawnInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. Physics update loop
  useEffect(() => {
    const updatePhysics = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth || window.innerWidth;
      const height = containerRef.current.clientHeight || window.innerHeight;

      const friction = 0.985;
      const baseVelocity = 0.8; // Retention float speed limit

      const updated = logosRef.current.map(logo => {
        let x = logo.x + logo.vx;
        let y = logo.y + logo.vy;
        let vx = logo.vx;
        let vy = logo.vy;

        // Apply drag friction to damp explosions/bubble gun shots
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

  // 3. Click handler: Pop and Respawn
  const handleLogoClick = (id: string) => {
    // Set the bubble to popping state
    const updated = logosRef.current.map(logo => {
      if (logo.id === id) {
        return { ...logo, popping: true };
      }
      return logo;
    });
    logosRef.current = updated;
    setLogos(updated);

    // After animation finishes, remove it and spawn a new one
    setTimeout(() => {
      const logoItem = logoList.find(l => l.id === id);
      if (!logoItem) return;

      const filtered = logosRef.current.filter(logo => logo.id !== id);
      
      const newBubble = spawnBubble(logoItem);
      if (newBubble) {
        logosRef.current = [...filtered, newBubble];
        setLogos([...logosRef.current]);
      } else {
        logosRef.current = filtered;
        setLogos(filtered);
      }
    }, 300);
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full"
    >
      {logos.map((logo) => (
        <motion.div
          key={logo.keyId}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: logo.popping ? 2.5 : 1, 
            opacity: logo.popping ? 0 : 1 
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onTap={(e) => {
                console.log("BUBBLE onTap:", logo.id);
                e.stopPropagation();
                handleLogoClick(logo.id);
              }}
              onPointerDown={(e) => {
                console.log("BUBBLE onPointerDown:", logo.id);
                e.stopPropagation();
                handleLogoClick(logo.id);
              }}
              onClick={(e) => {
                console.log("BUBBLE onClick:", logo.id);
                e.stopPropagation();
                handleLogoClick(logo.id);
              }}
              className="relative w-full h-full flex items-center justify-center cursor-pointer outline-none rounded-full border border-white/40 bg-gradient-to-tr from-white/10 to-white/30 backdrop-blur-md shadow-[inset_0_0_15px_rgba(255,255,255,0.6),0_4px_10px_rgba(0,0,0,0.2)] p-3"
              title={logo.name}
            >
              {/* Glossy highlight for the bubble */}
              <div className="absolute top-1 left-2 w-3 h-2 bg-white/70 rounded-full rotate-[-45deg] blur-[1px]" />
              
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain pointer-events-none opacity-80 select-none p-3 filter drop-shadow-md"
              />
            </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
