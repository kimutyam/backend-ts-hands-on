import type { Name } from '6_domain_model/20_entity/name.js';
import type { Telephone } from '6_domain_model/20_entity/telphone.js';

interface Employee {
  readonly employeeNumber: number;
  readonly name: Name; // 値オブジェクトを参照
  readonly telephone: Telephone; // 値オブジェクトを参照
}

const identify = (a: Employee, b: Employee): boolean =>
  a.employeeNumber === b.employeeNumber;

const Employee = {
  identify,
} as const;

export { Employee };
