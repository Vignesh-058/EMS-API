import * as React from "react"
import { cn } from "@/lib/utils"

export interface AnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: "none" | "75" | "100" | "150" | "200" | "300" | "500" | "700" | "1000"
  duration?: "fast" | "normal" | "slow"
}

const durationMap = {
  fast: "duration-150",
  normal: "duration-300",
  slow: "duration-500",
}

const getAnimationClass = (delay?: string, duration: "fast" | "normal" | "slow" = "normal") => {
  return cn(
    "animate-in fill-mode-both",
    durationMap[duration],
    delay && delay !== "none" ? `delay-${delay}` : ""
  )
}

export function FadeIn({ children, className, delay, duration, ...props }: AnimationProps) {
  return (
    <div
      className={cn(getAnimationClass(delay, duration), "fade-in-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SlideIn({
  children,
  className,
  delay,
  duration,
  direction = "bottom",
  ...props
}: AnimationProps & { direction?: "top" | "bottom" | "left" | "right" }) {
  const slideMap = {
    top: "slide-in-from-top-4",
    bottom: "slide-in-from-bottom-4",
    left: "slide-in-from-left-4",
    right: "slide-in-from-right-4",
  }

  return (
    <div
      className={cn(
        getAnimationClass(delay, duration),
        "fade-in-0",
        slideMap[direction],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ScaleIn({ children, className, delay, duration, ...props }: AnimationProps) {
  return (
    <div
      className={cn(
        getAnimationClass(delay, duration),
        "fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
