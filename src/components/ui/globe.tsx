import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2 || 600,
      height: width * 2 || 600,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.15, 0.18, 0.25],
      markerColor: [0.0, 0.8, 0.7], // Accent teal
      glowColor: [0.08, 0.45, 0.42], // Teal glow
      markers: [
        // Damietta, Egypt: Latitude 31.4175, Longitude 31.8144
        { location: [31.4175, 31.8144], size: 0.09 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.004;
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
    <div className={cn("relative flex items-center justify-center aspect-square overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0.95,
        }}
      />
    </div>
  );
}
