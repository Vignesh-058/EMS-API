import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", payroll: 45000, deductions: 8500 },
  { month: "Feb", payroll: 48000, deductions: 9100 },
  { month: "Mar", payroll: 46500, deductions: 8800 },
  { month: "Apr", payroll: 51000, deductions: 9800 },
  { month: "May", payroll: 53500, deductions: 10200 },
  { month: "Jun", payroll: 58000, deductions: 11500 },
]

const chartConfig = {
  payroll: {
    label: "Gross Payroll",
    color: "hsl(var(--primary))",
  },
  deductions: {
    label: "Deductions",
    color: "hsl(var(--destructive))",
  }
}

export function PayrollTrendChart() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Monthly Payroll Trend</h3>
        <p className="text-sm text-muted-foreground">Gross payroll vs total deductions over the last 6 months.</p>
      </div>
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillPayroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-payroll)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-payroll)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillDeductions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-deductions)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-deductions)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={8} 
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value / 1000}k`}
                width={60}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="payroll"
                stroke="var(--color-payroll)"
                fillOpacity={1}
                fill="url(#fillPayroll)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="deductions"
                stroke="var(--color-deductions)"
                fillOpacity={1}
                fill="url(#fillDeductions)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
