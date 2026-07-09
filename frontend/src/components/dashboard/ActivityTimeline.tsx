import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { activityTimeline } from "@/data/dashboard"
import { cn } from "@/lib/utils"

export function ActivityTimeline() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest actions performed across the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4 before:absolute before:inset-y-0 before:left-4 before:w-px before:bg-border pt-2">
          {activityTimeline.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4">
              <div 
                className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card",
                  item.bg,
                  item.color
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1 pb-4">
                <span className="text-sm font-medium leading-none text-foreground">{item.title}</span>
                <span className="text-sm text-muted-foreground">{item.description}</span>
                <span className="text-xs font-medium text-muted-foreground/70">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
