import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '@/services/employee.service';
import { toast } from 'sonner';

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: (_data, id) => {
      // Remove the specific employee from the cache immediately
      queryClient.removeQueries({ queryKey: ['employees', id] });
      // Invalidate the list to refetch
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee deleted successfully.');
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 404) {
        toast.error('Employee not found — they may have already been deleted.');
        // Still clean up stale list
        queryClient.invalidateQueries({ queryKey: ['employees'] });
      } else if (!error.response) {
        toast.error('Network error — please check your connection and try again.');
      } else {
        toast.error(message || 'Failed to delete employee. Please try again.');
      }
    },
  });
};
