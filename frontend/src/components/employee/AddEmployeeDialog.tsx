import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EmployeeForm } from './EmployeeForm'
import { useCreateEmployee } from '@/hooks/useCreateEmployee'
import type { EmployeeFormValues } from '@/schemas/employee.schema'

interface AddEmployeeDialogProps {
  children?: React.ReactNode
}

export function AddEmployeeDialog({ children }: AddEmployeeDialogProps) {
  const [open, setOpen] = React.useState(false)
  const { mutate, isPending } = useCreateEmployee()

  const handleSubmit = (data: EmployeeFormValues) => {
    mutate(data, {
      onSuccess: () => setOpen(false),
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="bg-background border shadow-lg sm:rounded-lg max-h-[90vh] overflow-y-auto" style={{ width: '95vw', maxWidth: '900px' }}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight">Add New Employee</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Fill out the form below to create a new employee record. All fields marked with{' '}
            <span className="text-destructive font-medium">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <EmployeeForm
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Create Employee"
            loadingLabel="Creating..."
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
