import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { departmentData } from "@/data/dashboard"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const COLORS = [
  'hsl(var(--primary))', 
  'hsl(var(--info))', 
  'hsl(var(--success))', 
  'hsl(var(--warning))', 
  'hsl(var(--destructive))', 
  'hsl(var(--muted-foreground))'
]

export function DepartmentChart() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Departments</CardTitle>
        <CardDescription>Distribution across organization.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
