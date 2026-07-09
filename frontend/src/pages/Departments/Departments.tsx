import * as React from "react"
import { PageContainer } from "@/layouts/page-container"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { DepartmentTable } from "@/components/department/DepartmentTable"
import { DepartmentSearch } from "@/components/department/DepartmentSearch"
import { DepartmentFilters, initialDepartmentFilterState } from "@/components/department/DepartmentFilters"
import { DepartmentPagination } from "@/components/department/DepartmentPagination"
import { DepartmentDialog } from "@/components/department/DepartmentDialog"
import { DepartmentDeleteDialog } from "@/components/department/DepartmentDeleteDialog"
import { mockDepartments, type Department } from "@/data/departments"
import type { DepartmentFormValues } from "@/components/department/DepartmentForm"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function Departments() {
  const [departments, setDepartments] = React.useState<Department[]>(mockDepartments)
  const [editingDepartment, setEditingDepartment] = React.useState<Department | null>(null)
  const [deletingDepartment, setDeletingDepartment] = React.useState<Department | null>(null)
  
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState(initialDepartmentFilterState)
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveDepartment = (data: DepartmentFormValues) => {
    if (editingDepartment) {
      setDepartments((prev) => 
        prev.map((dept) => 
          dept.id === editingDepartment.id ? { ...dept, ...data } : dept
        )
      )
      toast.success("Department updated successfully")
    } else {
      const newDept = {
        ...data,
        id: `DEP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        employeeCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        budget: 0,
        openRoles: 0,
        utilizationRate: 0,
        performanceScore: 0
      } as Department
      setDepartments((prev) => [...prev, newDept])
      toast.success("Department created successfully")
    }
  }

  const handleDelete = () => {
    if (deletingDepartment) {
      setDepartments((prev) => prev.filter(dept => dept.id !== deletingDepartment.id))
      toast.success("Department deleted successfully")
    }
  }

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const processedDepartments = React.useMemo(() => {
    let result = [...departments]

    // 1. Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      result = result.filter(
        (dept) =>
          dept.name.toLowerCase().includes(lowerQuery) ||
          dept.code.toLowerCase().includes(lowerQuery) ||
          dept.managerName.toLowerCase().includes(lowerQuery)
      )
    }

    // 2. Advanced Filters
    if (filters.status !== "all") {
      result = result.filter((dept) => dept.status === filters.status)
    }
    if (filters.location !== "all") {
      result = result.filter((dept) => dept.location === filters.location)
    }
    if (filters.manager) {
      result = result.filter((dept) => 
        dept.managerName.toLowerCase().includes(filters.manager.toLowerCase())
      )
    }
    if (filters.minEmployees) {
      const min = parseInt(filters.minEmployees, 10)
      if (!isNaN(min)) {
        result = result.filter((dept) => dept.employeeCount >= min)
      }
    }

    // 3. Sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a]
        const bValue = b[sortConfig.key as keyof typeof b]

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }

    return result
  }, [departments, searchQuery, filters, sortConfig])

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters, sortConfig])

  // Paginate Data
  const totalItems = processedDepartments.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const paginatedDepartments = processedDepartments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <PageContainer
      title="Departments"
      subtitle="Manage company departments, directories, and operational divisions."
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Departments" },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden transition-all hover:bg-muted sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DepartmentDialog onSave={handleSaveDepartment}>
            <Button className="transition-all hover:shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DepartmentDialog>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Toolbar: Search & Filters */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <DepartmentSearch value={searchQuery} onChange={setSearchQuery} className="flex-1 w-full" />
          
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <DepartmentFilters filters={filters} setFilters={setFilters} />
            {/* Mobile Export Button */}
            <Button variant="outline" className="w-full transition-all sm:hidden">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table/Content Area */}
        {isLoading ? (
          <div className="w-full space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : paginatedDepartments.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center text-muted-foreground bg-card/50">
            <p className="text-lg font-medium text-foreground">No departments found</p>
            <p className="mt-1 text-sm">Try adjusting your search query or removing filters.</p>
            <Button variant="outline" className="mt-6" onClick={() => {
              setSearchQuery("")
              setFilters(initialDepartmentFilterState)
            }}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <DepartmentTable 
              data={paginatedDepartments} 
              sortConfig={sortConfig} 
              onSort={handleSort} 
              onEdit={setEditingDepartment}
              onDelete={setDeletingDepartment}
            />
            <DepartmentPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <DepartmentDialog
        open={!!editingDepartment}
        onOpenChange={(open) => !open && setEditingDepartment(null)}
        department={editingDepartment}
        onSave={handleSaveDepartment}
      />

      <DepartmentDeleteDialog
        open={!!deletingDepartment}
        onOpenChange={(open) => !open && setDeletingDepartment(null)}
        department={deletingDepartment}
        onConfirm={handleDelete}
      />
    </PageContainer>
  )
}
