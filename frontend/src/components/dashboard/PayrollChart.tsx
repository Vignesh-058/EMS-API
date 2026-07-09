import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { payrollData } from "@/data/dashboard"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function PayrollChart() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Payroll Trend</CardTitle>
        <CardDescription>Total monthly payroll expenditure ($K).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={payrollData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area type="monotone" dataKey="payroll" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPayroll)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
