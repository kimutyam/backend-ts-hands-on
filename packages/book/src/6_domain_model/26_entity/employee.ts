import type { Name } from '6_domain_model/20_entity/name.js';
import type { Telephone } from '6_domain_model/20_entity/telphone.js';
import { EmployeeNumber } from '6_domain_model/26_entity/employeeNumber.js';

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
