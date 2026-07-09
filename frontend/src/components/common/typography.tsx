import * as React from "react"
import { cn } from "@/lib/utils"

export const typographyVariants = {
  display: "scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-7xl",
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  bodyLarge: "text-lg font-semibold",
  body: "leading-7 [&:not(:first-child)]:mt-6",
  small: "text-sm font-medium leading-none",
  caption: "text-sm text-muted-foreground",
}

export type TypographyVariant = keyof typeof typographyVariants

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: React.ElementType
}

export function Typography({
  className,
  variant = "body",
  as: Component,
  ...props
}: TypographyProps) {
  // Determine default element based on variant if 'as' is not provided
  const defaultElement = {
    display: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    bodyLarge: "p",
    body: "p",
    small: "small",
    caption: "p",
  }[variant] as React.ElementType

  const Comp = Component || defaultElement

  return (
    <Comp
      className={cn(typographyVariants[variant], className)}
      {...props}
    />
  )
}
