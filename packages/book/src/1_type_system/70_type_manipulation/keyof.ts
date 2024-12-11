import type { Employee } from './types';

type EmployeeKeys = keyof Employee; // "name" | "age"

export type { EmployeeKeys };
