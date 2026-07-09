import * as React from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType
  title?: string
  message: string
  retryLabel?: string
  onRetry?: () => void
}

export function ErrorState({
  icon: Icon = AlertTriangle,
  title = "Something went wrong",
  message,
  retryLabel = "Try Again",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[250px] flex-col items-center justify-center rounded-md border border-destructive/20 bg-destructive/5 p-8 text-center animate-in fade-in-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
        <Icon className="h-8 w-8 text-destructive" aria-hidden="true" />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-destructive">{title}</h3>
      <p className="mt-2 mb-6 max-w-sm text-sm text-muted-foreground">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-2 group">
          <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-90" aria-hidden="true" />
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
