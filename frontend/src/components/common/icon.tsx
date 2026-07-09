import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

const iconSizes = {
  xs: "size-3", // 12px
  sm: "size-4", // 16px
  md: "size-5", // 20px (default standard)
  lg: "size-6", // 24px
  xl: "size-8", // 32px
}

export function Icon({
  icon: LucideComponent,
  size = "md",
  className,
  ...props
}: IconProps) {
  return (
    <LucideComponent
      className={cn("shrink-0", iconSizes[size], className)}
      aria-hidden="true"
      {...props}
    />
  )
}
