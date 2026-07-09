import { FileText, Download, FileSpreadsheet, FileIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const reports = [
  { id: 1, title: "Monthly Payroll Report", description: "Complete breakdown of all salaries paid in the current month." },
  { id: 2, title: "Department Payroll Report", description: "Expenditure grouped by individual departments." },
  { id: 3, title: "Salary Distribution Report", description: "Analysis of pay bands and compensation equity." },
  { id: 4, title: "Tax Deduction Report", description: "Summary of all income taxes withheld for compliance." },
  { id: 5, title: "Payment Status Report", description: "List of all pending, processing, and failed transactions." },
]

export function PayrollReports() {
  const handleExport = (type: string, title: string) => {
    toast.success(`Exporting ${title} as ${type}...`)
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <div key={report.id} className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="font-semibold">{report.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              {report.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-auto border-t pt-4">
            <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleExport('PDF', report.title)}>
              <FileIcon className="mr-2 h-3 w-3 text-destructive" />
              PDF
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleExport('Excel', report.title)}>
              <FileSpreadsheet className="mr-2 h-3 w-3 text-success" />
              Excel
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => handleExport('CSV', report.title)}>
              <Download className="mr-2 h-3 w-3" />
              CSV
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
