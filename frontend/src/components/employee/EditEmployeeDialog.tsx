import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { EmployeeForm } from './EmployeeForm'
import { useUpdateEmployee } from '@/hooks/useUpdateEmployee'
import type { Employee } from '@/data/employees'
import type { EmployeeFormValues } from '@/schemas/employee.schema'

interface EditEmployeeDialogProps {
  employee: Employee | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditEmployeeDialog({ employee, open, onOpenChange }: EditEmployeeDialogProps) {
  const { mutate, isPending } = useUpdateEmployee(employee?.id ?? '')

  const handleSubmit = (data: EmployeeFormValues) => {
    if (!employee?.id) return
    mutate(data, {
      onSuccess: () => onOpenChange(false),
    })
  }

  if (!employee) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border shadow-lg sm:rounded-lg max-h-[90vh] overflow-y-auto" style={{ width: '95vw', maxWidth: '900px' }}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight">Edit Employee</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Update the details for{' '}
            <span className="font-semibold text-foreground">
              {employee.firstName} {employee.lastName}
            </span>
            . All fields marked with <span className="text-destructive font-medium">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Save Changes"
            loadingLabel="Saving..."
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
