import { DataTable } from "@/components/common/data-table";
import type { ColumnDef } from "@/components/common/data-table";
import { recentEmployees } from "@/data/dashboard"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function RecentEmployees() {
  const columns: ColumnDef<typeof recentEmployees[0]>[] = [
    {
      key: "name",
      header: "Employee",
      render: (emp) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 font-medium text-primary">{emp.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{emp.name}</span>
            <span className="text-xs text-muted-foreground">{emp.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "designation",
      header: "Role & Dept",
      render: (emp) => (
        <div className="flex flex-col">
          <span className="font-medium">{emp.designation}</span>
          <span className="text-xs text-muted-foreground">{emp.department}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (emp) => {
        let variant: "default" | "secondary" | "destructive" | "outline" = "default"
        if (emp.status === "Active") variant = "default"
        if (emp.status === "Onboarding") variant = "secondary"
        if (emp.status === "On Leave") variant = "outline"
        
        return <Badge variant={variant}>{emp.status}</Badge>
      }
    },
    {
      key: "joiningDate",
      header: "Joined",
      render: (emp) => (
        <span className="text-sm text-muted-foreground">
          {new Date(emp.joiningDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      ),
    },
  ]

  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md md:col-span-2 lg:col-span-3 xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-lg">Recent Employees</CardTitle>
          <CardDescription>Overview of the newest members of your organization.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <Link to="/employees">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable 
          data={recentEmployees} 
          columns={columns} 
          keyExtractor={(emp) => emp.id} 
        />
      </CardContent>
    </Card>
  )
}
