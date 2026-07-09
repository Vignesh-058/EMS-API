import * as React from "react"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { cn } from "@/lib/utils"

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  breadcrumb?: { label: string; href?: string }[]
  actions?: React.ReactNode
  children: React.ReactNode
}

export function PageContainer({
  title,
  subtitle,
  breadcrumb,
  actions,
  children,
  className,
  ...props
}: PageContainerProps) {
  return (
    <div className={cn("flex flex-col gap-6 animate-in fade-in-50 duration-500", className)} {...props}>
      {/* Header Slot (Can be overridden by a standalone PageHeader component if needed) */}
      {(title || subtitle || breadcrumb || actions) && (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            {breadcrumb && (
              <div className="mb-1">
                <BreadcrumbNav items={breadcrumb} />
              </div>
            )}
            <div>
              {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
          </div>
          {actions && (
            <div className="flex items-center gap-2 shrink-0 md:mt-0 mt-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content Slot */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
