import * as React from "react"
import { PageContainer } from "@/layouts/page-container"
import { Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmployeeTable } from "@/components/employee/EmployeeTable"
import { EmployeeSearch } from "@/components/employee/EmployeeSearch"
import { EmployeeFilters, type FilterState, initialFilterState } from "@/components/employee/EmployeeFilters"
import { EmployeePagination } from "@/components/employee/EmployeePagination"
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog"
import { EditEmployeeDialog } from "@/components/employee/EditEmployeeDialog"
import { DeleteEmployeeDialog } from "@/components/employee/DeleteEmployeeDialog"
import { ViewEmployeeDialog } from "@/components/employee/ViewEmployeeDialog"
import { ErrorState } from "@/components/common/ErrorState"
import { useEmployees } from "@/hooks/useEmployees"
import { type Employee } from "@/data/employees"

export default function Employees() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState<FilterState>(initialFilterState)
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  
  // Dialog State
  const [viewingEmployee, setViewingEmployee] = React.useState<Employee | null>(null)
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null)
  const [deletingEmployee, setDeletingEmployee] = React.useState<Employee | null>(null)

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(5)

  // Reset to page 1 when filters/search/sort change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters, sortConfig])

  const queryParams = React.useMemo(() => {
    const params: Record<string, any> = {
      page: currentPage,
      limit: pageSize,
    }
    if (searchQuery) params.search = searchQuery
    if (filters.department) params.department = filters.department
    if (filters.status) params.status = filters.status
    if (filters.gender) params.gender = filters.gender
    if (filters.minSalary) params.salaryMin = filters.minSalary
    if (filters.maxSalary) params.salaryMax = filters.maxSalary
    if (sortConfig) {
      params.sortBy = sortConfig.key
      params.sortOrder = sortConfig.direction
    } else {
      params.sortBy = 'employeeId'
      params.sortOrder = 'asc'
    }
    return params
  }, [currentPage, pageSize, searchQuery, filters, sortConfig])

  const { data: response, isLoading, isError, refetch } = useEmployees(queryParams)
  const employees = response?.data || []
  const pagination = response?.pagination || { totalPages: 1, totalEmployees: 0, currentPage: 1, pageSize: 5, hasNextPage: false, hasPreviousPage: false }

  const handleResetFilters = () => {
    setFilters(initialFilterState)
  }

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === "asc") return { key, direction: "desc" }
        return null // reset sort
      }
      return { key, direction: "asc" }
    })
  }

  if (isLoading) {
    return (
      <PageContainer title="Employees" subtitle="Manage your workforce directory, roles, and statuses.">
        <ErrorState type="loading" title="Loading Employees..." className="mt-12" />
      </PageContainer>
    )
  }

  if (isError) {
    return (
      <PageContainer title="Employees" subtitle="Manage your workforce directory, roles, and statuses.">
        <ErrorState type="unexpected" title="Failed to load employees" onRetry={() => refetch()} className="mt-12" />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Employees"
      subtitle="Manage your workforce directory, roles, and statuses."
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Employees" },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden transition-all hover:bg-muted sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <AddEmployeeDialog>
            <Button className="transition-all hover:shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </AddEmployeeDialog>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        
        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <EmployeeSearch value={searchQuery} onChange={setSearchQuery} className="flex-1 w-full" />
          
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <EmployeeFilters 
              filters={filters} 
              setFilters={setFilters} 
              onReset={handleResetFilters} 
            />
            {/* Mobile Export Button */}
            <Button variant="outline" className="w-full transition-all sm:hidden">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table Area */}
        <div className="w-full">
          {!isLoading && !isError && employees.length === 0 ? (
            <ErrorState type="no-data" title="No Employees Found" message="There are no employees in the database." className="mt-8" />
          ) : (
            <>
              <EmployeeTable 
                data={employees} 
                sortConfig={sortConfig} 
                onSort={handleSort} 
                onView={setViewingEmployee}
                onEdit={setEditingEmployee}
                onDelete={setDeletingEmployee}
              />
              <EmployeePagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                pageSize={pageSize}
                totalItems={pagination.totalEmployees}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                  setPageSize(size)
                  setCurrentPage(1)
                }}
              />
            </>
          )}
        </div>
        
        {/* View Dialog */}
        <ViewEmployeeDialog
          open={!!viewingEmployee}
          onOpenChange={(open) => !open && setViewingEmployee(null)}
          employee={viewingEmployee}
        />

        {/* Controlled Edit Dialog */}
        <EditEmployeeDialog
          open={!!editingEmployee}
          onOpenChange={(open) => !open && setEditingEmployee(null)}
          employee={editingEmployee}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteEmployeeDialog
          open={!!deletingEmployee}
          onOpenChange={(open) => !open && setDeletingEmployee(null)}
          employee={deletingEmployee}
        />
      </div>
    </PageContainer>
  )
}
