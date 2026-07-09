import { PageContainer } from "@/layouts/page-container"
import { Skeleton } from "@/components/common/loading"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ResponsiveGrid } from "@/components/common/responsive-grid"

export function DashboardSkeleton() {
  return (
    <PageContainer
      title="Dashboard"
      subtitle="Overview of your organization's human resources."
      breadcrumb={[{ label: "Dashboard" }]}
    >
      <div className="flex flex-col gap-6">
        {/* Welcome Section Skeleton */}
        <div className="h-40 w-full animate-pulse rounded-xl bg-muted/50" />

        {/* Dashboard Stats Skeleton */}
        <ResponsiveGrid columns={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-8 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </ResponsiveGrid>

        {/* Quick Actions Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-4 shadow-sm">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Charts Row 1 Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <Card className="col-span-1 shadow-sm md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardHeader>
              <Skeleton className="mb-1 h-6 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
          <Card className="col-span-1 shadow-sm">
            <CardHeader>
              <Skeleton className="mb-1 h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mx-auto h-[300px] w-[300px] rounded-full" />
            </CardContent>
          </Card>
        </div>

        {/* Table & Timeline Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <Card className="col-span-1 shadow-sm md:col-span-2 lg:col-span-3 xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Skeleton className="mb-1 h-6 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="hidden h-8 w-24 sm:block" />
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-4">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1 shadow-sm">
            <CardHeader>
              <Skeleton className="mb-1 h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="mt-2 space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                    <div className="w-full space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  )
}
