import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AttendanceSummaryCardProps {
  title: string
  count: number | string
  description: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function AttendanceSummaryCard({
  title,
  count,
  description,
  icon: Icon,
  trend,
  trendValue
}: AttendanceSummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{count}</h2>
            {trend && trendValue && (
              <span className={cn(
                "flex items-center text-xs font-medium",
                trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
              )}>
                {trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3" />}
                {trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3" />}
                {trendValue}
              </span>
            )}
          </div>
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{description}</p>
      
      {/* Decorative background element for hover effect */}
      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )
}
