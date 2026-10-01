import React, { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.05),
          ease: [0.16, 1, 0.3, 1],
        }
      );
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div ref={scope}>
        <div className={cn("font-body text-content-secondary leading-relaxed", className)}>
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="inline-block mr-[0.3em] opacity-0"
              style={{
                filter: filter ? "blur(8px)" : "none",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
