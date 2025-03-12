import type { Employee, Manager } from 'ch1/ex1251/types.js';

type UpdateEmployeeFn = (
  target: Employee,
  props: Partial<Employee>,
) => Employee;

type UpdateManagerFn = (target: Manager, props: Partial<Manager>) => Manager;

declare function updateManager(
  target: Manager,
  props: Partial<Manager>,
): Employee;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const updateEmployee: UpdateEmployeeFn = updateManager;

console.log(updateEmployee);

export type { UpdateEmployeeFn, UpdateManagerFn };
