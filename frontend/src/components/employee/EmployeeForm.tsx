import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema, type EmployeeFormValues } from '@/schemas/employee.schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Upload } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Employee } from '@/data/employees'
import * as React from 'react'

interface EmployeeFormProps {
  /** Pre-fill form with existing employee data (edit mode) */
  initialData?: Employee | null
  /** Called with validated form data when user submits */
  onSubmit: (data: EmployeeFormValues) => void
  /** Whether submission is in-flight — disables all inputs */
  isPending?: boolean
  /** Label shown on the submit button when idle */
  submitLabel?: string
  /** Label shown on the submit button when loading */
  loadingLabel?: string
  onCancel?: () => void
}

const formatDateForInput = (dateString?: string): string => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toISOString().split('T')[0]
  } catch {
    return ''
  }
}

export function EmployeeForm({
  initialData,
  onSubmit,
  isPending = false,
  submitLabel = 'Create Employee',
  loadingLabel = 'Saving...',
  onCancel,
}: EmployeeFormProps) {
  const defaultValues: Partial<EmployeeFormValues> = React.useMemo(() => ({
    employeeId: initialData?.employeeId ?? '',
    firstName: initialData?.firstName ?? '',
    lastName: initialData?.lastName ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    gender: initialData?.gender ?? '',
    dateOfBirth: formatDateForInput(initialData?.dateOfBirth),
    department: initialData?.department ?? '',
    designation: initialData?.designation ?? '',
    joiningDate: formatDateForInput(initialData?.joiningDate),
    salary: initialData?.salary ?? undefined,
    status: initialData?.status ?? 'Active',
    address: initialData?.address ?? '',
  }), [initialData])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8" noValidate>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">

        {/* Photo Upload UI-only */}
        <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-all hover:bg-accent/50 hover:border-primary/50 md:col-span-2">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="h-6 w-6" />
          </div>
          <div className="text-sm font-medium text-foreground">Click to upload photo</div>
          <div className="mt-1 text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 2MB)</div>
        </div>

        {/* Employee ID */}
        <div className="space-y-2">
          <Label htmlFor="employeeId" className={cn(errors.employeeId && 'text-destructive')}>
            Employee ID <span className="text-destructive">*</span>
          </Label>
          <Input
            id="employeeId"
            placeholder="EMP-001"
            disabled={isPending}
            {...register('employeeId')}
            className={cn(errors.employeeId && 'border-destructive focus-visible:ring-destructive')}
            autoFocus
          />
          {errors.employeeId && (
            <p className="text-xs text-destructive">{errors.employeeId.message}</p>
          )}
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className={cn(errors.firstName && 'text-destructive')}>
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            disabled={isPending}
            {...register('firstName')}
            className={cn(errors.firstName && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className={cn(errors.lastName && 'text-destructive')}>
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            disabled={isPending}
            {...register('lastName')}
            className={cn(errors.lastName && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className={cn(errors.email && 'text-destructive')}>
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@company.com"
            disabled={isPending}
            {...register('email')}
            className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className={cn(errors.phone && 'text-destructive')}>
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 000-0000"
            disabled={isPending}
            {...register('phone')}
            className={cn(errors.phone && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className={cn(errors.gender && 'text-destructive')}>
            Gender <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                <SelectTrigger className={cn(errors.gender && 'border-destructive')}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.gender && (
            <p className="text-xs text-destructive">{errors.gender.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className={cn(errors.dateOfBirth && 'text-destructive')}>
            Date of Birth <span className="text-destructive">*</span>
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            disabled={isPending}
            {...register('dateOfBirth')}
            className={cn(errors.dateOfBirth && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Department */}
        <div className="space-y-2">
          <Label className={cn(errors.department && 'text-destructive')}>
            Department <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                <SelectTrigger className={cn(errors.department && 'border-destructive')}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.department && (
            <p className="text-xs text-destructive">{errors.department.message}</p>
          )}
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="designation" className={cn(errors.designation && 'text-destructive')}>
            Designation <span className="text-destructive">*</span>
          </Label>
          <Input
            id="designation"
            placeholder="e.g. Senior Developer"
            disabled={isPending}
            {...register('designation')}
            className={cn(errors.designation && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.designation && (
            <p className="text-xs text-destructive">{errors.designation.message}</p>
          )}
        </div>

        {/* Joining Date */}
        <div className="space-y-2">
          <Label htmlFor="joiningDate" className={cn(errors.joiningDate && 'text-destructive')}>
            Joining Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="joiningDate"
            type="date"
            disabled={isPending}
            {...register('joiningDate')}
            className={cn(errors.joiningDate && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.joiningDate && (
            <p className="text-xs text-destructive">{errors.joiningDate.message}</p>
          )}
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <Label htmlFor="salary" className={cn(errors.salary && 'text-destructive')}>
            Annual Salary <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <Input
              id="salary"
              type="number"
              min="0"
              step="1000"
              placeholder="65000"
              disabled={isPending}
              {...register('salary', { valueAsNumber: true })}
              className={cn('pl-7', errors.salary && 'border-destructive focus-visible:ring-destructive')}
            />
          </div>
          {errors.salary && (
            <p className="text-xs text-destructive">{errors.salary.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className={cn(errors.status && 'text-destructive')}>
            Status <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                <SelectTrigger className={cn(errors.status && 'border-destructive')}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Probation">Probation</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-xs text-destructive">{errors.status.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address" className={cn(errors.address && 'text-destructive')}>
            Address <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="address"
            placeholder="Full residential address..."
            className={cn('h-20 resize-none', errors.address && 'border-destructive focus-visible:ring-destructive')}
            disabled={isPending}
            {...register('address')}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 border-t pt-6 mt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="min-w-[150px] w-full sm:w-auto">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  )
}
