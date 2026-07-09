import { api } from './api';
import type { Employee } from '@/data/employees';

// Map MongoDB _id to frontend id
const mapEmployee = (emp: any): Employee => ({
  ...emp,
  id: emp._id || emp.id,
});

export interface PaginationData {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalEmployees: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface EmployeesResponse {
  data: Employee[];
  pagination: PaginationData;
}

export const getEmployees = async (params?: Record<string, any>): Promise<EmployeesResponse> => {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const url = query ? `/employees?${query}` : '/employees';
  const response = await api.get(url);
  return {
    data: response.data.data.map(mapEmployee),
    pagination: response.data.pagination,
  };
};

export const getEmployeeById = async (id: string): Promise<Employee> => {
  const response = await api.get(`/employees/${id}`);
  return mapEmployee(response.data.data);
};

export const createEmployee = async (data: Partial<Employee>): Promise<Employee> => {
  const response = await api.post('/employees', data);
  return mapEmployee(response.data.data);
};

export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee> => {
  const response = await api.put(`/employees/${id}`, data);
  return mapEmployee(response.data.data);
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`);
};
