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
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    // Responsive initial width calculation
    const initialWidth = width > 0 ? width : 400;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: initialWidth * 2,
      height: initialWidth * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 18000,
      mapBrightness: 8, // High brightness to make continents pop vividly
      baseColor: [0.45, 0.55, 0.65], // Visible slate-cyan landmass dots
      markerColor: [0.0, 1.0, 0.75], // High-visibility glowing teal marker
      glowColor: [0.15, 0.85, 0.75], // Radiant teal atmosphere glow
      markers: [
        // Damietta, Egypt: Latitude 31.4175, Longitude 31.8144
        { location: [31.4175, 31.8144], size: 0.12 },
      ],
      onRender: (state) => {
        // Auto-rotation when not dragging
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + pointerInteractionMovement.current;
        if (width > 0) {
          state.width = width * 2;
          state.height = width * 2;
        }
      },
    });

    return () => {
      globe.destroy();
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
