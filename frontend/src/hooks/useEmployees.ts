import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '@/services/employee.service';

export const useEmployees = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => getEmployees(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};


