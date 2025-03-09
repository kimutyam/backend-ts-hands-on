import type { Employee } from '1_type_system/70_type_manipulation/types.js';

type EmployeeRequest = {
  [K in keyof Employee as `employee_${K}`]: Employee[K];
}; // { employee_name: string; employee_age: number; }

export type { EmployeeRequest };
