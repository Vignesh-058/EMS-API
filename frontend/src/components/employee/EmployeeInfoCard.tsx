import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Employee } from "@/data/employees"
import { Calendar, Building, User, Briefcase } from "lucide-react"

interface EmployeeInfoCardProps {
  employee: Employee
}

export function EmployeeInfoCard({ employee }: EmployeeInfoCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(dateString))
    } catch {
      return dateString
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          General Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4" /> Gender
          </p>
          <p className="font-medium">{employee.gender || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Date of Birth
          </p>
          <p className="font-medium">{employee.dateOfBirth ? formatDate(employee.dateOfBirth) : "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Building className="h-4 w-4" /> Department
          </p>
          <p className="font-medium">{employee.department}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Joining Date
          </p>
          <p className="font-medium">{employee.joiningDate ? formatDate(employee.joiningDate) : "Not specified"}</p>
        </div>
      </CardContent>
    </Card>
  )
}
