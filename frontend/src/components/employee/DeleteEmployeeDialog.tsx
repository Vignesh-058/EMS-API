import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2, AlertTriangle } from 'lucide-react'
import type { Employee } from '@/data/employees'
import { useDeleteEmployee } from '@/hooks/useDeleteEmployee'

interface DeleteEmployeeDialogProps {
  employee: Employee | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Optional: called after successful deletion (e.g. to navigate away) */
  onDeleted?: () => void
}

export function DeleteEmployeeDialog({
  employee,
  open,
  onOpenChange,
  onDeleted,
}: DeleteEmployeeDialogProps) {
  const { mutate, isPending } = useDeleteEmployee()

  const handleConfirm = () => {
    if (!employee?.id) return
    mutate(employee.id, {
      onSuccess: () => {
        onOpenChange(false)
        onDeleted?.()
      },
    })
  }

  if (!employee) return null

  return (
    <AlertDialog open={open} onOpenChange={isPending ? undefined : onOpenChange}>
      <AlertDialogContent className="bg-background border rounded-xl shadow-lg p-6" style={{ width: '95vw', maxWidth: '500px' }}>
        <AlertDialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <AlertDialogTitle className="text-xl font-bold">Delete Employee</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-4 pt-2 text-base text-left">
            <p>
              Are you sure you want to permanently delete{' '}
              <span className="font-semibold text-foreground">
                {employee.firstName} {employee.lastName}
              </span>
              ?
            </p>
            <div className="rounded-lg border bg-muted/50 p-3 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-28 shrink-0">Employee ID</span>
                <span className="font-medium text-foreground">{employee.employeeId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-28 shrink-0">Department</span>
                <span className="font-medium text-foreground">{employee.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-28 shrink-0">Designation</span>
                <span className="font-medium text-foreground">{employee.designation}</span>
              </div>
            </div>
            <p className="text-destructive/80 text-xs font-medium">
              ⚠ This action cannot be undone and will permanently remove this employee from the system.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
          <AlertDialogCancel disabled={isPending} className="w-full sm:w-auto">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleConfirm()
            }}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 min-w-[140px] w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Employee'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
