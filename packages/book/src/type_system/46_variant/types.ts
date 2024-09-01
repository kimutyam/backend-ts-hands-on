interface Employee {
  name: string;
  age: number;
}

interface Manager extends Employee {
  grade: number;
}

// Employee型の部分型です
interface Executive {
  name: string;
  age: number;
  title: string;
}

export type { Employee, Manager, Executive };
