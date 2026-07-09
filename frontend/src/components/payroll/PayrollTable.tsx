import { DataTable, type ColumnDef } from "@/components/common/data-table"
import type { PayrollRecord } from "@/data/payroll"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, Download, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { PayrollStatusBadge } from "./PayrollStatusBadge"

interface PayrollTableProps {
  data: PayrollRecord[]
  sortConfig?: { key: string; direction: "asc" | "desc" } | null
  onSort?: (key: string) => void
  onView?: (record: PayrollRecord) => void
  onDownload?: (record: PayrollRecord) => void
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function PayrollTable({ data, sortConfig, onSort, onView, onDownload }: PayrollTableProps) {
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

  const columns: ColumnDef<PayrollRecord>[] = [
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
        <div className="flex flex-col">
          <span className="text-sm font-medium">{record.department}</span>
          <span className="text-xs text-muted-foreground">{record.designation}</span>
        </div>
      ),
    },
    {
      key: "basicSalary",
      header: <SortableHeader title="Basic Salary" sortKey="basicSalary" />,
      render: (record) => (
        <span className="text-sm">{formatCurrency(record.basicSalary)}</span>
      ),
    },
    {
      key: "allowances",
      header: "Allowances",
      render: (record) => (
        <span className="text-sm text-success">
          +{formatCurrency(record.bonus + record.allowance)}
        </span>
      ),
    },
    {
      key: "deductions",
      header: "Deductions",
      render: (record) => (
        <span className="text-sm text-destructive">
          -{formatCurrency(record.tax + record.pf + record.insurance + record.otherDeductions)}
        </span>
      ),
    },
    {
      key: "netSalary",
      header: <SortableHeader title="Net Salary" sortKey="netSalary" />,
      render: (record) => (
        <span className="font-bold text-foreground">
          {formatCurrency(record.netSalary)}
        </span>
      ),
    },
    {
      key: "status",
      header: <SortableHeader title="Status" sortKey="paymentStatus" />,
      render: (record) => <PayrollStatusBadge status={record.paymentStatus} className="whitespace-nowrap" />
    },
    {
      key: "paymentDate",
      header: <SortableHeader title="Payment Date" sortKey="paymentDate" />,
      render: (record) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {record.paymentDate || "Pending"}
        </span>
      ),
    },
    {
      key: "actions",
      header: <div className="text-right">Actions</div>,
      render: (record) => (
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onView?.(record)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onDownload?.(record)}
          >
            <Download className="h-4 w-4" />
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
