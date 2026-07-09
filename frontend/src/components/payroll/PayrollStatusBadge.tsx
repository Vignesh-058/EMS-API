import { Badge } from "@/components/ui/badge"
import type { PaymentStatus } from "@/data/payroll"

interface PayrollStatusBadgeProps {
  status: PaymentStatus
  className?: string
}

export function PayrollStatusBadge({ status, className }: PayrollStatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "default"
  
  // Custom styling for specific payroll statuses not fully covered by Shadcn default variants
  let customClass = ""

  switch (status) {
    case "Paid":
      variant = "success"
      break
    case "Pending":
      variant = "warning"
      break
    case "Processing":
      // Using a custom blue variant for processing
      variant = "secondary"
      customClass = "bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:bg-blue-900/50 dark:text-blue-400"
      break
    case "Failed":
      variant = "destructive"
      break
    case "On Hold":
      variant = "secondary"
      break
    default:
      variant = "secondary"
  }

  return (
    <Badge variant={variant} className={`${customClass} ${className || ""}`.trim()}>
      {status}
    </Badge>
  )
}
