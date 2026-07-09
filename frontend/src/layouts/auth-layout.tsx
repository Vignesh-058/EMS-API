import { Outlet } from "react-router-dom"
import { Building2 } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:grid md:grid-cols-2">
      {/* Branding Section (Hidden on mobile) */}
      <div className="hidden flex-col items-start justify-between bg-primary p-10 text-primary-foreground md:flex">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary-foreground text-primary">
            <Building2 className="size-5" />
          </div>
          <span className="text-xl tracking-tight">EMS Pro</span>
        </div>
        <div className="max-w-md space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Manage your workforce effortlessly.</h1>
          <p className="text-primary-foreground/80">
            A comprehensive suite of tools designed to streamline HR operations and empower your team.
          </p>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 animate-in fade-in-50 duration-500">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
