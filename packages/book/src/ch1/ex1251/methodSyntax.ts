import type { Employee, Manager } from 'ch1/ex1251/types.js';

interface EmployeeFn {
  // 1
  printFn: (arg: Employee) => void;
  // 2
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  printMethod(arg: Employee): void;
}

const managerFn: EmployeeFn = {
  // 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  printFn: (arg: Manager): void => {
    console.log(arg.grade);
  },
  // 2
  printMethod: (arg: Manager): void => {
    console.log(arg.grade);
  },
};

export { managerFn };
