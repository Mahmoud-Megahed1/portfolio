import React from 'react';
import { motion } from 'framer-motion';

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className = '' }: GridBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(172 66% 50%) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(172 66% 50% / 0.08), transparent 70%)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(230 40% 50% / 0.06), transparent 70%)',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
