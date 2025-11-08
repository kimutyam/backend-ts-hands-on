import type { Name } from '../ex6221/name.js';
import type { Telephone } from '../ex6221/telphone.js';
import { EmployeeNumber } from './employeeNumber.js';

interface Employee {
  readonly employeeNumber: EmployeeNumber;
  readonly name: Name;
  readonly telephone: Telephone;
}

const identify = (a: Employee, b: Employee): boolean =>
  EmployeeNumber.equals(a.employeeNumber, b.employeeNumber);

const Employee = {
  identify,
} as const;

export { Employee };
