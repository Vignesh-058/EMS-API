import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployee } from '@/services/employee.service';
import type { EmployeeFormValues } from '@/schemas/employee.schema';
import { toast } from 'sonner';

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EmployeeFormValues) => createEmployee(data as any),
    onSuccess: (newEmployee) => {
      // Invalidate employees list so it re-fetches with the new record
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success(`${newEmployee.firstName} ${newEmployee.lastName} has been added successfully!`);
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409) {
        if (message?.includes('email')) {
          toast.error('An employee with this email address already exists.');
        } else if (message?.includes('employeeId')) {
          toast.error('An employee with this Employee ID already exists.');
        } else {
          toast.error(message || 'A duplicate entry was detected. Please check your data.');
        }
      } else if (status === 400) {
        toast.error(message || 'Please check the form fields and try again.');
      } else if (!error.response) {
        toast.error('Network error — please check your connection and try again.');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    },
  });
};
