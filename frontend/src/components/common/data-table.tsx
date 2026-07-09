import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export interface ColumnDef<T> {
  key: string
  header: React.ReactNode
  render?: (item: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  loadingSkeletonRows?: number
  emptyStateMessage?: string
  selectedRows?: Set<string | number>
  onRowClick?: (item: T) => void
  keyExtractor: (item: T) => string | number
}

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  loadingSkeletonRows = 5,
  emptyStateMessage = "No results found.",
  selectedRows,
  onRowClick,
  keyExtractor,
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border bg-surface overflow-hidden">
      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: loadingSkeletonRows }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton className="h-5 w-[80%]" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  {emptyStateMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => {
                const rowKey = keyExtractor(item)
                const isSelected = selectedRows?.has(rowKey)

                return (
                  <TableRow
                    key={rowKey}
                    data-state={isSelected ? "selected" : undefined}
                    className={onRowClick ? "cursor-pointer" : undefined}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render ? col.render(item) : (item as any)[col.key] as React.ReactNode}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
