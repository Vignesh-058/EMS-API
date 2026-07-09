import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { department: "Engineering", payroll: 85000 },
  { department: "Sales", payroll: 65000 },
  { department: "Product", payroll: 45000 },
  { department: "Marketing", payroll: 35000 },
  { department: "Design", payroll: 32000 },
  { department: "HR", payroll: 28000 },
]

const chartConfig = {
  payroll: {
    label: "Total Payroll",
    color: "hsl(var(--primary))",
  }
}

export function DepartmentPayrollChart() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Department Expenditure</h3>
        <p className="text-sm text-muted-foreground">Total payroll allocation across departments.</p>
      </div>
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis 
                type="number"
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis 
                dataKey="department" 
                type="category"
                tickLine={false} 
                axisLine={false} 
                width={80}
              />
              <ChartTooltip cursor={{ fill: 'hsl(var(--muted)/0.5)' }} content={<ChartTooltipContent />} />
              <Bar
                dataKey="payroll"
                fill="var(--color-payroll)"
                radius={[0, 4, 4, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
