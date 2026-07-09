import { PayrollTrendChart } from "./PayrollTrendChart"
import { SalaryDistributionChart } from "./SalaryDistributionChart"
import { DepartmentPayrollChart } from "./DepartmentPayrollChart"
import { DepartmentPayrollSummary } from "./DepartmentPayrollSummary"
import { SalaryBreakdownCard } from "./SalaryBreakdownCard"

export function PayrollAnalytics() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Row: Main Trends */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PayrollTrendChart />
        </div>
        <div>
          <SalaryBreakdownCard />
        </div>
      </div>
      
      {/* Middle Row: Distributions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DepartmentPayrollChart />
        <SalaryDistributionChart />
      </div>

      {/* Bottom Row: Deep Dive Summary Table */}
      <div className="w-full">
        <DepartmentPayrollSummary />
      </div>
      
    </div>
  )
}
