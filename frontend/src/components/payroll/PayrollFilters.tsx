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

export interface PayrollFilterState {
  department: string
  designation: string
  paymentStatus: string
  paymentMonth: string
  paymentYear: string
}

export const initialPayrollFilterState: PayrollFilterState = {
  department: "all",
  designation: "all",
  paymentStatus: "all",
  paymentMonth: "all",
  paymentYear: "all"
}

interface PayrollFiltersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: PayrollFilterState
  onFilterChange: (filters: PayrollFilterState) => void
  onReset: () => void
}

export function PayrollFilters({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onReset
}: PayrollFiltersProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Narrow down the payroll records.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">
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

          <div className="flex flex-col gap-3">
            <Label>Payment Status</Label>
            <Select 
              value={filters.paymentStatus} 
              onValueChange={(val) => onFilterChange({ ...filters, paymentStatus: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label>Month</Label>
              <Select 
                value={filters.paymentMonth} 
                onValueChange={(val) => onFilterChange({ ...filters, paymentMonth: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Month</SelectItem>
                  <SelectItem value="01">January</SelectItem>
                  <SelectItem value="02">February</SelectItem>
                  <SelectItem value="03">March</SelectItem>
                  <SelectItem value="04">April</SelectItem>
                  <SelectItem value="05">May</SelectItem>
                  <SelectItem value="06">June</SelectItem>
                  <SelectItem value="07">July</SelectItem>
                  <SelectItem value="08">August</SelectItem>
                  <SelectItem value="09">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Year</Label>
              <Select 
                value={filters.paymentYear} 
                onValueChange={(val) => onFilterChange({ ...filters, paymentYear: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Year</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
