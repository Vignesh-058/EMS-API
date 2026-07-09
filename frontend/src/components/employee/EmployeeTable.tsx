import { StatusBadge } from "@/components/common/StatusBadge"
import { DataTable, type ColumnDef } from "@/components/common/data-table"
import type { Employee } from "@/data/employees"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface EmployeeTableProps {
  data: Employee[]
  sortConfig: { key: string; direction: "asc" | "desc" } | null
  onSort: (key: string) => void
  onView?: (employee: Employee) => void
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
}

export function EmployeeTable({ data, sortConfig, onSort, onView, onEdit, onDelete }: EmployeeTableProps) {
  const SortableHeader = ({ title, sortKey }: { title: string, sortKey: string }) => {
    const isActive = sortConfig?.key === sortKey
    return (
      <Button 
        variant="ghost" 
        onClick={() => onSort(sortKey)}
        className="-ml-4 h-8 data-[state=open]:bg-accent hover:bg-accent/50"
      >
        <span>{title}</span>
        {isActive ? (
          sortConfig.direction === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
        )}
      </Button>
    )
  }

  const columns: ColumnDef<Employee>[] = [
    {
      key: "employeeId",
      header: "ID",
      render: (emp) => (
        <span className="font-mono text-xs font-medium text-muted-foreground">{emp.employeeId}</span>
      ),
    },
    {
      key: "employee",
      header: <SortableHeader title="Employee" sortKey="firstName" />,
      render: (emp) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 font-medium text-primary">{emp.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{emp.firstName} {emp.lastName}</span>
            <span className="text-xs text-muted-foreground">{emp.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (emp) => (
        <span className="text-sm text-muted-foreground">{emp.phone}</span>
      ),
    },
    {
      key: "role",
      header: <SortableHeader title="Role & Dept" sortKey="department" />,
      render: (emp) => (
        <div className="flex flex-col">
          <span className="font-medium">{emp.designation}</span>
          <span className="text-xs text-muted-foreground">{emp.department}</span>
        </div>
      ),
    },
    {
      key: "joiningDate",
      header: <SortableHeader title="Joined" sortKey="joiningDate" />,
      render: (emp) => (
        <span className="text-sm text-muted-foreground">
          {new Date(emp.joiningDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "status",
      header: <SortableHeader title="Status" sortKey="status" />,
      render: (emp) => <StatusBadge status={emp.status} className="whitespace-nowrap" />
    },
    {
      key: "salary",
      header: <SortableHeader title="Salary" sortKey="salary" />,
      render: (emp) => (
        <span className="font-medium text-muted-foreground">
          ${emp.salary.toLocaleString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: <div className="text-right">Actions</div>,
      render: (emp) => (
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onView?.(emp)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit?.(emp)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete?.(emp)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full">
      <DataTable 
        data={data} 
        columns={columns} 
        keyExtractor={(emp) => emp.id} 
      />
    </div>
  )
}
