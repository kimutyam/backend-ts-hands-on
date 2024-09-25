// eslint-disable-next-line max-classes-per-file
class Employee {
  private id: string;

  constructor(
    public readonly name: string,
    public readonly age: number,
  ) {
    this.id = name;
  }

  getId() {
    console.log(this.id);
  }
}

class Manager {
  private id: string;

  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly grade: number,
  ) {
    this.id = name;
  }

  getId() {
    console.log(this.id);
  }
}

const employee = new Employee('木村', 20);
const manager = new Manager('佐藤', 20, 1);

console.log(employee, manager);

// false
type X = Manager extends Employee ? true : false;

export type { Employee, Manager, X };
