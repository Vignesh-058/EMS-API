import * as React from "react"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string
  icon: LucideIcon
  description: string
  trend: "up" | "down" | "neutral"
  trendValue: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  className,
  ...props
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {trend !== "neutral" ? (
          <span
            className={cn(
              "flex items-center gap-0.5 font-medium",
              trend === "up" ? "text-success" : "text-destructive"
            )}
          >
            {trend === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trendValue}
          </span>
        ) : (
          <span className="flex items-center gap-0.5 font-medium text-muted-foreground">
            <Minus className="h-3 w-3" />
            {trendValue}
          </span>
        )}
        <span className="text-muted-foreground">{description}</span>
      </div>
    </div>
  )
}
