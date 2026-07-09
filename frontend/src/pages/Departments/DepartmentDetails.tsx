import * as React from "react"
import { StatusBadge } from "@/components/common/StatusBadge"
import { useParams, useNavigate } from "react-router-dom"
import { PageContainer } from "@/layouts/page-container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import { mockDepartments } from "@/data/departments"
import { EmployeeTable } from "@/components/employee/EmployeeTable"
import { mockEmployees } from "@/data/employees"

export default function DepartmentDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const department = mockDepartments.find((d) => d.id === id)

  const [employeeSortConfig, setEmployeeSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  const handleEmployeeSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (employeeSortConfig && employeeSortConfig.key === key && employeeSortConfig.direction === "asc") {
      direction = "desc"
    }
    setEmployeeSortConfig({ key, direction })
  }

  const departmentEmployees = React.useMemo(() => {
    if (!department) return []
    let result = mockEmployees.filter((emp) => emp.department === department.name)
    if (employeeSortConfig) {
      result.sort((a, b) => {
        const aValue = a[employeeSortConfig.key as keyof typeof a]
        const bValue = b[employeeSortConfig.key as keyof typeof b]
        if (aValue < bValue) return employeeSortConfig.direction === "asc" ? -1 : 1
        if (aValue > bValue) return employeeSortConfig.direction === "asc" ? 1 : -1
        return 0
      })
    }
    return result
  }, [department, employeeSortConfig])

  if (!department) {
    return (
      <PageContainer title="Department Not Found">
        <Button onClick={() => navigate("/departments")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Departments
        </Button>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={department.name}
      subtitle={`Code: ${department.code}`}
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Departments", href: "/departments" },
        { label: department.name },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/departments")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Department
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* Department Info Header */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 rounded-xl border bg-card p-6 text-card-foreground shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">About</h2>
              <StatusBadge status={department.status} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {department.description}
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-6 sm:grid-cols-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Manager</p>
                <p className="mt-1 font-medium">{department.managerName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Location</p>
                <p className="mt-1 font-medium">{department.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Team Size</p>
                <p className="mt-1 font-medium">{department.employeeCount} members</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Created</p>
                <p className="mt-1 font-medium">
                  {new Date(department.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col justify-center rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
              <p className="mt-2 text-2xl font-bold">
                ${(department.budget / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Open Roles</p>
              <p className="mt-2 text-2xl font-bold">{department.openRoles}</p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Utilization</p>
              <p className="mt-2 text-2xl font-bold">{department.utilizationRate}%</p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Performance</p>
              <p className="mt-2 text-2xl font-bold text-success">{department.performanceScore}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Department Employees</h2>
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            {departmentEmployees.length > 0 ? (
              <EmployeeTable 
                data={departmentEmployees} 
                sortConfig={employeeSortConfig} 
                onSort={handleEmployeeSort} 
              />
            ) : (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                No employees currently assigned to this department.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
