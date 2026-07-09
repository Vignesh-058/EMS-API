import * as React from "react"
import { PageContainer } from "@/layouts/page-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Plus, Users, UserCheck, UserX, Clock, CalendarHeart, Laptop } from "lucide-react"
import { AttendanceSummaryCard } from "@/components/attendance/AttendanceSummaryCard"
import { AttendanceTable } from "@/components/attendance/AttendanceTable"
import { AttendancePagination } from "@/components/attendance/AttendancePagination"
import { AttendanceFilterSheet, initialAttendanceFilterState, type AttendanceFilterState } from "@/components/attendance/AttendanceFilterSheet"
import { AttendanceDialog } from "@/components/attendance/AttendanceDialog"
import { AttendanceDeleteDialog } from "@/components/attendance/AttendanceDeleteDialog"
import { mockAttendanceRecords, type AttendanceRecord } from "@/data/attendance"
import { mockEmployees } from "@/data/employees"
import type { AttendanceFormValues } from "@/components/attendance/AttendanceForm"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function Attendance() {
  const [records, setRecords] = React.useState<AttendanceRecord[]>(mockAttendanceRecords)
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState<AttendanceFilterState>(initialAttendanceFilterState)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false)

  // Sort State
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  
  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  
  // Dialog States
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
  const [editingRecord, setEditingRecord] = React.useState<AttendanceRecord | null>(null)
  const [deletingRecord, setDeletingRecord] = React.useState<AttendanceRecord | null>(null)
  
  // Loading State
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Action Handlers
  const handleSaveRecord = (data: AttendanceFormValues) => {
    // Resolve employee details
    const employee = mockEmployees.find(emp => emp.id === data.employeeId)
    if (!employee) return

    if (editingRecord) {
      setRecords((prev) => 
        prev.map((rec) => 
          rec.id === editingRecord.id ? { 
            ...rec, 
            ...data,
            employeeName: `${employee.firstName} ${employee.lastName}`,
            avatar: employee.avatar,
            department: employee.department
          } : rec
        )
      )
      toast.success("Attendance record updated")
    } else {
      const newRec: AttendanceRecord = {
        id: Math.random().toString(36).substring(2, 9),
        employeeId: employee.employeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        avatar: employee.avatar,
        department: employee.department,
        date: data.date,
        checkIn: data.checkIn || null,
        checkOut: data.checkOut || null,
        workingHours: data.checkIn && data.checkOut ? "8h 00m" : null, // Mock calculation
        status: data.status,
        location: data.location || null
      }
      setRecords((prev) => [newRec, ...prev])
      toast.success("Attendance marked successfully")
    }
  }

  const handleDelete = () => {
    if (deletingRecord) {
      setRecords((prev) => prev.filter(rec => rec.id !== deletingRecord.id))
      toast.success("Record deleted successfully")
    }
  }

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Data Pipeline: Filter -> Sort -> Paginate
  const filteredRecords = React.useMemo(() => {
    return records.filter((record) => {
      // 1. Search Query
      const matchesSearch = 
        record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.department.toLowerCase().includes(searchQuery.toLowerCase())
      
      // 2. Status Filter
      const matchesStatus = filters.status === "all" || record.status === filters.status

      // 3. Department Filter
      const matchesDept = filters.department === "all" || record.department === filters.department

      // 4. Date Range
      const matchesDateFrom = !filters.dateFrom || new Date(record.date) >= new Date(filters.dateFrom)
      const matchesDateTo = !filters.dateTo || new Date(record.date) <= new Date(filters.dateTo)

      return matchesSearch && matchesStatus && matchesDept && matchesDateFrom && matchesDateTo
    })
  }, [records, searchQuery, filters])

  const sortedRecords = React.useMemo(() => {
    if (!sortConfig) return filteredRecords
    return [...filteredRecords].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof AttendanceRecord]
      const bValue = b[sortConfig.key as keyof AttendanceRecord]
      
      if (aValue === null) return sortConfig.direction === "asc" ? 1 : -1
      if (bValue === null) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredRecords, sortConfig])

  const paginatedRecords = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedRecords.slice(start, start + pageSize)
  }, [sortedRecords, currentPage, pageSize])

  const totalPages = Math.ceil(sortedRecords.length / pageSize)

  // Quick stat calculations based on current records
  const presentCount = records.filter(r => r.status === "Present" || r.status === "Work From Home").length
  const lateCount = records.filter(r => r.status === "Late").length
  const absentCount = records.filter(r => r.status === "Absent").length
  const onLeaveCount = records.filter(r => r.status === "On Leave" || r.status === "Holiday").length
  const wfhCount = records.filter(r => r.status === "Work From Home").length

  return (
    <PageContainer
      title="Attendance"
      subtitle="Monitor and manage daily employee attendance records."
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Attendance" },
      ]}
      actions={
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Mark Attendance
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <AttendanceSummaryCard 
            title="Total Employees" 
            count={mockEmployees.length} 
            description="Active workforce" 
            icon={Users} 
          />
          <AttendanceSummaryCard 
            title="Present Today" 
            count={presentCount} 
            description="Checked in" 
            icon={UserCheck} 
            trend="up"
            trendValue="2.4%"
          />
          <AttendanceSummaryCard 
            title="Absent" 
            count={absentCount} 
            description="Unplanned leaves" 
            icon={UserX} 
            trend="down"
            trendValue="1.2%"
          />
          <AttendanceSummaryCard 
            title="Late Arrivals" 
            count={lateCount} 
            description="Post 09:30 AM" 
            icon={Clock} 
            trend="up"
            trendValue="5.1%"
          />
          <AttendanceSummaryCard 
            title="On Leave" 
            count={onLeaveCount} 
            description="Approved PTO" 
            icon={CalendarHeart} 
          />
          <AttendanceSummaryCard 
            title="Work From Home" 
            count={wfhCount} 
            description="Remote today" 
            icon={Laptop} 
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72 md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employee, ID, or department..."
              className="pl-9 bg-background shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="bg-background shadow-sm"
              onClick={() => setIsFilterSheetOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {Object.values(filters).filter(v => v !== "all" && v !== "").length > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {Object.values(filters).filter(v => v !== "all" && v !== "").length}
                </span>
              )}
            </Button>
            <Button variant="outline" className="bg-background shadow-sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table Area */}
        {isLoading ? (
          <div className="w-full space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : paginatedRecords.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center text-muted-foreground bg-card/50">
            <p className="text-lg font-medium text-foreground">No records found</p>
            <p className="mt-1 text-sm">Try adjusting your search query or filters.</p>
            <Button variant="outline" className="mt-6" onClick={() => {
              setSearchQuery("")
              setFilters(initialAttendanceFilterState)
            }}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <AttendanceTable 
              data={paginatedRecords} 
              sortConfig={sortConfig}
              onSort={handleSort}
              onEdit={setEditingRecord}
              onDelete={setDeletingRecord}
            />
            <AttendancePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AttendanceDialog 
        open={isAddDialogOpen || !!editingRecord}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false)
            setEditingRecord(null)
          }
        }}
        initialValues={editingRecord ? {
          employeeId: mockEmployees.find(e => e.employeeId === editingRecord.employeeId)?.id || "",
          date: editingRecord.date,
          status: editingRecord.status,
          checkIn: editingRecord.checkIn || "",
          checkOut: editingRecord.checkOut || "",
          location: editingRecord.location || ""
        } : undefined}
        onSave={handleSaveRecord}
      />

      <AttendanceDeleteDialog 
        open={!!deletingRecord}
        onOpenChange={(open) => !open && setDeletingRecord(null)}
        onConfirm={() => {
          handleDelete()
          setDeletingRecord(null)
        }}
        employeeName={deletingRecord?.employeeName}
        date={deletingRecord?.date}
      />

      <AttendanceFilterSheet 
        open={isFilterSheetOpen}
        onOpenChange={setIsFilterSheetOpen}
        filters={filters}
        onFilterChange={setFilters}
        onReset={() => setFilters(initialAttendanceFilterState)}
      />
    </PageContainer>
  )
}
