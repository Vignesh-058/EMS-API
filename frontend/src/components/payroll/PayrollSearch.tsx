import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PayrollSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function PayrollSearch({ value, onChange, className }: PayrollSearchProps) {
  return (
    <div className={cn("relative flex w-full max-w-sm items-center", className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search employees, ID, department..."
        className="pl-9 pr-9 bg-background shadow-sm h-10"
      />
      {value.length > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
