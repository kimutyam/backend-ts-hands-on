import type { Employee, Manager } from './types.js';

type UpdateEmployeeFn = (
  target: Employee,
  props: Partial<Employee>,
) => Employee;

type UpdateManagerFn = (target: Employee, props: Partial<Employee>) => Manager;

declare function updateManager(
  target: Employee,
  props: Partial<Employee>,
): Employee;

const updateEmployee: UpdateEmployeeFn = updateManager; // 1

console.log(updateEmployee);

export type { UpdateEmployeeFn, UpdateManagerFn };
