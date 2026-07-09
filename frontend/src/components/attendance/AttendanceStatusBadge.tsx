import { Badge } from "@/components/ui/badge"
import type { AttendanceStatus } from "@/data/attendance"

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus
  className?: string
}

export function AttendanceStatusBadge({ status, className }: AttendanceStatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "default"
  
  switch (status) {
    case "Present":
    case "Work From Home":
      variant = "success"
      break
    case "Late":
    case "Half Day":
      variant = "warning"
      break
    case "On Leave":
    case "Holiday":
      variant = "outline"
      break
    case "Absent":
      variant = "destructive"
      break
    default:
      variant = "secondary"
  }

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  )
}
