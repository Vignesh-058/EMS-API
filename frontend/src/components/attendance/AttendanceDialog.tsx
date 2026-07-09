import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { AttendanceForm, type AttendanceFormValues } from "./AttendanceForm"

interface AttendanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialValues?: Partial<AttendanceFormValues>
  onSave: (data: AttendanceFormValues) => void
}

export function AttendanceDialog({
  open,
  onOpenChange,
  initialValues,
  onSave
}: AttendanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialValues?.employeeId ? "Edit Attendance" : "Mark Attendance"}</DialogTitle>
          <DialogDescription>
            {initialValues?.employeeId 
              ? "Update the attendance details for this employee."
              : "Log a new daily attendance record for an employee."}
          </DialogDescription>
        </DialogHeader>
        <AttendanceForm
          initialValues={initialValues}
          onSubmit={(data) => {
            onSave(data)
            onOpenChange(false)
          }}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
