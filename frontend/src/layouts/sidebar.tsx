import { NavLink } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  
  Wallet, 
  Settings, 
  User, 
  LifeBuoy, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  CalendarCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Employees", href: "/employees", icon: Users },
  { title: "Departments", href: "/departments", icon: Building2 },
  { title: "Attendance", href: "/attendance", icon: CalendarCheck },
  { title: "Payroll", href: "/payroll", icon: Wallet },
]

const bottomNavItems = [
  { title: "Settings", href: "/settings", icon: Settings },
  { title: "Profile", href: "/profile", icon: User },
  { title: "Support", href: "/support", icon: LifeBuoy },
]

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
  toggleCollapse?: () => void
  onNavigate?: () => void // Useful for closing mobile drawer on click
}

export function Sidebar({
  className,
  isCollapsed = false,
  toggleCollapse,
  onNavigate,
  ...props
}: SidebarProps) {
  return (
    <div className={cn("flex h-full w-full flex-col bg-surface border-r", className)} {...props}>
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>
            <span className="text-lg tracking-tight">EMS Pro</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="size-5" />
          </div>
        )}
        {toggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-8 w-8 text-muted-foreground hover:text-foreground md:flex"
            onClick={toggleCollapse}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center px-2"
                )
              }
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <nav className="grid gap-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isCollapsed && "justify-center px-2"
                )
              }
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
          <button
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive transition-colors duration-200 hover:bg-destructive/10 cursor-pointer",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </div>
  )
}
