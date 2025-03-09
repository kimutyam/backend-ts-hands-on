import type { Employee } from 'ch1/ex70/types.js';

type EmployeeKeys = keyof Employee; // "name" | "age"

export type { EmployeeKeys };
