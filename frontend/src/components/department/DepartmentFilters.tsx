import { Filter } from "lucide-react"
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

export interface DepartmentFilterState {
  status: string
  location: string
  manager: string
  minEmployees: string
}

export const initialDepartmentFilterState: DepartmentFilterState = {
  status: "all",
  location: "all",
  manager: "",
  minEmployees: "",
}

interface DepartmentFiltersProps {
  filters: DepartmentFilterState
  setFilters: (filters: DepartmentFilterState) => void
}

export function DepartmentFilters({ filters, setFilters }: DepartmentFiltersProps) {
  const activeCount = Object.entries(filters).filter(([k, v]) => {
    if (k === "status" || k === "location") return v !== "all"
    return v !== ""
  }).length

  const handleReset = () => {
    setFilters(initialDepartmentFilterState)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filter Departments</SheetTitle>
          <SheetDescription>
            Narrow down the department list using the criteria below.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={filters.status} 
                onValueChange={(v) => setFilters({ ...filters, status: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select 
                value={filters.location} 
                onValueChange={(v) => setFilters({ ...filters, location: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York, USA">New York, USA</SelectItem>
                  <SelectItem value="San Francisco, USA">San Francisco, USA</SelectItem>
                  <SelectItem value="Chicago, USA">Chicago, USA</SelectItem>
                  <SelectItem value="London, UK">London, UK</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Manager Name</Label>
              <Input 
                placeholder="Search by manager..." 
                value={filters.manager}
                onChange={(e) => setFilters({ ...filters, manager: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Minimum Employees</Label>
              <Input 
                type="number"
                placeholder="e.g. 10" 
                value={filters.minEmployees}
                onChange={(e) => setFilters({ ...filters, minEmployees: e.target.value })}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button variant="outline" className="w-full" onClick={handleReset}>
              Reset Filters
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button className="w-full">Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
