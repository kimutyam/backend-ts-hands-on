import type { Employee, Manager } from 'ch1/ex1251/types.js';

type PrintEmployeeFn = (arg: Employee) => void;
type PrintManagerFn = (arg: Manager) => void;

let printEmployee: PrintEmployeeFn = (arg: Employee) => {
  console.log(arg.name);
};
let printManager: PrintManagerFn = (arg: Manager) => {
  console.log(arg.grade);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
printEmployee = printManager;

printManager = printEmployee;

printEmployee({ name: '佐藤', age: 25 });

export { type PrintEmployeeFn, type PrintManagerFn };
