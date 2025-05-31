interface Employee {
  name: string;
  age: number;
}

// eslint-disable-next-line prefer-const
let employee: Employee = {
  name: '木村',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  age: 'Secret', // 1
};

interface Manager extends Employee {
  grade: number;
}

console.log(employee);

export type { Employee, Manager };
