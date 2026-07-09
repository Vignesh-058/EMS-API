import * as React from "react"
import { Menu, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { GlobalSearch } from "@/components/common/global-search"
import { ProfileMenu } from "./profile-menu"
import { NotificationMenu } from "./notification-menu"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b bg-surface px-4 shadow-sm sm:px-6 lg:px-8">
      {/* Left side: Mobile Menu + Logo/Title + Breadcrumb Placeholder */}
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Mobile Logo (visible only on small screens) */}
        <div className="flex items-center gap-2 font-semibold md:hidden">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="size-4" />
          </div>
          <span className="tracking-tight">EMS Pro</span>
        </div>

        {/* Breadcrumb Integration (Step 4) */}
        <div className="hidden md:flex">
          <BreadcrumbNav
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Employees", href: "/employees" },
              { label: "Employee Details" }
            ]}
          />
        </div>
      </div>

      {/* Right side: Search, Theme, Notifications, Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Global Search Integration (Step 5) */}
        <div className="hidden sm:block">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-1 border-r pr-2 md:pr-4">
          {/* Theme Toggle Integration (Step 8) */}
          <ThemeToggle />
          
          <span className="mx-2 text-muted-foreground/30">|</span>

          {/* Notifications Integration (Step 7) */}
          <NotificationMenu />
        </div>

        {/* Profile Dropdown Integration (Step 6) */}
        <div className="ml-1 md:ml-2">
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
