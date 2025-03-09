interface Employee {
  name: string;
  age: number;
}

// Employee型の部分型です
interface Manager extends Employee {
  grade: number;
}

// Employee型の部分型です
interface Executive {
  name: string;
  age: number;
  title: string;
}

// Employee型の部分型ではありません
interface User {
  name: string;
}

type X = Manager extends Employee ? true : false;
type Y = Executive extends Employee ? true : false;
type Z = User extends Employee ? true : false;

export type { Employee, Executive, Manager, User, X, Y, Z };
