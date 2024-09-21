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

  // Employee固有の振る舞いだとする。サブタイプが崩れる
  zeroPaddedAge() {
    return this.age.toString().padStart(3, '0');
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
