interface Employee {
  name: string;
  age: number;
}

interface Manager {
  name: string;
  age: number;
  grade: number;
}

const modifyName = <T extends Employee>(emp: T, name: string): T => ({
  ...emp,
  name,
});

const employee = { name: '木村', age: 20 };
const manager = { name: '佐藤', age: 20, grade: 1 };

modifyName(employee, '高橋'); // { name: '高橋', age: 20 }
modifyName(manager, '斎藤'); // { name: '斎藤', age: 20, grade: 1 }

export type { Employee, Manager };
