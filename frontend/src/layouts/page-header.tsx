import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  primaryActionLabel?: string
  primaryActionOnClick?: () => void
  primaryActionIcon?: React.ElementType
  secondaryActionLabel?: string
  secondaryActionOnClick?: () => void
  secondaryActionIcon?: React.ElementType
  customActions?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  primaryActionLabel,
  primaryActionOnClick,
  primaryActionIcon: PrimaryIcon,
  secondaryActionLabel,
  secondaryActionOnClick,
  secondaryActionIcon: SecondaryIcon,
  customActions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 md:flex-row md:items-center md:justify-between", className)} {...props}>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      {(primaryActionLabel || secondaryActionLabel || customActions) && (
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {customActions}
          {secondaryActionLabel && (
            <Button variant="outline" onClick={secondaryActionOnClick}>
              {SecondaryIcon && <SecondaryIcon className="mr-2 h-4 w-4" aria-hidden="true" />}
              {secondaryActionLabel}
            </Button>
          )}
          {primaryActionLabel && (
            <Button onClick={primaryActionOnClick}>
              {PrimaryIcon && <PrimaryIcon className="mr-2 h-4 w-4" aria-hidden="true" />}
              {primaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
