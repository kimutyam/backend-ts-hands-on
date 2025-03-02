// eslint-disable-next-line max-classes-per-file
class Employee {
  constructor(
    public readonly name: string,
    public readonly age: number,
  ) {}

  update<T extends Employee>(
    target: T,
    props: Partial<T>,
  ): T {
    return { ...target, ...props };
  }
}

class Manager extends Employee {
  constructor(
    public override readonly name: string,
    public override readonly age: number,
    public readonly grade: number,
  ) {
    super(name, age);
  }
}

const employee = new Employee('木村', 20);
const manager = new Manager('佐藤', 20, 1);

employee.update(employee, { age: 30 }); // { name: '木村', age: 30 }
manager.update(manager, { grade: 2 }); // { name: '佐藤', age: 20, grade: 2 }

console.log(employee, manager);

// true
type X = Manager extends Employee ? true : false;

export type { Employee, Manager, X };
