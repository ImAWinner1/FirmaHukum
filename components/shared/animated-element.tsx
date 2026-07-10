"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationVariant =
  "fadeIn" | "fadeUp" | "fadeLeft" | "fadeRight" | "scale";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  /** Memicu render animasi hanya satu kali saja (animasi tidak diulang ketika pengguna menggulir layar ke atas). */
  once?: boolean;
  /** Rasio ambang batas visibilitas (rentang 0-1) suatu elemen dalam Viewport sebelum memicu animasi. */
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
 * Komponen pembungkus berbasis Framer Motion untuk memicu efek animasi saat elemen masuk ke dalam layar (scroll-triggered).
 * Mendukung aksesibilitas dengan menghormati pengaturan `prefers-reduced-motion` (lihat globals.css).
 *
 * Menggunakan Intersection Observer API melalui hooks `useInView` dari Framer untuk menjaga kinerja (performance).
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
  return <div className={cn(className)}>{children}</div>;
}
