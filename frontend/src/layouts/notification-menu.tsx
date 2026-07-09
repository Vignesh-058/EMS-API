import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const mockNotifications = [
  {
    id: 1,
    title: "New Employee Onboarded",
    description: "Sarah Jenkins has completed her onboarding.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "Payroll Processed",
    description: "January payroll has been successfully processed.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    title: "Leave Request",
    description: "Michael Scott requested time off for next week.",
    time: "1 day ago",
    unread: false,
  },
]

export function NotificationMenu() {
  const unreadCount = mockNotifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-destructive">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between font-normal">
          <span className="font-semibold">Notifications</span>
          <span className="text-xs font-medium text-muted-foreground">{unreadCount} unread</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {mockNotifications.map((notif) => (
            <DropdownMenuItem
              key={notif.id}
              className="flex flex-col items-start gap-1 p-3 cursor-pointer"
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className={cn("text-sm font-medium", notif.unread ? "text-foreground" : "text-muted-foreground")}>
                  {notif.title}
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">{notif.time}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {notif.description}
              </p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center text-center text-primary font-medium p-3">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
