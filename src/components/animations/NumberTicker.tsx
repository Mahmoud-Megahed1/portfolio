import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

interface NumberTickerProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function NumberTicker({ value, suffix = '', className = '', duration = 1.5 }: NumberTickerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, value, count, duration]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
