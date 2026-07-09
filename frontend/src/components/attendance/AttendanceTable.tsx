import { DataTable, type ColumnDef } from "@/components/common/data-table"
import type { AttendanceRecord } from "@/data/attendance"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { AttendanceStatusBadge } from "./AttendanceStatusBadge"

interface AttendanceTableProps {
  data: AttendanceRecord[]
  sortConfig?: { key: string; direction: "asc" | "desc" } | null
  onSort?: (key: string) => void
  onEdit?: (record: AttendanceRecord) => void
  onDelete?: (record: AttendanceRecord) => void
}

export function AttendanceTable({ data, sortConfig, onSort, onEdit, onDelete }: AttendanceTableProps) {
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

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      key: "employee",
      header: <SortableHeader title="Employee" sortKey="employeeName" />,
      render: (record) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 font-medium text-primary">{record.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{record.employeeName}</span>
            <span className="text-xs text-muted-foreground">{record.employeeId}</span>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: <SortableHeader title="Department" sortKey="department" />,
      render: (record) => (
        <span className="text-sm font-medium">{record.department}</span>
      ),
    },
    {
      key: "checkIn",
      header: "Check In",
      render: (record) => (
        <span className="text-sm text-muted-foreground">
          {record.checkIn || "--:--"}
        </span>
      ),
    },
    {
      key: "checkOut",
      header: "Check Out",
      render: (record) => (
        <span className="text-sm text-muted-foreground">
          {record.checkOut || "--:--"}
        </span>
      ),
    },
    {
      key: "workingHours",
      header: "Working Hours",
      render: (record) => (
        <span className="font-medium text-foreground">
          {record.workingHours || "--"}
        </span>
      ),
    },
    {
      key: "status",
      header: <SortableHeader title="Status" sortKey="status" />,
      render: (record) => <AttendanceStatusBadge status={record.status} className="whitespace-nowrap" />
    },
    {
      key: "location",
      header: "Location",
      render: (record) => (
        <span className="text-sm text-muted-foreground">
          {record.location || "--"}
        </span>
      ),
    },
    {
      key: "actions",
      header: <div className="text-right">Actions</div>,
      render: (record) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit?.(record)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete?.(record)}
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
        keyExtractor={(record) => record.id} 
      />
    </div>
  )
}
