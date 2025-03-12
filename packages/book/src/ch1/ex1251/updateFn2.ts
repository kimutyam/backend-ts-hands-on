import type { Employee, Manager } from 'ch1/ex1251/types.js';

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
