interface Employee {
  readonly name: string;
  readonly age: number;
  readonly modifyName: <T extends Employee>(employee: T, name: string) => T;
}

interface Manager extends Employee {
  readonly grade: number;
}

const modifyName = <T extends Employee>(employee: T, name: string): T => ({
  ...employee,
  name,
});

const buildEmployee = (name: string, age: number): Employee => ({
  name,
  age,
  modifyName,
});

const buildManager = (name: string, age: number, grade: number): Manager => ({
  name,
  age,
  grade,
  modifyName,
});

const emp: Employee = buildEmployee('木村', 20);

const manager: Manager = buildManager('佐藤', 20, 1);

emp.modifyName(emp, '高橋'); // { name: '高橋', age: 20 }
manager.modifyName(manager, '斎藤'); // { name: '斎藤', age: 20, grade: 1 }

type X = Manager extends Employee ? true : false;

export type { Employee, Manager, X };
