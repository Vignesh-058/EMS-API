import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "< $5k", value: 15, color: "hsl(var(--chart-1))" },
  { name: "$5k - $7k", value: 45, color: "hsl(var(--chart-2))" },
  { name: "$7k - $10k", value: 25, color: "hsl(var(--chart-3))" },
  { name: "> $10k", value: 15, color: "hsl(var(--chart-4))" },
]

const chartConfig = {
  value: {
    label: "Employees",
  }
}

export function SalaryDistributionChart() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm h-full">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Salary Distribution</h3>
        <p className="text-sm text-muted-foreground">Employee count by salary bands.</p>
      </div>
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
