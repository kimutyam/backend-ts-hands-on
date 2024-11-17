interface Employee {
  readonly name: string;
  readonly age: number;
  readonly update: (target: Employee, props: Partial<Employee>) => Employee;
}

// Managerをupdateしたい
interface Manager extends Employee {
  readonly grade: number;
}

export type { Employee, Manager };
