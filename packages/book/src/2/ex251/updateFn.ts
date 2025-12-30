import type { Employee, Manager } from './types.js';

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
// @ts-expect-error
const updateEmployee: UpdateEmployeeFn = updateManager;

console.log(updateEmployee);

export type { UpdateEmployeeFn, UpdateManagerFn };
