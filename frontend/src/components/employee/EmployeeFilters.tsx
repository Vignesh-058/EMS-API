import { Filter, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export interface FilterState {
  department: string
  designation: string
  status: string
  gender: string
  joiningDate: string
  minSalary: string
  maxSalary: string
}

export const initialFilterState: FilterState = {
  department: "",
  designation: "",
  status: "",
  gender: "",
  joiningDate: "",
  minSalary: "",
  maxSalary: "",
}

interface EmployeeFiltersProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  onReset: () => void
}

export function EmployeeFilters({ filters, setFilters, onReset }: EmployeeFiltersProps) {
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative w-full transition-all hover:bg-muted sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Filter Employees</SheetTitle>
            <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-muted-foreground hover:text-foreground">
              <RotateCcw className="mr-2 h-3 w-3" />
              Reset
            </Button>
          </div>
          <SheetDescription>
            Refine the employee list by multiple criteria.
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        <div className="flex flex-1 flex-col gap-6">
          {/* Department */}
          <div className="space-y-2">
            <Label>Department</Label>
            <Select value={filters.department} onValueChange={(val) => setFilters({ ...filters, department: val })}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Human Resources">Human Resources</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={filters.status} onValueChange={(val) => setFilters({ ...filters, status: val })}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Probation">Probation</SelectItem>
                <SelectItem value="Terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={filters.gender} onValueChange={(val) => setFilters({ ...filters, gender: val })}>
              <SelectTrigger>
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Joining Date */}
          <div className="space-y-2">
            <Label>Joining Date (From)</Label>
            <Input 
              type="date" 
              value={filters.joiningDate}
              onChange={(e) => setFilters({ ...filters, joiningDate: e.target.value })}
            />
          </div>

          {/* Salary Range */}
          <div className="space-y-2">
            <Label>Salary Range (Annual)</Label>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                placeholder="Min" 
                value={filters.minSalary}
                onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
              />
              <span className="text-muted-foreground">-</span>
              <Input 
                type="number" 
                placeholder="Max" 
                value={filters.maxSalary}
                onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button className="w-full">Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
