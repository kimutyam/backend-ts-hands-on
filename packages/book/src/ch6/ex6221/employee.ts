import type { Name } from 'ch6/ex6221/name.js';
import type { Telephone } from 'ch6/ex6221/telphone.js';

interface Employee {
  readonly employeeNumber: number;
  readonly name: Name; // 1
  readonly telephone: Telephone; // 1
}

const identify = (a: Employee, b: Employee): boolean =>
  a.employeeNumber === b.employeeNumber;

const Employee = {
  identify,
} as const;

export { Employee };
