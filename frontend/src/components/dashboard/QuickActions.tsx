import { UserPlus, Building2, CalendarClock, Wallet, FileBarChart, Settings } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const actions = [
  { title: "Add Employee", icon: UserPlus, href: "/employees/new", color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Departments", icon: Building2, href: "/departments", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { title: "Attendance", icon: CalendarClock, href: "/attendance", color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Payroll", icon: Wallet, href: "/payroll", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Reports", icon: FileBarChart, href: "/reports", color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Settings", icon: Settings, href: "/settings", color: "text-slate-500", bg: "bg-slate-500/10" },
]

export function QuickActions() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold tracking-tight">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="group flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:bg-muted/50 hover:shadow-md"
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
                action.bg,
                action.color
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
