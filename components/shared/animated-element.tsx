"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationVariant = "fadeIn" | "fadeUp" | "fadeLeft" | "fadeRight" | "scale";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  /** Trigger animation only once */
  once?: boolean;
  /** How much of the element must be visible (0-1) */
  threshold?: number;
}

const variants: Record<
  AnimationVariant,
  { hidden: Record<string, number>; visible: Record<string, number> }
> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * Framer Motion wrapper for scroll-triggered entrance animations.
 * Respects prefers-reduced-motion via CSS (see globals.css).
 *
 * Uses Intersection Observer via Framer's useInView for performance.
 */
export function AnimatedElement({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.15,
}: AnimatedElementProps) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}
