import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Employee } from "@/data/employees"
import { DollarSign, Wallet } from "lucide-react"

interface EmployeeSalaryCardProps {
  employee: Employee
}

export function EmployeeSalaryCard({ employee }: EmployeeSalaryCardProps) {
  const formattedSalary = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(employee.salary || 0)

  return (
    <Card className="shadow-sm bg-gradient-to-br from-card to-muted/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          Financial Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg bg-background p-4 border shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Annual Base Salary
            </p>
            <p className="text-2xl font-bold tracking-tight text-foreground">{formattedSalary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
