import type { Name } from 'ch6/ex6221/name.js';
import type { Telephone } from 'ch6/ex6221/telphone.js';
import { EmployeeNumber } from 'ch6/ex6223/employeeNumber.js';

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
