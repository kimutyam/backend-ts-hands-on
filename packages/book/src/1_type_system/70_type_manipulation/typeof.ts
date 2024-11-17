const employee = {
  name: '木村',
  age: 20,
};

type Employee = typeof employee; // { name: string; age: number; }

export type { Employee };
