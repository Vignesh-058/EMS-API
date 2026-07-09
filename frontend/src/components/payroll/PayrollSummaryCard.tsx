import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface PayrollSummaryCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  gradient?: string
}

export function PayrollSummaryCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  gradient = "from-primary/10 to-primary/5"
}: PayrollSummaryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md">
      {/* Background Gradient Accent */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", gradient)} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
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
          <div className="rounded-full bg-background/80 p-3 shadow-sm backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:bg-background">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{description}</p>
      </div>
      
      {/* Decorative hover bloom */}
      <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
    </div>
  )
}
