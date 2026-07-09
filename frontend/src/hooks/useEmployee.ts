import { useQuery } from '@tanstack/react-query';
import { getEmployeeById } from '@/services/employee.service';

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
