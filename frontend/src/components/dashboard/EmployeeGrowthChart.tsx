import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { employeeGrowthData } from "@/data/dashboard"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function EmployeeGrowthChart() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md md:col-span-2 lg:col-span-3 xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Employee Growth</CardTitle>
        <CardDescription>Total headcount over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={employeeGrowthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Line 
                type="monotone" 
                dataKey="employees" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
