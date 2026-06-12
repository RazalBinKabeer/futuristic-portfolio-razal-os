"use client";

import dynamic from 'next/dynamic';

// Import Desktop dynamically with SSR disabled to prevent WebGL hydration warnings
const Desktop = dynamic(() => import('@/components/os/Desktop'), {
  ssr: false,
});

export default function Home() {
  return <Desktop />;
}
