export type AttendanceStatus = "Present" | "Absent" | "Late" | "Half Day" | "Work From Home" | "On Leave" | "Holiday"

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  department: string
  date: string
  checkIn: string | null
  checkOut: string | null
  workingHours: string | null
  status: AttendanceStatus
  location: string | null
}

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "att-1",
    employeeId: "EMP-001",
    employeeName: "Sarah Jenkins",
    avatar: "SJ",
    department: "Engineering",
    date: new Date().toISOString().split("T")[0],
    checkIn: "08:55 AM",
    checkOut: "05:10 PM",
    workingHours: "8h 15m",
    status: "Present",
    location: "New York Office"
  },
  {
    id: "att-2",
    employeeId: "EMP-002",
    employeeName: "Michael Chen",
    avatar: "MC",
    department: "Product",
    date: new Date().toISOString().split("T")[0],
    checkIn: "09:30 AM",
    checkOut: "06:00 PM",
    workingHours: "8h 30m",
    status: "Late",
    location: "San Francisco Office"
  },
  {
    id: "att-3",
    employeeId: "EMP-003",
    employeeName: "Emily Rodriguez",
    avatar: "ER",
    department: "Human Resources",
    date: new Date().toISOString().split("T")[0],
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "On Leave",
    location: null
  },
  {
    id: "att-4",
    employeeId: "EMP-004",
    employeeName: "David Kim",
    avatar: "DK",
    department: "Design",
    date: new Date().toISOString().split("T")[0],
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    workingHours: "8h 00m",
    status: "Work From Home",
    location: "Remote - California"
  },
  {
    id: "att-5",
    employeeId: "EMP-005",
    employeeName: "James Wilson",
    avatar: "JW",
    department: "Engineering",
    date: new Date().toISOString().split("T")[0],
    checkIn: "08:45 AM",
    checkOut: "12:45 PM",
    workingHours: "4h 00m",
    status: "Half Day",
    location: "San Francisco Office"
  },
  {
    id: "att-6",
    employeeId: "EMP-006",
    employeeName: "Olivia Martinez",
    avatar: "OM",
    department: "Sales",
    date: new Date().toISOString().split("T")[0],
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "Absent",
    location: null
  },
  {
    id: "att-7",
    employeeId: "EMP-007",
    employeeName: "William Taylor",
    avatar: "WT",
    department: "Marketing",
    date: new Date().toISOString().split("T")[0],
    checkIn: null,
    checkOut: null,
    workingHours: null,
    status: "Holiday",
    location: null
  },
  {
    id: "att-8",
    employeeId: "EMP-008",
    employeeName: "Sophia Anderson",
    avatar: "SA",
    department: "Data Science",
    date: new Date().toISOString().split("T")[0],
    checkIn: "09:15 AM",
    checkOut: "06:15 PM",
    workingHours: "9h 00m",
    status: "Late",
    location: "London Office"
  },
  {
    id: "att-9",
    employeeId: "EMP-009",
    employeeName: "Liam Thomas",
    avatar: "LT",
    department: "Security",
    date: new Date().toISOString().split("T")[0],
    checkIn: "08:00 AM",
    checkOut: "04:30 PM",
    workingHours: "8h 30m",
    status: "Present",
    location: "London Office"
  },
  {
    id: "att-10",
    employeeId: "EMP-011",
    employeeName: "Mason White",
    avatar: "MW",
    department: "Finance",
    date: new Date().toISOString().split("T")[0],
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    workingHours: "8h 00m",
    status: "Work From Home",
    location: "Remote - New York"
  }
]
