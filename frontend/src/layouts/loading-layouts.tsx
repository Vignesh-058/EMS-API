import { Skeleton } from "@/components/common/loading"
import { PageContainer } from "./page-container"

export function SidebarSkeleton() {
  return (
    <div className="flex h-full w-full flex-col bg-surface border-r">
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="ml-2 h-5 w-24" />
      </div>
      <div className="flex-1 overflow-auto py-4 px-2 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
      <div className="mt-auto border-t p-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}

export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b bg-surface px-4 shadow-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Skeleton className="hidden h-5 w-32 md:block" />
        <Skeleton className="h-8 w-8 md:hidden" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="hidden h-9 w-40 sm:block lg:w-64" />
        <div className="flex items-center gap-4 border-r pr-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="ml-1 h-8 w-8 rounded-full" />
      </div>
    </header>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="space-y-2 p-6 pt-0">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Skeleton className="mb-2 h-4 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      
      <div className="mt-8 space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </PageContainer>
  )
}
