import type { Employee } from './types.js';

// 1
type EmployeeRequest = {
  [K in keyof Employee as `employee_${K}`]: Employee[K];
};

export type { EmployeeRequest };
