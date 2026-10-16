import { cn } from "@/lib/utils";
import { motion, Transition } from "framer-motion";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
}

export const BorderBeam = ({
  className,
  size = 60,
  duration = 6,
  delay = 0,
  colorFrom = "hsl(172 66% 50%)",
  colorTo = "hsl(217 91% 60%)",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": -delay,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--initial-offset": initialOffset,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#fff,#fff)]",
        className
      )}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "inset-0 rounded-full [offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]"
        )}
        style={{
          width: "var(--size)",
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={
          transition || {
            repeat: Infinity,
            ease: "linear",
            duration: duration,
            delay: delay,
            ...transition,
          }
        }
      />
    </div>
  );
};
