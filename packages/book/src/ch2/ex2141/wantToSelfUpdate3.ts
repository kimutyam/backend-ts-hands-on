interface Employee {
  readonly name: string;
  readonly age: number;
  readonly update: <T extends Employee>(target: T, props: Partial<T>) => T;
}

interface Manager extends Employee {
  readonly grade: number;
}

const employee: Employee = {
  name: '木村',
  age: 20,
  update: <T extends Employee>(target: T, props: Partial<T>): T => ({
    ...target,
    ...props,
  }),
};

const manager: Manager = {
  name: '佐藤',
  age: 20,
  grade: 1,
  update: <T extends Employee>(target: T, props: Partial<T>): T => ({
    ...target,
    ...props,
  }),
};

employee.update(employee, { age: 30 }); // { name: '木村', age: 30 }
manager.update(manager, { grade: 2 }); // { name: '佐藤', age: 20, grade: 2 }

const updatedManager = manager.update(manager, { age: 21 });

console.log(updatedManager);

export type { Employee, Manager };
