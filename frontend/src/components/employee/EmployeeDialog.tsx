import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmployeeForm } from "./EmployeeForm"
import type { Employee } from "@/data/employees"

interface EmployeeDialogProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  employee?: Employee | null
}

export function EmployeeDialog({ children, open, onOpenChange, employee }: EmployeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
          <DialogDescription>
            {employee ? "Update the employee's details below." : "Fill out the form below to create a new employee record."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <EmployeeForm
            onSubmit={(data) => {
              console.log('EmployeeDialog submit (use AddEmployeeDialog or EditEmployeeDialog instead)', data)
              onOpenChange?.(false)
            }}
            onCancel={() => onOpenChange?.(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
