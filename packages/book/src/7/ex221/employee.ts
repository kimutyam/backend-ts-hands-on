import type { Name } from './name.js';
import type { Telephone } from './telphone.js';

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
