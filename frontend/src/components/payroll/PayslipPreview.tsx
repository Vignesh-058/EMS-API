import { Building2 } from "lucide-react"
import type { PayrollRecord } from "@/data/payroll"

interface PayslipPreviewProps {
  record: PayrollRecord
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function PayslipPreview({ record }: PayslipPreviewProps) {
  const currentMonth = "June 2026" // Mock dynamic generation
  
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-zinc-950 border text-zinc-950 dark:text-zinc-50 p-8 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-lg">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Enterprise Corp Ltd.</h1>
            <p className="text-sm text-muted-foreground">123 Business Avenue, Tech District</p>
            <p className="text-sm text-muted-foreground">San Francisco, CA 94107</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-light tracking-tight uppercase text-zinc-400">Payslip</h2>
          <p className="font-medium mt-1">Pay Period: {currentMonth}</p>
        </div>
      </div>

      {/* Employee Info */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-4 py-6 border-b">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase font-medium">Employee Name</p>
          <p className="font-medium">{record.employeeName}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase font-medium">Employee ID</p>
          <p className="font-medium">{record.employeeId}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase font-medium">Department</p>
          <p className="font-medium">{record.department}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase font-medium">Designation</p>
          <p className="font-medium">{record.designation}</p>
        </div>
      </div>

      {/* Financials Grid */}
      <div className="grid grid-cols-2 gap-8 py-8">
        
        {/* Earnings */}
        <div>
          <h3 className="font-semibold border-b pb-2 mb-4 uppercase text-sm tracking-wider">Earnings</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Basic Salary</span>
              <span className="font-medium">{formatCurrency(record.basicSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Bonus</span>
              <span className="font-medium">{formatCurrency(record.bonus)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Allowances</span>
              <span className="font-medium">{formatCurrency(record.allowance)}</span>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div>
          <h3 className="font-semibold border-b pb-2 mb-4 uppercase text-sm tracking-wider">Deductions</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-destructive">
              <span className="text-sm">Income Tax</span>
              <span className="font-medium">{formatCurrency(record.tax)}</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span className="text-sm">Provident Fund (PF)</span>
              <span className="font-medium">{formatCurrency(record.pf)}</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span className="text-sm">Insurance</span>
              <span className="font-medium">{formatCurrency(record.insurance)}</span>
            </div>
            {record.otherDeductions > 0 && (
              <div className="flex justify-between text-destructive">
                <span className="text-sm">Other Deductions</span>
                <span className="font-medium">{formatCurrency(record.otherDeductions)}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-8 py-4 border-t">
        <div className="flex justify-between font-semibold">
          <span>Gross Earnings</span>
          <span>{formatCurrency(record.basicSalary + record.bonus + record.allowance)}</span>
        </div>
        <div className="flex justify-between font-semibold text-destructive">
          <span>Total Deductions</span>
          <span>{formatCurrency(record.tax + record.pf + record.insurance + record.otherDeductions)}</span>
        </div>
      </div>

      {/* Net Pay Highlight */}
      <div className="mt-8 bg-zinc-50 dark:bg-zinc-900 border rounded-lg p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Net Salary Payable</p>
          <p className="text-4xl font-bold mt-1 text-foreground">{formatCurrency(record.netSalary)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">Paid to Account</p>
          <p className="font-medium">{record.bankName}</p>
          <p className="text-sm text-muted-foreground font-mono">{record.accountNumber}</p>
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-16 flex justify-between px-8 text-center">
        <div>
          <div className="border-t w-48 mx-auto border-zinc-300 dark:border-zinc-700 pt-2">
            <p className="text-sm font-medium">Employer Signature</p>
          </div>
        </div>
        <div>
          <div className="border-t w-48 mx-auto border-zinc-300 dark:border-zinc-700 pt-2">
            <p className="text-sm font-medium">Employee Signature</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-16 text-center text-xs text-muted-foreground">
        <p>This is a computer generated document. No signature is required.</p>
      </div>

    </div>
  )
}
