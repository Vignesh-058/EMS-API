import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { mockPayrollRecords } from "@/data/payroll"
import { PayslipPreview } from "./PayslipPreview"

interface GeneratePayslipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: () => void
}

export function GeneratePayslipDialog({ open, onOpenChange, onGenerate }: GeneratePayslipDialogProps) {
  const [selectedEmployee, setSelectedEmployee] = React.useState<string>("")
  const [showPreview, setShowPreview] = React.useState(false)

  const activeRecord = mockPayrollRecords.find(r => r.id === selectedEmployee)

  // Reset internal state when dialog closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSelectedEmployee("")
        setShowPreview(false)
      }, 300)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={showPreview ? "max-w-4xl" : "sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>Generate Payslip</DialogTitle>
          <DialogDescription>
            Select an employee and billing cycle to generate a PDF payslip.
          </DialogDescription>
        </DialogHeader>
        
        {!showPreview ? (
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label>Employee</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockPayrollRecords.map(rec => (
                    <SelectItem key={rec.id} value={rec.id}>
                      {rec.employeeName} ({rec.employeeId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label>Month</Label>
                <Select defaultValue="06">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="05">May</SelectItem>
                    <SelectItem value="06">June</SelectItem>
                    <SelectItem value="07">July</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label>Year</Label>
                <Select defaultValue="2026">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] overflow-y-auto rounded-md border p-4 bg-muted/20">
            {activeRecord && <PayslipPreview record={activeRecord} />}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {!showPreview ? (
            <Button 
              disabled={!selectedEmployee} 
              onClick={() => setShowPreview(true)}
              variant="secondary"
            >
              Preview Document
            </Button>
          ) : (
            <Button onClick={() => {
              onGenerate()
              onOpenChange(false)
            }}>
              Generate PDF
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
