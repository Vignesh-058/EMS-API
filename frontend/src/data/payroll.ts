export type PaymentStatus = "Paid" | "Pending" | "Processing" | "Failed" | "On Hold"

export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  department: string
  designation: string
  basicSalary: number
  bonus: number
  allowance: number
  tax: number
  pf: number
  insurance: number
  otherDeductions: number
  netSalary: number
  paymentStatus: PaymentStatus
  paymentDate: string | null
  bankName: string
  accountNumber: string // masked
}

export const mockPayrollRecords: PayrollRecord[] = [
  {
    id: "pay-1",
    employeeId: "EMP-001",
    employeeName: "Sarah Jenkins",
    avatar: "SJ",
    department: "Engineering",
    designation: "Senior Frontend Developer",
    basicSalary: 8500,
    bonus: 500,
    allowance: 300,
    tax: 1200,
    pf: 425,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 7525,
    paymentStatus: "Paid",
    paymentDate: "2026-06-30",
    bankName: "Chase Bank",
    accountNumber: "**** **** **** 4598"
  },
  {
    id: "pay-2",
    employeeId: "EMP-002",
    employeeName: "Michael Chen",
    avatar: "MC",
    department: "Product",
    designation: "Product Manager",
    basicSalary: 9200,
    bonus: 1000,
    allowance: 400,
    tax: 1500,
    pf: 460,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 8490,
    paymentStatus: "Processing",
    paymentDate: null,
    bankName: "Bank of America",
    accountNumber: "**** **** **** 1122"
  },
  {
    id: "pay-3",
    employeeId: "EMP-003",
    employeeName: "Emily Rodriguez",
    avatar: "ER",
    department: "Human Resources",
    designation: "HR Director",
    basicSalary: 7800,
    bonus: 0,
    allowance: 250,
    tax: 950,
    pf: 390,
    insurance: 150,
    otherDeductions: 50,
    netSalary: 6510,
    paymentStatus: "Pending",
    paymentDate: null,
    bankName: "Wells Fargo",
    accountNumber: "**** **** **** 8876"
  },
  {
    id: "pay-4",
    employeeId: "EMP-004",
    employeeName: "David Kim",
    avatar: "DK",
    department: "Design",
    designation: "Lead UI Designer",
    basicSalary: 8100,
    bonus: 200,
    allowance: 300,
    tax: 1100,
    pf: 405,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 6945,
    paymentStatus: "Failed",
    paymentDate: null,
    bankName: "Citibank",
    accountNumber: "**** **** **** 3344"
  },
  {
    id: "pay-5",
    employeeId: "EMP-005",
    employeeName: "James Wilson",
    avatar: "JW",
    department: "Engineering",
    designation: "Backend Developer",
    basicSalary: 7500,
    bonus: 0,
    allowance: 200,
    tax: 900,
    pf: 375,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 6275,
    paymentStatus: "Paid",
    paymentDate: "2026-06-30",
    bankName: "Chase Bank",
    accountNumber: "**** **** **** 9911"
  },
  {
    id: "pay-6",
    employeeId: "EMP-006",
    employeeName: "Olivia Martinez",
    avatar: "OM",
    department: "Sales",
    designation: "Account Executive",
    basicSalary: 5500,
    bonus: 3500,
    allowance: 500,
    tax: 1400,
    pf: 275,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 7675,
    paymentStatus: "Processing",
    paymentDate: null,
    bankName: "Capital One",
    accountNumber: "**** **** **** 5521"
  },
  {
    id: "pay-7",
    employeeId: "EMP-007",
    employeeName: "William Taylor",
    avatar: "WT",
    department: "Marketing",
    designation: "Growth Marketer",
    basicSalary: 6200,
    bonus: 500,
    allowance: 200,
    tax: 850,
    pf: 310,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 5590,
    paymentStatus: "On Hold",
    paymentDate: null,
    bankName: "HSBC",
    accountNumber: "**** **** **** 7733"
  },
  {
    id: "pay-8",
    employeeId: "EMP-008",
    employeeName: "Sophia Anderson",
    avatar: "SA",
    department: "Data Science",
    designation: "Data Scientist",
    basicSalary: 8800,
    bonus: 0,
    allowance: 350,
    tax: 1250,
    pf: 440,
    insurance: 150,
    otherDeductions: 0,
    netSalary: 7310,
    paymentStatus: "Paid",
    paymentDate: "2026-06-30",
    bankName: "Chase Bank",
    accountNumber: "**** **** **** 2288"
  }
]
