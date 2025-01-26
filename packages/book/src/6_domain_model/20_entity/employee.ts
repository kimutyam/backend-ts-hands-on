import type { Name } from './name.js';
import type { Telephone } from './telphone.js';

interface Employee {
  readonly employeeNumber: number;
  readonly name: Name; // 値オブジェクトを参照
  readonly telephone: Telephone; // 値オブジェクトを参照
}

const identify = (a: Employee, b: Employee): boolean => a.employeeNumber === b.employeeNumber;

const Employee = {
  identify,
} as const;

export { Employee };
