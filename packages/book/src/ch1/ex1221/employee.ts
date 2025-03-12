interface Employee {
  name: string;
  age: number;
}

interface Manager extends Employee {
  grade: number;
}

interface Executive {
  name: string;
  age: number;
  title: string;
}

interface User {
  name: string;
}

export type { Employee, Executive, Manager, User };
