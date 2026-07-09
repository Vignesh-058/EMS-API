import * as React from "react"
import { cn } from "@/lib/utils"

export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4
}

export function ResponsiveGrid({
  className,
  columns = 3,
  ...props
}: ResponsiveGridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        colClasses[columns],
        className
      )}
      {...props}
    />
  )
}
