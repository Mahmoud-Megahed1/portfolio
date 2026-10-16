import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { Cpu, Zap, Activity } from 'lucide-react';

interface ArchitectureCore3DProps {
  className?: string;
}

export function ArchitectureCore3D({ className }: ArchitectureCore3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMetric, setActiveMetric] = useState<'clean' | 'cqrs' | 'perf'>('clean');
  const activeMetricRef = useRef(activeMetric);

  useEffect(() => {
    activeMetricRef.current = activeMetric;
  }, [activeMetric]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const updateSize = () => {
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    updateSize();

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00ffcc, 4, 30);
    cyanLight.position.set(4, 3, 5);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 3, 30);
    blueLight.position.set(-4, -3, -3);
    scene.add(blueLight);

    // 3. Central System Core (Hierarchical Clean Architecture Layers)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Level 1: Inner Domain Core (Solid Octahedron with neon emissive glow)
    const innerGeo = new THREE.OctahedronGeometry(0.9, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00ffcc,
      emissive: 0x008877,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Level 2: Application Layer (Wireframe Icosahedron enclosing Domain Core)
    const midGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const midMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      roughness: 0.2,
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midMesh);

    // Level 3: Outer Infrastructure Ring 1 (Horizontal Torus)
    const ring1Geo = new THREE.TorusGeometry(2.1, 0.025, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.5,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 2.3;
    coreGroup.add(ring1Mesh);

    // Level 4: Outer Infrastructure Ring 2 (Tilted Orbit)
    const ring2Geo = new THREE.TorusGeometry(2.35, 0.02, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 3;
    ring2Mesh.rotation.y = Math.PI / 6;
    coreGroup.add(ring2Mesh);

    // Level 5: Orbiting Satellite Data Nodes
    const satelliteGroup = new THREE.Group();
    coreGroup.add(satelliteGroup);

    const satelliteCount = 6;
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x00ffcc,
      emissive: 0x00ffcc,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });

    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      sat.position.set(Math.cos(angle) * 2.1, (Math.random() - 0.5) * 0.4, Math.sin(angle) * 2.1);
      satelliteGroup.add(sat);
      satellites.push(sat);
    }

    // Level 6: Floating Point Cloud (Event Stream / Requests)
    const particlesCount = 90;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const particleSpeeds = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const radius = 2.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      particleSpeeds[i] = 0.5 + Math.random() * 1.5;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particlesMesh);

    // 4. Mouse / Touch Parallax & Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        mouseX = normX * 0.35;
        mouseY = normY * 0.35;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      if (e.target instanceof HTMLElement) {
        e.target.setPointerCapture(e.pointerId);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      if (e.target instanceof HTMLElement) {
        e.target.releasePointerCapture(e.pointerId);
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerUp);

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const targetColor = new THREE.Color(0x00ffcc);
    const targetEmissive = new THREE.Color(0x008877);

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const mode = activeMetricRef.current;
      const speedMultiplier = mode === 'perf' ? 2.3 : mode === 'cqrs' ? 1.6 : 1.0;

      // Update target colors based on selected mode
      if (mode === 'clean') {
        targetColor.setHex(0x00ffcc);
        targetEmissive.setHex(0x008877);
      } else if (mode === 'cqrs') {
        targetColor.setHex(0x38bdf8);
        targetEmissive.setHex(0x1d4ed8);
      } else {
        targetColor.setHex(0x34d399);
        targetEmissive.setHex(0x059669);
      }

      innerMat.emissive.lerp(targetEmissive, 0.05);
      ring1Mat.color.lerp(targetColor, 0.05);

      // Autonomous rotation with speed multiplier
      if (!isDragging) {
        targetRotationY += 0.005 * speedMultiplier;
        targetRotationX = THREE.MathUtils.lerp(targetRotationX, mouseY, 0.05);
      }

      coreGroup.rotation.y = THREE.MathUtils.lerp(coreGroup.rotation.y, targetRotationY + mouseX, 0.08);
      coreGroup.rotation.x = THREE.MathUtils.lerp(coreGroup.rotation.x, targetRotationX, 0.08);

      // Pulse inner core
      const pulseRate = mode === 'perf' ? 4.5 : 2.5;
      const scale = 1 + Math.sin(elapsedTime * pulseRate) * (mode === 'perf' ? 0.08 : 0.05);
      innerMesh.scale.set(scale, scale, scale);
      innerMesh.rotation.y = -elapsedTime * 0.6 * speedMultiplier;
      innerMesh.rotation.x = elapsedTime * 0.4 * speedMultiplier;

      // Rotate mid mesh
      midMesh.rotation.y = elapsedTime * 0.3 * speedMultiplier;
      midMesh.rotation.z = -elapsedTime * 0.2 * speedMultiplier;

      // Rotate rings
      ring1Mesh.rotation.z = elapsedTime * 0.25 * speedMultiplier;
      ring2Mesh.rotation.z = -elapsedTime * 0.35 * speedMultiplier;

      // Orbit satellites
      satellites.forEach((sat, i) => {
        const angle = (i / satelliteCount) * Math.PI * 2 + elapsedTime * 0.7 * speedMultiplier;
        const radius = 2.1 + Math.sin(elapsedTime * 2 + i) * 0.15;
        sat.position.x = Math.cos(angle) * radius;
        sat.position.z = Math.sin(angle) * radius;
        sat.position.y = Math.sin(elapsedTime * 1.5 + i) * 0.35;
      });

      // Float particle cloud
      particlesMesh.rotation.y = -elapsedTime * 0.12 * speedMultiplier;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerUp);
      resizeObserver.disconnect();

      innerGeo.dispose();
      innerMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-2xl select-none group cursor-grab active:cursor-grabbing",
        className
      )}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating HUD Badges & Live Status */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-mono text-[11px] text-accent font-semibold tracking-wider uppercase">
          .NET 9 Core Engine
        </span>
      </div>

      <div className="absolute top-3 right-3 pointer-events-none">
        <span className="font-mono text-[10px] text-content-muted/80 border border-canvas-border/50 bg-canvas-base/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
          Interactive 3D WebGL
        </span>
      </div>

      {/* Interactive Metric Switcher Pill Buttons at the bottom */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-1.5 p-1 rounded-xl bg-canvas-base/85 border border-canvas-border/60 backdrop-blur-md shadow-lg pointer-events-auto">
        <button
          type="button"
          onClick={() => setActiveMetric('clean')}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all duration-200",
            activeMetric === 'clean'
              ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_12px_hsl(172_66%_50%/0.25)]"
              : "text-content-muted hover:text-content-secondary"
          )}
        >
          <Cpu className="w-3 h-3" />
          <span>Clean Arch</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric('cqrs')}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all duration-200",
            activeMetric === 'cqrs'
              ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_12px_hsl(172_66%_50%/0.25)]"
              : "text-content-muted hover:text-content-secondary"
          )}
        >
          <Zap className="w-3 h-3" />
          <span>CQRS Pipeline</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric('perf')}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] font-mono font-medium transition-all duration-200",
            activeMetric === 'perf'
              ? "bg-accent/20 text-accent border border-accent/40 shadow-[0_0_12px_hsl(172_66%_50%/0.25)]"
              : "text-content-muted hover:text-content-secondary"
          )}
        >
          <Activity className="w-3 h-3" />
          <span>High Scale</span>
        </button>
      </div>
    </div>
  );
}
