import type { Employee } from './types.js';

type EmployeeKeys = keyof Employee; // "name" | "age"

export type { EmployeeKeys };
