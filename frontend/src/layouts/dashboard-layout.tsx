import * as React from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"
import { cn } from "@/lib/utils"

export function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-surface z-20 transition-[width] duration-300 ease-in-out",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full min-w-0 relative transition-all">
        <Navbar />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
