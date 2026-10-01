import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleMouseMove(e: MouseEvent) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  useEffect(() => {
    const el = divRef.current?.parentElement;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  return (
    <motion.div
      ref={divRef}
      className={cn(
        "pointer-events-none absolute z-0 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500",
        isMounted && "opacity-100",
        className
      )}
      style={{
        background: useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, ${fill}15, transparent 65%)`,
      }}
    />
  );
}

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ children, className, spotlightColor = "hsl(172 66% 50%)" }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-canvas-border/30 bg-canvas-surface",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}10, transparent 65%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
