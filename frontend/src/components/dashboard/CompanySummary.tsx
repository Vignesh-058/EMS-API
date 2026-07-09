import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { companySummary } from "@/data/dashboard"
import { Building2, MapPin, CalendarDays } from "lucide-react"

export function CompanySummary() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-1 xl:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Organization</CardTitle>
        <CardDescription>Company overview.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Building2 className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">{companySummary.name}</h3>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {companySummary.location}</span>
              <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> Est. {companySummary.established}</span>
            </div>
          </div>
          
          <div className="mt-4 grid w-full grid-cols-3 gap-2 border-t border-border pt-6">
            {companySummary.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg font-bold text-foreground">{metric.value}</span>
                <span className="text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
