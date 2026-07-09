import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DepartmentSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function DepartmentSearch({ value, onChange, className }: DepartmentSearchProps) {
  return (
    <div className={cn("relative w-full min-w-[300px] sm:max-w-md group", className)}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by name, code, or manager..."
        className="w-full bg-background pl-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
