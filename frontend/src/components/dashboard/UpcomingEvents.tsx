import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { upcomingEvents } from "@/data/dashboard"
import { cn } from "@/lib/utils"

export function UpcomingEvents() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
        <CardDescription>Birthdays, holidays, and meetings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="group flex items-center gap-4 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50">
              <div 
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
                  event.bg,
                  event.color
                )}
              >
                <event.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="mb-1 text-sm font-medium leading-none text-foreground">{event.title}</span>
                <span className="text-xs text-muted-foreground">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
