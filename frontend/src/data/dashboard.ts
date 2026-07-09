import { Users, Building2, UserCheck, UserX, UserPlus, CircleDollarSign, CalendarClock, Wallet, FileBarChart, Settings } from "lucide-react"

export const dashboardStats = [
  {
    title: "Total Employees",
    value: "1,248",
    icon: Users,
    trend: "up" as const,
    trendValue: "+12%",
    description: "from last month",
  },
  {
    title: "Departments",
    value: "12",
    icon: Building2,
    trend: "neutral" as const,
    trendValue: "0%",
    description: "no changes this year",
  },
  {
    title: "Present Today",
    value: "1,180",
    icon: UserCheck,
    trend: "up" as const,
    trendValue: "+2.5%",
    description: "vs yesterday",
  },
  {
    title: "On Leave",
    value: "45",
    icon: UserX,
    trend: "down" as const,
    trendValue: "-5%",
    description: "from last week",
  },
  {
    title: "New Employees",
    value: "24",
    icon: UserPlus,
    trend: "up" as const,
    trendValue: "+18%",
    description: "this quarter",
  },
  {
    title: "Monthly Payroll",
    value: "$452.5k",
    icon: CircleDollarSign,
    trend: "up" as const,
    trendValue: "+4%",
    description: "from last month",
  },
]

export const quickActions = [
  { title: "Add Employee", icon: UserPlus, href: "/employees/new", color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Departments", icon: Building2, href: "/departments", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { title: "Attendance", icon: CalendarClock, href: "/attendance", color: "text-green-500", bg: "bg-green-500/10" },
  { title: "Payroll", icon: Wallet, href: "/payroll", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Reports", icon: FileBarChart, href: "/reports", color: "text-orange-500", bg: "bg-orange-500/10" },
  { title: "Settings", icon: Settings, href: "/settings", color: "text-slate-500", bg: "bg-slate-500/10" },
]

export const recentEmployees = [
  {
    id: "EMP-001",
    name: "Sarah Jenkins",
    email: "sarah.j@emspro.com",
    avatar: "SJ",
    department: "Engineering",
    designation: "Senior Frontend Engineer",
    status: "Active",
    joiningDate: "2026-06-15",
  },
  {
    id: "EMP-002",
    name: "Michael Chen",
    email: "michael.c@emspro.com",
    avatar: "MC",
    department: "Product",
    designation: "Product Manager",
    status: "Onboarding",
    joiningDate: "2026-07-01",
  },
  {
    id: "EMP-003",
    name: "Emily Rodriguez",
    email: "emily.r@emspro.com",
    avatar: "ER",
    department: "Human Resources",
    designation: "HR Specialist",
    status: "Active",
    joiningDate: "2026-06-20",
  },
  {
    id: "EMP-004",
    name: "David Kim",
    email: "david.k@emspro.com",
    avatar: "DK",
    department: "Design",
    designation: "UX Designer",
    status: "On Leave",
    joiningDate: "2025-11-10",
  },
  {
    id: "EMP-005",
    name: "James Wilson",
    email: "james.w@emspro.com",
    avatar: "JW",
    department: "Engineering",
    designation: "Backend Engineer",
    status: "Active",
    joiningDate: "2026-05-05",
  },
]

export const activityTimeline = [
  {
    id: "ACT-001",
    title: "New Employee Added",
    description: "Michael Chen was added to Product",
    time: "2 hours ago",
    icon: UserPlus,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    id: "ACT-002",
    title: "Payroll Generated",
    description: "Monthly payroll for June has been processed",
    time: "5 hours ago",
    icon: Wallet,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "ACT-003",
    title: "Department Updated",
    description: "Design department budget increased",
    time: "1 day ago",
    icon: Building2,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    id: "ACT-004",
    title: "Attendance Submitted",
    description: "Engineering team attendance verified",
    time: "1 day ago",
    icon: CalendarClock,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    id: "ACT-005",
    title: "System Maintenance",
    description: "Scheduled maintenance completed",
    time: "2 days ago",
    icon: Settings,
    color: "text-slate-500",
    bg: "bg-slate-500/10",
  },
]

export const employeeGrowthData = [
  { name: "Jan", employees: 950 },
  { name: "Feb", employees: 980 },
  { name: "Mar", employees: 1020 },
  { name: "Apr", employees: 1100 },
  { name: "May", employees: 1150 },
  { name: "Jun", employees: 1248 },
]

export const departmentData = [
  { name: "Eng", value: 450 },
  { name: "Sales", value: 300 },
  { name: "Support", value: 200 },
  { name: "Product", value: 150 },
  { name: "HR", value: 100 },
  { name: "Mktg", value: 48 },
]

export const attendanceData = [
  { name: "Mon", present: 1180, onLeave: 68 },
  { name: "Tue", present: 1195, onLeave: 53 },
  { name: "Wed", present: 1170, onLeave: 78 },
  { name: "Thu", present: 1205, onLeave: 43 },
  { name: "Fri", present: 1150, onLeave: 98 },
]

export const payrollData = [
  { name: "Jan", payroll: 320 },
  { name: "Feb", payroll: 340 },
  { name: "Mar", payroll: 365 },
  { name: "Apr", payroll: 390 },
  { name: "May", payroll: 410 },
  { name: "Jun", payroll: 452 },
]

import { Cake, Palmtree, ClipboardCheck } from "lucide-react"

export const upcomingEvents = [
  {
    id: "EVT-001",
    title: "Sarah's Birthday",
    date: "Tomorrow",
    icon: Cake,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    id: "EVT-002",
    title: "Quarterly Review",
    date: "This Friday",
    icon: ClipboardCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "EVT-003",
    title: "Company Holiday",
    date: "Next Monday",
    icon: Palmtree,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: "EVT-004",
    title: "All-Hands Meeting",
    date: "Next Wednesday",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
]

import { Megaphone, BellRing } from "lucide-react"

export const announcements = [
  {
    id: "ANN-001",
    title: "New Health Insurance Policy",
    date: "July 8, 2026",
    description: "Please review the updated health insurance policy document in the company portal by Friday.",
    icon: Megaphone,
    isNew: true,
  },
  {
    id: "ANN-002",
    title: "Office Renovation Update",
    date: "July 5, 2026",
    description: "The 3rd-floor cafeteria will be closed for renovations until the end of the month.",
    icon: BellRing,
    isNew: false,
  },
]

export const companySummary = {
  name: "EMS Pro Inc.",
  location: "San Francisco, CA",
  established: "2018",
  metrics: [
    { label: "Employees", value: "1,248" },
    { label: "Departments", value: "12" },
    { label: "Branches", value: "4" },
  ]
}
