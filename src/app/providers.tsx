"use client";

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Silence extension-injected hydration warnings in development console
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const errorMsg = args[0];
        if (
          typeof errorMsg === 'string' &&
          (errorMsg.includes('hydration-mismatch') ||
            errorMsg.includes('bis_skin_checked') ||
            errorMsg.includes('Hydration failed') ||
            errorMsg.includes('does not match the server'))
        ) {
          return;
        }
        originalError(...args);
      };
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Animation frames ticker
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
