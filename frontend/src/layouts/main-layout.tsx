import { Outlet } from "react-router-dom"
import { Building2 } from "lucide-react"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function MainLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-surface px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Building2 className="size-5" />
          </div>
          <span className="text-xl tracking-tight">EMS Pro</span>
        </div>
        <ThemeToggle />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-surface py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} EMS Pro. All rights reserved.
      </footer>
    </div>
  )
}
