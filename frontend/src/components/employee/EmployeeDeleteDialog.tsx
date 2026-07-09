import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import type { Employee } from "@/data/employees"

interface EmployeeDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee | null
  onConfirm: () => void
}

export function EmployeeDeleteDialog({ open, onOpenChange, employee, onConfirm }: EmployeeDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle>Delete Employee</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {employee?.firstName} {employee?.lastName}
            </span>
            ? This action cannot be undone and will permanently remove this employee from the system.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => {
            onConfirm()
          }}>
            Delete Employee
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
