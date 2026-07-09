import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { attendanceData } from "@/data/dashboard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function AttendanceChart() {
  return (
    <Card className="col-span-1 shadow-sm transition-all duration-300 hover:shadow-md md:col-span-2 lg:col-span-3 xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Attendance Overview</CardTitle>
        <CardDescription>Daily present vs leave metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              <Bar dataKey="present" name="Present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="onLeave" name="On Leave" fill="hsl(var(--warning))" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
