import { z } from 'zod'

export const employeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, 'Employee ID is required')
    .regex(/^[A-Za-z0-9-_]+$/, 'Employee ID can only contain letters, numbers, hyphens, and underscores'),

  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less'),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s\-+().]+$/, 'Please enter a valid phone number'),

  gender: z.string().min(1, 'Gender is required'),

  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required'),

  department: z
    .string()
    .min(1, 'Department is required'),

  designation: z
    .string()
    .min(1, 'Designation is required')
    .max(100, 'Designation must be 100 characters or less'),

  joiningDate: z
    .string()
    .min(1, 'Joining date is required'),

  salary: z
    .number()
    .positive('Salary must be a positive number')
    .max(10_000_000, 'Salary seems too high'),

  status: z.string().min(1, 'Status is required'),

  address: z
    .string()
    .min(1, 'Address is required'),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>
