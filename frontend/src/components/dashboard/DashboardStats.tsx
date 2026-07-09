import { Users, Building2, UserCheck, UserX, UserPlus, CircleDollarSign } from "lucide-react"
import { StatsCard } from "./StatsCard"
import { ResponsiveGrid } from "@/components/common/responsive-grid"

const mockStats = [
  {
    title: "Total Employees",
    value: "1,248",
    icon: Users,
    trend: "up" as const,
    trendValue: "+12%",
    description: "from last month",
  },
  {
    title: "Departments",
    value: "12",
    icon: Building2,
    trend: "neutral" as const,
    trendValue: "0%",
    description: "no changes this year",
  },
  {
    title: "Present Today",
    value: "1,180",
    icon: UserCheck,
    trend: "up" as const,
    trendValue: "+2.5%",
    description: "vs yesterday",
  },
  {
    title: "On Leave",
    value: "45",
    icon: UserX,
    trend: "down" as const,
    trendValue: "-5%",
    description: "from last week",
  },
  {
    title: "New Employees",
    value: "24",
    icon: UserPlus,
    trend: "up" as const,
    trendValue: "+18%",
    description: "this quarter",
  },
  {
    title: "Monthly Payroll",
    value: "$452.5k",
    icon: CircleDollarSign,
    trend: "up" as const,
    trendValue: "+4%",
    description: "from last month",
  },
]

export function DashboardStats() {
  return (
    <ResponsiveGrid columns={3}>
      {mockStats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </ResponsiveGrid>
  )
}
