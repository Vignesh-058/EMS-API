import { useParams, useNavigate } from "react-router-dom"
import { PageContainer } from "@/layouts/page-container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Mail, Printer } from "lucide-react"
import { mockPayrollRecords } from "@/data/payroll"
import { PayslipPreview } from "@/components/payroll/PayslipPreview"
import { toast } from "sonner"

export default function PayrollDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const record = mockPayrollRecords.find(r => r.id === id)

  if (!record) {
    return (
      <PageContainer title="Record Not Found">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-muted-foreground">The payroll record you are looking for does not exist.</p>
          <Button onClick={() => navigate("/payroll")}>Back to Payroll</Button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Payroll Details"
      subtitle={`Viewing payroll information for ${record.employeeName}`}
      breadcrumb={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Payroll", href: "/payroll" },
        { label: "Details" },
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/payroll")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button variant="outline" onClick={() => toast.success("Payslip emailed successfully")}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" onClick={() => toast.success("Printing payslip...")}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={() => toast.success("Payslip downloaded successfully")}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      }
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* Render the Payslip Preview directly as the details page layout since it explicitly requires all the fields */}
        <div className="bg-muted/30 p-4 sm:p-8 rounded-xl border">
          <PayslipPreview record={record} />
        </div>
      </div>
    </PageContainer>
  )
}
