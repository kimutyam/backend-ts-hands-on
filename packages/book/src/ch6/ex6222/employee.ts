import type { Name } from '../ex6221/name.js';
import type { Telephone } from '../ex6221/telphone.js';

interface Employee {
  readonly employeeNumber: number;
  readonly name: Name; // 値オブジェクトを参照
  readonly telephone: Telephone; // 値オブジェクトを参照
}

const identify = (a: Employee, b: Employee): boolean =>
  a.employeeNumber === b.employeeNumber;

// 1
const changeName =
  (name: Name) =>
  (employee: Employee): Employee => ({ ...employee, name });

// 2
const changeTelephone =
  (telephone: Telephone) =>
  (employee: Employee): Employee => ({
    ...employee,
    telephone,
  });

const Employee = {
  identify,
  changeName,
  changeTelephone,
} as const;

export { Employee };
