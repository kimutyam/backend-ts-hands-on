interface Employee {
  readonly name: string;
  readonly age: number;
  readonly update: (target: Employee, props: Partial<Employee>) => Employee;
}

// extendsしないで定義する必要がでてくる
interface Manager {
  readonly name: string;
  readonly age: number;
  readonly grade: number;
  readonly update: (target: Manager, props: Partial<Manager>) => Manager;
}

// false
type X = Manager extends Employee ? true : false;

export type { Employee, Manager, X };
