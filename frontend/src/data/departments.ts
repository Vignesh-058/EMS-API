export interface Department {
  id: string
  name: string
  code: string
  description: string
  managerName: string
  location: string
  status: "Active" | "Inactive" | "New" | "Archived"
  employeeCount: number
  createdAt: string
  budget: number
  openRoles: number
  utilizationRate: number
  performanceScore: number
}

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    code: "ENG-001",
    description: "Core software development, infrastructure, and QA operations.",
    managerName: "Sarah Jenkins",
    location: "New York, USA",
    status: "Active",
    employeeCount: 42,
    createdAt: "2023-01-15T08:00:00Z",
    budget: 4500000,
    openRoles: 5,
    utilizationRate: 92,
    performanceScore: 4.8
  },
  {
    id: "2",
    name: "Product",
    code: "PRD-002",
    description: "Product strategy, roadmapping, and user research.",
    managerName: "Michael Chen",
    location: "San Francisco, USA",
    status: "Active",
    employeeCount: 15,
    createdAt: "2023-02-10T09:30:00Z",
    budget: 1800000,
    openRoles: 2,
    utilizationRate: 88,
    performanceScore: 4.5
  },
  {
    id: "3",
    name: "Human Resources",
    code: "HR-003",
    description: "Talent acquisition, employee relations, and company culture.",
    managerName: "Emily Rodriguez",
    location: "London, UK",
    status: "Active",
    employeeCount: 8,
    createdAt: "2023-03-05T14:15:00Z",
    budget: 850000,
    openRoles: 1,
    utilizationRate: 75,
    performanceScore: 4.2
  },
  {
    id: "4",
    name: "Sales",
    code: "SLS-004",
    description: "B2B sales, account management, and revenue generation.",
    managerName: "Olivia Martinez",
    location: "Chicago, USA",
    status: "Active",
    employeeCount: 24,
    createdAt: "2023-06-20T11:45:00Z",
    budget: 2200000,
    openRoles: 8,
    utilizationRate: 95,
    performanceScore: 4.6
  },
  {
    id: "5",
    name: "Design",
    code: "DSN-005",
    description: "UI/UX design, wireframing, branding, and asset creation.",
    managerName: "David Kim",
    location: "Remote",
    status: "Active",
    employeeCount: 12,
    createdAt: "2023-04-12T16:20:00Z",
    budget: 1200000,
    openRoles: 2,
    utilizationRate: 90,
    performanceScore: 4.9
  },
  {
    id: "6",
    name: "Marketing",
    code: "MKT-006",
    description: "Brand awareness, growth campaigns, and content strategy.",
    managerName: "Jessica Alba",
    location: "Los Angeles, USA",
    status: "Active",
    employeeCount: 18,
    createdAt: "2023-05-22T10:00:00Z",
    budget: 3100000,
    openRoles: 4,
    utilizationRate: 85,
    performanceScore: 4.3
  },
  {
    id: "7",
    name: "Finance",
    code: "FIN-007",
    description: "Accounting, financial planning, and risk management.",
    managerName: "Robert Vance",
    location: "New York, USA",
    status: "Active",
    employeeCount: 10,
    createdAt: "2023-01-20T09:00:00Z",
    budget: 950000,
    openRoles: 1,
    utilizationRate: 98,
    performanceScore: 4.7
  },
  {
    id: "8",
    name: "Legal",
    code: "LGL-008",
    description: "Corporate governance, compliance, and contract review.",
    managerName: "Harvey Specter",
    location: "Chicago, USA",
    status: "Active",
    employeeCount: 6,
    createdAt: "2023-07-11T13:30:00Z",
    budget: 1500000,
    openRoles: 0,
    utilizationRate: 100,
    performanceScore: 4.9
  },
  {
    id: "9",
    name: "Customer Support",
    code: "CS-009",
    description: "Client success, technical support, and account troubleshooting.",
    managerName: "Kelly Kapoor",
    location: "Remote",
    status: "Active",
    employeeCount: 35,
    createdAt: "2023-08-15T08:45:00Z",
    budget: 1750000,
    openRoles: 12,
    utilizationRate: 82,
    performanceScore: 4.1
  },
  {
    id: "10",
    name: "Research & Development",
    code: "RND-010",
    description: "Experimental technologies, AI integration, and prototyping.",
    managerName: "Walter White",
    location: "San Francisco, USA",
    status: "New",
    employeeCount: 8,
    createdAt: "2024-11-01T10:00:00Z",
    budget: 5000000,
    openRoles: 15,
    utilizationRate: 45,
    performanceScore: 3.5
  },
  {
    id: "11",
    name: "Operations",
    code: "OPS-011",
    description: "Internal logistics, facilities management, and daily operations.",
    managerName: "Dwight Schrute",
    location: "New York, USA",
    status: "Active",
    employeeCount: 22,
    createdAt: "2023-02-28T07:15:00Z",
    budget: 1100000,
    openRoles: 3,
    utilizationRate: 94,
    performanceScore: 4.4
  },
  {
    id: "12",
    name: "Data Science",
    code: "DAT-012",
    description: "Data warehousing, machine learning models, and analytics.",
    managerName: "Alan Turing",
    location: "London, UK",
    status: "Active",
    employeeCount: 14,
    createdAt: "2023-09-10T14:20:00Z",
    budget: 2800000,
    openRoles: 6,
    utilizationRate: 89,
    performanceScore: 4.8
  },
  {
    id: "13",
    name: "Security",
    code: "SEC-013",
    description: "Cybersecurity, penetration testing, and IT security protocols.",
    managerName: "Elliot Alderson",
    location: "Remote",
    status: "Active",
    employeeCount: 9,
    createdAt: "2023-10-05T11:00:00Z",
    budget: 3200000,
    openRoles: 2,
    utilizationRate: 97,
    performanceScore: 4.9
  },
  {
    id: "14",
    name: "Business Development",
    code: "BZD-014",
    description: "Strategic partnerships, mergers, and market expansion.",
    managerName: "Don Draper",
    location: "San Francisco, USA",
    status: "Inactive",
    employeeCount: 4,
    createdAt: "2024-01-20T09:30:00Z",
    budget: 900000,
    openRoles: 0,
    utilizationRate: 30,
    performanceScore: 2.5
  },
  {
    id: "15",
    name: "Quality Assurance",
    code: "QA-015",
    description: "Automated testing, release engineering, and defect tracking.",
    managerName: "Monica Geller",
    location: "Chicago, USA",
    status: "Archived",
    employeeCount: 0,
    createdAt: "2022-06-15T08:00:00Z",
    budget: 0,
    openRoles: 0,
    utilizationRate: 0,
    performanceScore: 0
  }
]
