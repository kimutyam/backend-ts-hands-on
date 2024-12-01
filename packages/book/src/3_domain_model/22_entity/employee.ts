import type { Name } from '../20_entity/name';
import type { Telephone } from '../20_entity/telphone';

// 不変でも支障がない。readonlyを使う。
interface Employee {
  readonly employeeNumber: number;
  readonly name: Name; // 値オブジェクトを参照
  readonly telephone: Telephone; // 値オブジェクトを参照
}

const identify = (a: Employee, b: Employee): boolean => a.employeeNumber === b.employeeNumber;

const changeName =
  (name: Name) =>
  (employee: Employee): Employee => ({ ...employee, name });

const changeTelephone =
  (telephone: Telephone) =>
  (employee: Employee): Employee => ({ ...employee, telephone });

const Employee = {
  identify,
  changeName,
  changeTelephone,
} as const;

export { Employee };
