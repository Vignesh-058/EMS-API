import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DepartmentForm } from "./DepartmentForm"
import type { Department } from "@/data/departments"

import type { DepartmentFormValues } from "./DepartmentForm"

interface DepartmentDialogProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  department?: Department | null
  onSave?: (data: DepartmentFormValues) => void
}

export function DepartmentDialog({ children, open, onOpenChange, department, onSave }: DepartmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{department ? "Edit Department" : "Add New Department"}</DialogTitle>
          <DialogDescription>
            {department ? "Update the department's details below." : "Fill out the form below to create a new department."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <DepartmentForm 
            initialData={department} 
            onSubmit={(data) => {
              onSave?.(data)
              onOpenChange?.(false)
            }}
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="department-form">
            {department ? "Save Changes" : "Create Department"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
