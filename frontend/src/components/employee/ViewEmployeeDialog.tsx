import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { Employee } from '@/data/employees'

interface ViewEmployeeDialogProps {
  employee: Employee | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewEmployeeDialog({ employee, open, onOpenChange }: ViewEmployeeDialogProps) {
  if (!employee) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border shadow-lg sm:rounded-lg max-h-[90vh] overflow-y-auto" style={{ width: '95vw', maxWidth: '600px' }}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight">Employee Details</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Detailed information for{' '}
            <span className="font-semibold text-foreground">
              {employee.firstName} {employee.lastName}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-xl font-medium text-primary">
                {employee.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-foreground">{employee.firstName} {employee.lastName}</h2>
              <p className="text-muted-foreground">{employee.designation}</p>
              <div className="mt-2">
                <StatusBadge status={employee.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Employee ID</span>
              <span className="text-base text-foreground font-medium">{employee.employeeId}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Department</span>
              <span className="text-base text-foreground font-medium">{employee.department}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Email Address</span>
              <span className="text-base text-foreground font-medium">{employee.email}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Phone Number</span>
              <span className="text-base text-foreground font-medium">{employee.phone}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Joining Date</span>
              <span className="text-base text-foreground font-medium">
                {new Date(employee.joiningDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm font-medium text-muted-foreground">Salary</span>
              <span className="text-base text-foreground font-medium">
                ${employee.salary.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col space-y-1 sm:col-span-2">
              <span className="text-sm font-medium text-muted-foreground">Address</span>
              <span className="text-base text-foreground font-medium">{employee.address}</span>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
