import assert from 'node:assert';

// 不変でも支障がない。readonlyを使う。
interface Employee {
  readonly employeeNumber: number;
  readonly name: string;
  readonly telephone: string;
}

const identify = (a: Employee, b: Employee): boolean =>
  a.employeeNumber === b.employeeNumber;

// 外から値オブジェクトを指定する。違反コードをかける。
const changeTelephone =
  (telephone: string) =>
  (employee: Employee): Employee => {
    assert(
      /^0\d{1,4}-\d{1,4}-\d{4}$/.test(telephone),
      '電話番号の形式が正しくありません',
    );
    return { ...employee, telephone };
  };

const Employee = {
  identify,
  changeTelephone,
} as const;

export { Employee };
