import type { Employee } from './types';

type EmployeeRequest = {
  [K in keyof Employee as `employee_${K}`]: Employee[K];
}; // { employee_name: string; employee_age: number; }

export type { EmployeeRequest };
