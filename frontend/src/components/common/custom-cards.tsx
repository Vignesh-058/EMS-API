import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface BaseCardProps extends React.ComponentProps<typeof Card> {
  loading?: boolean
  hoverable?: boolean
}

const withBaseCard = <P extends BaseCardProps>(
  Component: React.FC<P>
) => {
  return function WrappedCard({ loading, hoverable = true, className, ...props }: P) {
    if (loading) {
      return (
        <Card className={cn(className, "overflow-hidden")}>
          <CardHeader className="gap-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      )
    }

    return (
      <Card
        className={cn(
          "transition-all duration-200",
          hoverable && "hover:shadow-card hover:-translate-y-0.5",
          className
        )}
        {...(props as any)}
      >
        <Component {...(props as P)} />
      </Card>
    )
  }
}

// 1. Basic Card
export interface BasicCardProps extends BaseCardProps {
  title: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export const BasicCard = withBaseCard(({ title, description, children, footer }: BasicCardProps) => (
  <>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    {children && <CardContent>{children}</CardContent>}
    {footer && <CardFooter>{footer}</CardFooter>}
  </>
))

// 2. Statistics Card
export interface StatCardProps extends BaseCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
}

export const StatCard = withBaseCard(({ title, value, icon, trend }: StatCardProps) => (
  <>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon && <div className="text-muted-foreground">{icon}</div>}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={cn("text-xs mt-1", trend.isPositive ? "text-success" : "text-destructive")}>
          {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          <span className="text-muted-foreground ml-1">{trend.label}</span>
        </p>
      )}
    </CardContent>
  </>
))

// 3. Profile Card
export interface ProfileCardProps extends BaseCardProps {
  name: string
  role: string
  avatarUrl?: string
  action?: React.ReactNode
}

export const ProfileCard = withBaseCard(({ name, role, avatarUrl, action }: ProfileCardProps) => (
  <CardContent className="pt-6 flex flex-col items-center text-center">
    {avatarUrl ? (
      <img src={avatarUrl} alt={name} className="size-20 rounded-full object-cover mb-4" />
    ) : (
      <div className="size-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <span className="text-xl font-bold">{name.charAt(0)}</span>
      </div>
    )}
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-sm text-muted-foreground mb-4">{role}</p>
    {action && <div>{action}</div>}
  </CardContent>
))

// 4. Action Card
export interface ActionCardProps extends BaseCardProps {
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
  icon?: React.ReactNode
}

export const ActionCard = withBaseCard(({ title, description, actionLabel, onAction, icon }: ActionCardProps) => (
  <>
    <CardHeader>
      {icon && <div className="mb-2">{icon}</div>}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button onClick={onAction} className="w-full">{actionLabel}</Button>
    </CardContent>
  </>
))

// 5. Information Card
export interface InfoCardProps extends BaseCardProps {
  title: string
  items: { label: string; value: React.ReactNode }[]
}

export const InfoCard = withBaseCard(({ title, items }: InfoCardProps) => (
  <>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <dl className="space-y-3 text-sm">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between border-b pb-2 last:border-0 last:pb-0">
            <dt className="text-muted-foreground font-medium">{item.label}</dt>
            <dd className="font-medium text-foreground text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </>
))
