import type { Name } from './name';
import type { Telephone } from './telphone';

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
