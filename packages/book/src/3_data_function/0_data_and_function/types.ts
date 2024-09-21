interface Employee {
  readonly name: string;
  readonly age: number;
}

interface Manager extends Employee {
  readonly grade: number;
}

export type { Employee, Manager };
