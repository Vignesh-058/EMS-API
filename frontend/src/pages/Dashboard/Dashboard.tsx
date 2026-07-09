import { PageContainer } from "@/layouts/page-container"
import { WelcomeSection } from "@/components/dashboard/WelcomeSection"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentEmployees } from "@/components/dashboard/RecentEmployees"
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline"
import { EmployeeGrowthChart } from "@/components/dashboard/EmployeeGrowthChart"
import { DepartmentChart } from "@/components/dashboard/DepartmentChart"
import { AttendanceChart } from "@/components/dashboard/AttendanceChart"
import { PayrollChart } from "@/components/dashboard/PayrollChart"
import { CalendarWidget } from "@/components/dashboard/CalendarWidget"
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents"
import { Announcements } from "@/components/dashboard/Announcements"
import { CompanySummary } from "@/components/dashboard/CompanySummary"

export default function Dashboard() {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Overview of your organization's human resources."
      breadcrumb={[{ label: "Dashboard" }]}
    >
      <div className="flex flex-col gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <WelcomeSection />
        <DashboardStats />
        <QuickActions />
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <EmployeeGrowthChart />
          <DepartmentChart />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <AttendanceChart />
          <PayrollChart />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <RecentEmployees />
          <ActivityTimeline />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <CalendarWidget />
          <UpcomingEvents />
          <Announcements />
          <CompanySummary />
        </div>
      </div>
    </PageContainer>
  )
}
