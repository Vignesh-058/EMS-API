import * as React from "react"
import { FileX2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon = FileX2,
  title,
  description,
  actionLabel,
  onAction,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[300px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 mb-6 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action ? (
        action
      ) : actionLabel && onAction ? (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
