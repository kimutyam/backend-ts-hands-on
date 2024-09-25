// eslint-disable-next-line max-classes-per-file
abstract class EmployeeLike {
  update<T extends this>(target: T, props: Partial<T>): T {
    return { ...target, ...props };
  }
}

class Employee extends EmployeeLike {
  constructor(
    public readonly name: string,
    public readonly age: number,
  ) {
    super();
  }

  // eslint-disable-next-line no-use-before-define
  promoteManager(grade: number): Manager {
    // eslint-disable-next-line no-use-before-define
    return new Manager(this.name, this.age, grade);
  }
}

class Manager extends EmployeeLike {
  constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly grade: number,
  ) {
    super();
  }
}

// true
type X = Manager extends Employee ? true : false;

export type { Employee, Manager, X };
