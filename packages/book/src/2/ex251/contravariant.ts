import type { Employee, Manager } from './types.js';

type PrintEmployeeFn = (arg: Employee) => void;
type PrintManagerFn = (arg: Manager) => void;

// 1
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const printEmployee: PrintEmployeeFn = (arg: Manager) => {
  console.log(arg.grade);
};

// 2
const printManager: PrintManagerFn = (arg: Employee) => {
  console.log(arg.name);
};

printEmployee({ name: '佐藤', age: 25 });

console.log(printEmployee, printManager);

export { type PrintEmployeeFn, type PrintManagerFn };
