"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in-left"
  | "fade-in-right"
  | "scale-in";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  once?: boolean; // animate only once (default true)
}

export function FadeIn({
  children,
  className,
  variant = "fade-in-up",
  delay = 0,
  duration = 500,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? undefined : 0,
        animation: isVisible
          ? `${variant} ${duration}ms ease-out ${delay}ms both`
          : "none",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger children — wraps items with incremental delays.
 */
interface StaggerProps {
  children: React.ReactNode[];
  className?: string;
  variant?: AnimationVariant;
  baseDelay?: number;
  staggerDelay?: number;
  duration?: number;
}

export function Stagger({
  children,
  className,
  variant = "fade-in-up",
  baseDelay = 0,
  staggerDelay = 80,
  duration = 500,
}: StaggerProps) {
  return (
    <>
      {children.map((child, i) => (
        <FadeIn
          key={i}
          className={className}
          variant={variant}
          delay={baseDelay + i * staggerDelay}
          duration={duration}
        >
          {child}
        </FadeIn>
      ))}
    </>
  );
}
