interface Employee {
  name: string;
  age: number;
}

interface Manager {
  name: string;
  age: number;
  grade: number;
}

const update = <T extends Employee>(target: T, props: Partial<T>): T => ({ ...target, ...props });

const employee = { name: '木村', age: 20 };
const manager = { name: '佐藤', age: 20, grade: 1 };

update(employee, { age: 30 }); // { name: '木村', age: 30 }
update(manager, { grade: 2 }); // { name: '佐藤', age: 20, grade: 2 }

export type { Employee, Manager };
