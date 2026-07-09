import { Users, FilePlus, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in-50 duration-500">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Users className="h-10 w-10" aria-hidden="true" />
      </div>
      
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        Let's set up your workspace
      </h2>
      <p className="mb-8 max-w-[500px] text-center text-muted-foreground">
        Your dashboard is looking a little empty. Add your first employees, set up departments, and configure your payroll to see your metrics come to life.
      </p>

      <div className="mb-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Primary Call to Action */}
        <Card className="border-primary/20 bg-primary/5 transition-all hover:bg-primary/10">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">1. Add Employees</h3>
              <p className="text-xs text-muted-foreground">Start by building your team directory.</p>
            </div>
            <Button size="sm" className="mt-2 w-full" asChild>
              <Link to="/employees">Add First Employee</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Secondary Onboarding Steps */}
        <Card className="transition-all hover:shadow-md">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">2. Create Departments</h3>
              <p className="text-xs text-muted-foreground">Organize your workforce structure.</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
              <Link to="/departments">Setup Departments</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md sm:col-span-2 md:col-span-1">
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <FilePlus className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground">3. Import Data</h3>
              <p className="text-xs text-muted-foreground">Upload your existing CSV records.</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
              <Link to="/settings">Import CSV</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
