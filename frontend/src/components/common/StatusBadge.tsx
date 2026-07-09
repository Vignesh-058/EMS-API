import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" = "default"
  
  switch (status) {
    case "Active":
      variant = "success"
      break
    case "Inactive":
      variant = "secondary"
      break
    case "New":
    case "On Leave":
      variant = "warning"
      break
    case "Probation":
    case "Archived":
      variant = "outline"
      break
    case "Terminated":
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
