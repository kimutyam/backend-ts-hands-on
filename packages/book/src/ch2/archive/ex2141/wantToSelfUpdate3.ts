interface Employee {
  readonly name: string;
  readonly age: number;
  readonly modifyName: <T extends Employee>(emp: T, name: string) => T;
}

interface Manager extends Employee {
  readonly grade: number;
}

const employee: Employee = {
  name: '木村',
  age: 20,
  modifyName: <T extends Employee>(emp: T, name: string): T => ({
    ...emp,
    name,
  }),
};

const manager: Manager = {
  name: '佐藤',
  age: 20,
  grade: 1,
  modifyName: <T extends Employee>(emp: T, name: string): T => ({
    ...emp,
    name,
  }),
};

employee.modifyName(employee, '高橋'); // { name: '高橋', age: 20 }
manager.modifyName(manager, '斎藤'); // { name: '斎藤', age: 20, grade: 1 }

type X = Manager extends Employee ? true : false;

export type { Employee, Manager, X };
