import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
// Re-exporting Skeleton from ui for convenience in the loading components domain
export { Skeleton } from "@/components/ui/skeleton"

// 1. Spinner Component
export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

const spinnerSizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground", spinnerSizes[size], className)}
      {...props}
    />
  )
}

// 2. Loading Overlay
export interface LoadingOverlayProps {
  message?: string
  className?: string
  fullScreen?: boolean
}

export function LoadingOverlay({
  message = "Loading...",
  className,
  fullScreen = false,
}: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm",
        fullScreen ? "fixed inset-0" : "absolute inset-0",
        className
      )}
    >
      <Spinner size="lg" className="text-primary mb-4" />
      {message && <p className="text-sm font-medium text-foreground">{message}</p>}
    </div>
  )
}
