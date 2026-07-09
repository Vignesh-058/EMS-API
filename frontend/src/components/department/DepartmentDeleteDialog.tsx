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
import type { Department } from "@/data/departments"

interface DepartmentDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  department: Department | null
  onConfirm: () => void
}

export function DepartmentDeleteDialog({ open, onOpenChange, department, onConfirm }: DepartmentDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle>Delete Department</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            Are you sure you want to delete the{" "}
            <span className="font-medium text-foreground">
              {department?.name}
            </span>{" "}
            department? This will also unassign all {department?.employeeCount || 0} employees currently in this division. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => {
            onConfirm()
            onOpenChange(false)
          }}>
            Delete Department
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
