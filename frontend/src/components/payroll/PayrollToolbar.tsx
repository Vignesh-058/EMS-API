import { Button } from "@/components/ui/button"
import { Filter, Download, DollarSign } from "lucide-react"
import { PayrollSearch } from "./PayrollSearch"

interface PayrollToolbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onFilterClick: () => void
  onExportClick: () => void
  onGenerateClick: () => void
  activeFiltersCount?: number
}

export function PayrollToolbar({
  searchQuery,
  onSearchChange,
  onFilterClick,
  onExportClick,
  onGenerateClick,
  activeFiltersCount = 0
}: PayrollToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PayrollSearch value={searchQuery} onChange={onSearchChange} className="w-full sm:w-72 md:w-96" />
      
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <Button 
          variant="outline" 
          className="bg-background shadow-sm flex-1 sm:flex-none"
          onClick={onFilterClick}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
        <Button 
          variant="outline" 
          className="bg-background shadow-sm flex-1 sm:flex-none"
          onClick={onExportClick}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button 
          className="flex-1 sm:flex-none"
          onClick={onGenerateClick}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Generate Payroll
        </Button>
      </div>
    </div>
  )
}
