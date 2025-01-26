import type { Employee, Manager } from './types.js';

type UpdateEmployeeFn = (target: Employee, props: Partial<Employee>) => Employee;
type UpdateManagerFn = (target: Employee, props: Partial<Employee>) => Manager;

// true
type X = UpdateManagerFn extends UpdateEmployeeFn ? true : false;

export type { X };
