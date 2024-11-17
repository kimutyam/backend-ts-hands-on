interface Employee {
  name: string;
  age: number;
}

{
  // eslint-disable-next-line prefer-const
  let employee: Employee = {
    name: '木村',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    age: 'Secret', // NG: number型ではありません
  };
  console.log(employee);
}

interface Manager extends Employee {
  grade: number;
}

export type { Employee, Manager };
