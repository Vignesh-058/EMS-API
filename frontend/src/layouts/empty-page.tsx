import * as React from "react"
import { FolderSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageContainer } from "./page-container"

export interface EmptyPageProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ElementType
}

export function EmptyPage({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = FolderSearch,
}: EmptyPageProps) {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-in fade-in-50 duration-500">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 mb-6">
          <Icon className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        <p className="mt-3 mb-8 max-w-md text-base text-muted-foreground">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button size="lg" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </PageContainer>
  )
}
