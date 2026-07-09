import { StatusBadge } from "@/components/common/StatusBadge"
import { useNavigate } from "react-router-dom"
import { DataTable, type ColumnDef } from "@/components/common/data-table"
import type { Department } from "@/data/departments"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface DepartmentTableProps {
  data: Department[]
  sortConfig?: { key: string; direction: "asc" | "desc" } | null
  onSort?: (key: string) => void
  onEdit?: (department: Department) => void
  onDelete?: (department: Department) => void
}

export function DepartmentTable({ data, sortConfig, onSort, onEdit, onDelete }: DepartmentTableProps) {
  const navigate = useNavigate()

  const SortableHeader = ({ title, sortKey }: { title: string, sortKey: string }) => {
    const isActive = sortConfig?.key === sortKey
    return (
      <Button 
        variant="ghost" 
        onClick={() => onSort?.(sortKey)}
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

  const columns: ColumnDef<Department>[] = [
    {
      key: "name",
      header: <SortableHeader title="Department Name" sortKey="name" />,
      render: (dept) => (
        <span className="font-medium text-foreground">{dept.name}</span>
      ),
    },
    {
      key: "code",
      header: "Code",
      render: (dept) => (
        <span className="font-mono text-xs font-medium text-muted-foreground">{dept.code}</span>
      ),
    },
    {
      key: "manager",
      header: <SortableHeader title="Manager" sortKey="managerName" />,
      render: (dept) => (
        <span className="text-sm">{dept.managerName}</span>
      ),
    },
    {
      key: "employeeCount",
      header: <SortableHeader title="Employees" sortKey="employeeCount" />,
      render: (dept) => (
        <span className="text-sm font-medium">{dept.employeeCount}</span>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (dept) => (
        <span className="text-sm text-muted-foreground">{dept.location}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (dept) => <StatusBadge status={dept.status} className="whitespace-nowrap" />
    },
    {
      key: "createdAt",
      header: <SortableHeader title="Created Date" sortKey="createdAt" />,
      render: (dept) => (
        <span className="text-sm text-muted-foreground">
          {new Date(dept.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "actions",
      header: <div className="text-right">Actions</div>,
      render: (dept) => (
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => navigate(`/departments/${dept.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit?.(dept)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete?.(dept)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }
  ]

  return (
    <div className="w-full">
      <DataTable 
        data={data} 
        columns={columns} 
        keyExtractor={(dept) => dept.id} 
      />
    </div>
  )
}
