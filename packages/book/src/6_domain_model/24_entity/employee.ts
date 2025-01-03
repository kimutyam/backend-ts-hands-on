import { Name } from './name';
import { Telephone } from './telphone';

// 不変でも支障がない。readonlyを使う。
interface Employee {
  readonly employeeNumber: number;
  readonly name: Name; // 値オブジェクトを参照
  readonly telephone: Telephone; // 値オブジェクトを参照
}

const identify = (a: Employee, b: Employee): boolean => a.employeeNumber === b.employeeNumber;

// 外から値オブジェクトを指定する。違反コードをかける。
const changeName =
  (name: string) =>
  (employee: Employee): Employee => ({ ...employee, name: Name.build(name) });

// 外から値オブジェクトを指定する。違反コードをかける。
const changeTelephone =
  (telephone: string) =>
  (employee: Employee): Employee => ({ ...employee, telephone: Telephone.build(telephone) });

const buildFromPrimitive = (employeeNumber: number, name: string, telephone: string): Employee => ({
  employeeNumber,
  name: Name.build(name),
  telephone: Telephone.build(telephone),
});

const Employee = {
  buildFromPrimitive,
  identify,
  changeName,
  changeTelephone,
} as const;

export { Employee };
