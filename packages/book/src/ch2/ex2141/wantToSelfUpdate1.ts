interface Employee {
  readonly name: string;
  readonly age: number;
  readonly update: (target: Employee, props: Partial<Employee>) => Employee;
}

interface Manager extends Employee {
  readonly grade: number;
}

const manager: Manager = {
  name: '佐藤',
  age: 20,
  grade: 1,
  update: (target, props) => ({ ...target, ...props }),
};

// 1
const updatedManager = manager.update(manager, { age: 21 });

console.log(updatedManager);

export type { Employee, Manager };
