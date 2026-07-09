import { Building2, Users } from "lucide-react"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount)
}

const data = [
  { name: "Engineering", employees: 42, total: 385000, avg: 9166, highest: 15000, lowest: 5000 },
  { name: "Sales", employees: 35, total: 245000, avg: 7000, highest: 12000, lowest: 4000 },
  { name: "Product", employees: 18, total: 165000, avg: 9166, highest: 14000, lowest: 6000 },
  { name: "Marketing", employees: 22, total: 135000, avg: 6136, highest: 9500, lowest: 4500 },
  { name: "Design", employees: 15, total: 125000, avg: 8333, highest: 11000, lowest: 5500 },
]

export function DepartmentPayrollSummary() {
  // Sort by highest payroll
  const sortedData = [...data].sort((a, b) => b.total - a.total)

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6 pb-4 border-b">
        <h3 className="text-lg font-semibold">Department Payroll Summary</h3>
        <p className="text-sm text-muted-foreground">Aggregated metrics grouped by cost center.</p>
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Department</th>
              <th className="px-6 py-4 font-medium">Headcount</th>
              <th className="px-6 py-4 font-medium">Total Payroll</th>
              <th className="px-6 py-4 font-medium text-right">Avg Salary</th>
              <th className="px-6 py-4 font-medium text-right">Highest</th>
              <th className="px-6 py-4 font-medium text-right">Lowest</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedData.map((dept) => (
              <tr key={dept.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="font-medium">{dept.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    {dept.employees}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">
                  {formatCurrency(dept.total)}
                </td>
                <td className="px-6 py-4 text-right">
                  {formatCurrency(dept.avg)}
                </td>
                <td className="px-6 py-4 text-right text-success">
                  {formatCurrency(dept.highest)}
                </td>
                <td className="px-6 py-4 text-right text-muted-foreground">
                  {formatCurrency(dept.lowest)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
