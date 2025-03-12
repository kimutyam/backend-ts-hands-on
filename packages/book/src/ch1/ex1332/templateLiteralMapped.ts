import type { Employee } from 'ch1/ex1332/types.js';

// 1
type EmployeeRequest = {
  [K in keyof Employee as `employee_${K}`]: Employee[K];
};

export type { EmployeeRequest };
