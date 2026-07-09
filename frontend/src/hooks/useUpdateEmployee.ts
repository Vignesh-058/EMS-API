import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmployee } from '@/services/employee.service';
import type { EmployeeFormValues } from '@/schemas/employee.schema';
import { toast } from 'sonner';

export const useUpdateEmployee = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EmployeeFormValues) => updateEmployee(id, data as any),
    onSuccess: (updatedEmployee) => {
      // Refresh the list and the specific employee's detail cache
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employees', id] });
      toast.success(`${updatedEmployee.firstName} ${updatedEmployee.lastName} has been updated successfully!`);
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 404) {
        toast.error('Employee not found. They may have been deleted.');
      } else if (status === 409) {
        if (message?.includes('email')) {
          toast.error('Another employee already has this email address.');
        } else if (message?.includes('employeeId')) {
          toast.error('Another employee already has this Employee ID.');
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
