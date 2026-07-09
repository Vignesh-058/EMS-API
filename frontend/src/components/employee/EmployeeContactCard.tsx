import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Employee } from "@/data/employees"
import { Mail, Phone, MapPin, Contact } from "lucide-react"

interface EmployeeContactCardProps {
  employee: Employee
}

export function EmployeeContactCard({ employee }: EmployeeContactCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Contact className="h-5 w-5 text-muted-foreground" />
          Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email Address
          </p>
          <p className="font-medium">{employee.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Phone className="h-4 w-4" /> Phone Number
          </p>
          <p className="font-medium">{employee.phone || "Not specified"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Residential Address
          </p>
          <p className="font-medium">{employee.address || "Not specified"}</p>
        </div>
      </CardContent>
    </Card>
  )
}
