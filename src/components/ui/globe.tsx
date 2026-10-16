import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 4.1; // Initial rotation facing Egypt & Middle East
    let width = 0;
    let animationFrameId: number;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const initialWidth = width > 0 ? width : 400;

    let globe: ReturnType<typeof createGlobe> | null = null;

    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: initialWidth * 2,
        height: initialWidth * 2,
        phi: 4.1,
        theta: 0.25,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.85, 0.95, 1.0], // Super crisp, glowing light-cyan landmass dots
        markerColor: [0.0, 1.0, 0.75], // Neon teal marker on Damietta
        glowColor: [0.15, 0.85, 0.75], // Vibrant atmospheric teal halo
        scale: 1.05,
        markers: [
          // Damietta, Egypt (Primary Base)
          { location: [31.4175, 31.8144], size: 0.1, color: [0.0, 1.0, 0.8] },
          // Riyadh, KSA (Gulf Enterprise Hub)
          { location: [24.7136, 46.6753], size: 0.05, color: [0.25, 0.8, 1.0] },
          // Dubai, UAE (Gulf Hub)
          { location: [25.2048, 55.2708], size: 0.05, color: [0.25, 0.8, 1.0] },
          // London, UK (European Hub)
          { location: [51.5074, -0.1278], size: 0.05, color: [0.25, 0.8, 1.0] },
        ],
        arcs: [
          // Damietta -> Riyadh
          { from: [31.4175, 31.8144], to: [24.7136, 46.6753] },
          // Damietta -> Dubai
          { from: [31.4175, 31.8144], to: [25.2048, 55.2708] },
          // Damietta -> London
          { from: [31.4175, 31.8144], to: [51.5074, -0.1278] },
        ],
        arcColor: [0.15, 0.95, 0.8],
        arcWidth: 0.8,
        arcHeight: 0.35,
      });

      // Continuous render loop: updates texture frames and auto-rotates
      const animate = () => {
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        if (globe) {
          globe.update({
            phi: phi + pointerInteractionMovement.current,
            ...(width > 0 ? { width: width * 2, height: width * 2 } : {}),
          });
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    } catch (err) {
      console.error("COBE globe initialization error:", err);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative w-full aspect-square flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (e.target instanceof HTMLElement) {
            e.target.setPointerCapture(e.pointerId);
          }
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          if (e.target instanceof HTMLElement) {
            e.target.releasePointerCapture(e.pointerId);
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 1,
        }}
      />
    </div>
  );
}
