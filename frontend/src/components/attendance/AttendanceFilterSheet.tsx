import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export interface AttendanceFilterState {
  status: string
  department: string
  dateFrom: string
  dateTo: string
}

export const initialAttendanceFilterState: AttendanceFilterState = {
  status: "all",
  department: "all",
  dateFrom: "",
  dateTo: ""
}

interface AttendanceFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: AttendanceFilterState
  onFilterChange: (filters: AttendanceFilterState) => void
  onReset: () => void
}

export function AttendanceFilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onReset
}: AttendanceFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter Attendance</SheetTitle>
          <SheetDescription>
            Apply filters to narrow down the attendance records.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label>Status</Label>
            <Select 
              value={filters.status} 
              onValueChange={(val) => onFilterChange({ ...filters, status: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
                <SelectItem value="Work From Home">Work From Home</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Department</Label>
            <Select 
              value={filters.department} 
              onValueChange={(val) => onFilterChange({ ...filters, department: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Department</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label>Date From</Label>
              <Input 
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>Date To</Label>
              <Input 
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={onReset}>
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
