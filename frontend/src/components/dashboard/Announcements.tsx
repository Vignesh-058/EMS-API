import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { announcements } from "@/data/dashboard"
import { Badge } from "@/components/ui/badge"

export function Announcements() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-1 xl:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Announcements</CardTitle>
        <CardDescription>Important company-wide updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="group relative flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <announcement.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="font-semibold text-foreground leading-none">{announcement.title}</span>
                </div>
                {announcement.isNew && (
                  <Badge variant="default" className="px-1.5 py-0 text-[10px] h-4">NEW</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {announcement.description}
              </p>
              <span className="text-xs font-medium text-muted-foreground/70 mt-1">{announcement.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
