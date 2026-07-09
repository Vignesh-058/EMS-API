import { Building2 } from "lucide-react"

export function WelcomeSection() {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date())

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-8 text-primary-foreground shadow-md transition-all sm:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-10 right-20 h-32 w-32 rounded-full bg-primary-foreground/5 blur-2xl" aria-hidden="true" />
      
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary-foreground/80">
            {currentDate}
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {getGreeting()} 👋
          </h2>
          <p className="mt-1 max-w-lg text-primary-foreground/90">
            Welcome back, Admin. Manage your employees, track attendance, and process payroll efficiently.
          </p>
        </div>
        
        <div className="hidden shrink-0 items-center gap-3 rounded-lg border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-foreground text-primary shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wider text-primary-foreground/70">Organization</span>
            <span className="font-semibold text-primary-foreground">EMS Pro Inc.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
