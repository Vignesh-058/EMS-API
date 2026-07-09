import * as React from "react"
import { PageContainer } from "@/layouts/page-container"
import { Wallet, Banknote, RefreshCcw, Landmark, Receipt, Percent } from "lucide-react"
import { PayrollSummaryCard } from "@/components/payroll/PayrollSummaryCard"
import { PayrollTable } from "@/components/payroll/PayrollTable"
import { PayrollToolbar } from "@/components/payroll/PayrollToolbar"
import { PayrollFilters, initialPayrollFilterState, type PayrollFilterState } from "@/components/payroll/PayrollFilters"
import { GeneratePayslipDialog } from "@/components/payroll/GeneratePayslipDialog"
import { PayrollAnalytics } from "@/components/payroll/PayrollAnalytics"
import { PayrollReports } from "@/components/payroll/PayrollReports"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPayrollRecords, type PayrollRecord } from "@/data/payroll"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function Payroll() {
  const navigate = useNavigate()
  const [records] = React.useState<PayrollRecord[]>(mockPayrollRecords)
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState<PayrollFilterState>(initialPayrollFilterState)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false)
  
  // Sort
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  
  // Dialogs
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = React.useState(false)
  
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Data Pipeline
  const filteredRecords = React.useMemo(() => {
    return records.filter((record) => {
      // 1. Search Query
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        record.employeeName.toLowerCase().includes(query) ||
        record.employeeId.toLowerCase().includes(query) ||
        record.department.toLowerCase().includes(query)
        
      // 2. Filters
      const matchesDept = filters.department === "all" || record.department === filters.department
      const matchesDesignation = filters.designation === "all" || record.designation === filters.designation
      const matchesStatus = filters.paymentStatus === "all" || record.paymentStatus === filters.paymentStatus
      
      // Basic mock filter for month/year (just checking if it exists for this demo)
      const matchesMonth = filters.paymentMonth === "all" || true
      const matchesYear = filters.paymentYear === "all" || true
        
      return matchesSearch && matchesDept && matchesDesignation && matchesStatus && matchesMonth && matchesYear
    })
  }, [records, searchQuery, filters])

  const sortedRecords = React.useMemo(() => {
    if (!sortConfig) return filteredRecords
    return [...filteredRecords].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof PayrollRecord]
      const bValue = b[sortConfig.key as keyof PayrollRecord]
      
      if (aValue === null) return sortConfig.direction === "asc" ? 1 : -1
      if (bValue === null) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredRecords, sortConfig])

  // Stat Calculations
  const formatCompact = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: "compact",
      maximumFractionDigits: 1
    }).format(num)
  }

  const totalPayroll = records.reduce((acc, curr) => acc + curr.netSalary, 0)
  const totalDeductions = records.reduce((acc, curr) => acc + (curr.tax + curr.pf + curr.insurance + curr.otherDeductions), 0)
  const avgSalary = records.length > 0 ? totalPayroll / records.length : 0
  
  const paidCount = records.filter(r => r.paymentStatus === "Paid").length
  const pendingCount = records.filter(r => r.paymentStatus === "Pending" || r.paymentStatus === "Processing").length

  return (
    <PageContainer
      title="Payroll"
      subtitle="Manage employee salaries, deductions, and payment distributions."
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Payroll" },
      ]}
    >
      <div className="flex flex-col gap-6">
        
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <PayrollSummaryCard 
            title="Total Payroll" 
            value={formatCompact(totalPayroll)} 
            description="Total net payable" 
            icon={Wallet} 
            trend="up"
            trendValue="4.2%"
            gradient="from-blue-500/10 to-transparent"
          />
          <PayrollSummaryCard 
            title="Employees Paid" 
            value={`${paidCount}/${records.length}`} 
            description="Successfully cleared" 
            icon={Banknote} 
            trend="up"
            trendValue="85%"
            gradient="from-success/10 to-transparent"
          />
          <PayrollSummaryCard 
            title="Pending Payments" 
            value={`${pendingCount}`} 
            description="Awaiting processing" 
            icon={RefreshCcw} 
            gradient="from-warning/10 to-transparent"
          />
          <PayrollSummaryCard 
            title="Payroll This Month" 
            value="June 2026" 
            description="Current cycle" 
            icon={Landmark} 
            gradient="from-indigo-500/10 to-transparent"
          />
          <PayrollSummaryCard 
            title="Total Deductions" 
            value={formatCompact(totalDeductions)} 
            description="Taxes, PF, Insurance" 
            icon={Receipt} 
            trend="up"
            trendValue="1.5%"
            gradient="from-destructive/10 to-transparent"
          />
          <PayrollSummaryCard 
            title="Average Salary" 
            value={formatCompact(avgSalary)} 
            description="Net average pay" 
            icon={Percent} 
            gradient="from-purple-500/10 to-transparent"
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Toolbar */}
            <PayrollToolbar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterClick={() => setIsFilterSheetOpen(true)}
              onExportClick={() => toast.success("Payroll report exported successfully")}
              onGenerateClick={() => setIsGenerateDialogOpen(true)}
              activeFiltersCount={Object.values(filters).filter(v => v !== "all").length}
            />

            {/* Table Area */}
            {isLoading ? (
              <div className="w-full space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="w-full space-y-4">
                <PayrollTable 
                  data={sortedRecords} 
                  sortConfig={sortConfig}
                  onSort={handleSort}
                  onView={(record) => navigate(`/payroll/${record.id}`)}
                  onDownload={(record) => toast.success(`Downloading payslip for ${record.employeeName}`)}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <PayrollAnalytics />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <PayrollReports />
          </TabsContent>
        </Tabs>
      </div>

      <PayrollFilters 
        open={isFilterSheetOpen}
        onOpenChange={setIsFilterSheetOpen}
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters(initialPayrollFilterState)}
      />

      <GeneratePayslipDialog 
        open={isGenerateDialogOpen}
        onOpenChange={setIsGenerateDialogOpen}
        onGenerate={() => toast.success("Payslip PDF generated successfully")}
      />
    </PageContainer>
  )
}
