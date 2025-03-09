import type { Employee } from '1_type_system/70_type_manipulation/types.js';

type EmployeeKeys = keyof Employee; // "name" | "age"

export type { EmployeeKeys };
