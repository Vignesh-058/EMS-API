import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

const data = [
  { name: "Basic Salary", value: 65, color: "hsl(var(--chart-1))" },
  { name: "Allowances", value: 15, color: "hsl(var(--chart-2))" },
  { name: "Bonus", value: 5, color: "hsl(var(--chart-3))" },
  { name: "Taxes & PF", value: 15, color: "hsl(var(--destructive))" },
]

export function SalaryBreakdownCard() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cost Breakdown</h3>
        <p className="text-sm text-muted-foreground">Company-wide compensation allocation.</p>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="transparent"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: any) => [`${value}%`, "Contribution"]}
                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold">$1.2M</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Total</span>
          </div>
        </div>
        
        {/* Legend Grid */}
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground leading-none">{item.name}</span>
                <span className="text-[10px] text-muted-foreground mt-1">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
