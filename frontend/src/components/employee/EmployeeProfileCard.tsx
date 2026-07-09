import { Card, CardContent } from "@/components/ui/card"
import type { Employee } from "@/data/employees"
import { Badge } from "@/components/ui/badge"

interface EmployeeProfileCardProps {
  employee: Employee
}

export function EmployeeProfileCard({ employee }: EmployeeProfileCardProps) {
  const statusColorMap: Record<string, string> = {
    Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    "On Leave": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Probation: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Terminated: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }

  const badgeClass = statusColorMap[employee.status] || statusColorMap.Active

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <div className="h-24 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10"></div>
      <CardContent className="relative px-6 pb-6 pt-0">
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-muted text-3xl font-bold text-muted-foreground shadow-sm">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.firstName} className="h-full w-full rounded-full object-cover" />
              ) : (
                `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`
              )}
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pb-1 sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-sm font-medium text-muted-foreground">
                {employee.designation} • {employee.department}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2 sm:mt-0 sm:items-end sm:pb-1">
            <Badge variant="secondary" className={`px-3 py-1 text-sm font-semibold border-none ${badgeClass}`}>
              {employee.status}
            </Badge>
            <p className="text-xs text-muted-foreground">ID: {employee.employeeId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
