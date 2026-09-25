"use client";

import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "0px 0px -8% 0px" } as const;

/** Disables transform animations for visitors with prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  /** Position in a stagger sequence; each step adds 80ms. */
  step?: number;
};

/** Headlines and paragraphs: fade up 16px on scroll into view. */
export function FadeUp({ children, className, step = 0 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: easeOut, delay: step * 0.08 }}
    >
      {children}
    </motion.div>
  );
}

/** Images: fade in while settling from 1.04 → 1 scale inside a clipped frame. */
export function ImageReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease: easeOut }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
