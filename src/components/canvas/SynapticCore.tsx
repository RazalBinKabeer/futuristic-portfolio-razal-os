"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SynapticCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Setup Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8; // Pull back to see the whole screen

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting for Metallic Material - Brightened significantly
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 4.0);
    mainLight.position.set(10, 10, 10);
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x6366f1, 8.0, 20);
    blueLight.position.set(-5, -5, 5);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 8.0, 20);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const cursorLight = new THREE.PointLight(0xffffff, 5.0, 10);
    scene.add(cursorLight);

    // 3. Create Instanced Mesh for Liquid Metal Swarm
    const numParticles = 600; // Lowered density
    
    // We use a low-poly geometry (tetrahedron) to look like nanobots or metallic shards
    const geometry = new THREE.TetrahedronGeometry(0.04, 0); // Slightly smaller
    
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x050505,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.8,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, numParticles);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // Keep track of physics states for each particle
    const particles: {
      id: number;
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      tx: number; ty: number; tz: number; // Target base position
      rx: number; ry: number; rz: number;
    }[] = [];

    const dummy = new THREE.Object3D();

    // Spread them across the screen bounds
    const spreadX = 16;
    const spreadY = 10;
    const spreadZ = 6;

    const tempColor = new THREE.Color();

    for (let i = 0; i < numParticles; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ - 2; // push slightly back

      particles.push({
        id: Math.random() * 1000,
        x, y, z,
        vx: 0, vy: 0, vz: 0,
        tx: x, ty: y, tz: z,
        rx: Math.random() * Math.PI, ry: Math.random() * Math.PI, rz: Math.random() * Math.PI,
      });

      // Rainbowish refraction colors (subtle pastel metallic hues)
      tempColor.setHSL(Math.random(), 0.5, 0.75);
      instancedMesh.setColorAt(i, tempColor);

      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

    // 4. Track Mouse / Cursor Interactions
    let targetX = 0;
    let targetY = 0;
    let isMouseActive = false;

    const handleMouseMove = (event: MouseEvent) => {
      isMouseActive = true;
      const rect = container.getBoundingClientRect();
      // Normalize mouse to -1 to +1
      targetX = ((event.clientX - rect.left) / width) * 2 - 1;
      targetY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const mousePos3D = new THREE.Vector3();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Project mouse coordinates to WebGL 3D space on z=0 plane
      const vector = new THREE.Vector3(targetX, targetY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mousePos3D.copy(camera.position).add(dir.multiplyScalar(distance));

      // Move cursor light to mouse position
      cursorLight.position.lerp(mousePos3D, 0.2);
      if (!isMouseActive) {
        cursorLight.intensity = Math.max(0, cursorLight.intensity - 0.1);
      } else {
        cursorLight.intensity = 4.0;
      }

      // Slowly rotate the whole swarm for a breathing effect
      instancedMesh.rotation.y = Math.sin(time * 0.1) * 0.1;
      instancedMesh.rotation.x = Math.cos(time * 0.15) * 0.05;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Default floating drift
        p.tx += Math.sin(time * 0.5 + p.id) * 0.005;
        p.ty += Math.cos(time * 0.4 + p.id) * 0.005;

        let forceX = 0;
        let forceY = 0;
        let forceZ = 0;

        if (isMouseActive) {
          const dx = mousePos3D.x - p.x;
          const dy = mousePos3D.y - p.y;
          const dz = mousePos3D.z - p.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          const magneticRadius = 2.5; // The void radius around the cursor

          if (dist < magneticRadius) {
            // Very subtle and slow repulsion formula
            const pushStrength = Math.pow(1.0 - dist / magneticRadius, 2.0) * 0.015;
            
            // Notice the negative sign to push away gently
            forceX += -dx * pushStrength;
            forceY += -dy * pushStrength;
            forceZ += -dz * pushStrength;
          } else {
            // Drift gently back to origin target if outside magnetic field
            forceX += (p.tx - p.x) * 0.001;
            forceY += (p.ty - p.y) * 0.001;
            forceZ += (p.tz - p.z) * 0.001;
          }
        } else {
          // If mouse leaves, particles return to their background floating state very slowly
          forceX += (p.tx - p.x) * 0.001;
          forceY += (p.ty - p.y) * 0.001;
          forceZ += (p.tz - p.z) * 0.001;
        }

        // Apply friction/drag (higher drag means slower top speed)
        p.vx = p.vx * 0.92 + forceX;
        p.vy = p.vy * 0.92 + forceY;
        p.vz = p.vz * 0.92 + forceZ;

        // Add to current position
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Spin based on velocity
        p.rx += p.vx * 1.5;
        p.ry += p.vy * 1.5;
        p.rz += p.vz * 1.5;

        // Apply to dummy object
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.rx, p.ry, p.rz);
        
        // Optional: scale them slightly when moving fast to look like they are stretching
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
        const scale = Math.max(0.5, 1.0 - speed * 0.5);
        dummy.scale.set(scale, scale, scale);

        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }

      instancedMesh.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 7. Cleanup WebGL Context
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  const customCursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none' stroke='%2306b6d4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='16' cy='16' r='6'/><path d='M16 4v6M16 22v6M4 16h6M22 16h6'/></svg>") 16 16, auto`;

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] flex items-center justify-center relative pointer-events-none"
      style={{ cursor: customCursor }}
    />
  );
}
