type Employee = {
  name: string;
  age: number;
};

type Manager = Employee & { grade: number };

export type { Employee, Manager };
