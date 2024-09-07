import type { Manager } from './types';

type PrintEmployeeFn = (arg: Employee) => void;
type PrintManagerFn = (arg: Manager) => void;

// false
// 引数: 広い型(Employee)に狭い型(Manager)を代入できない (危険な入力)
type Y = PrintManagerFn extends PrintEmployeeFn ? true : false;
// true
// 引数: 狭い型(Manager)に広い型(Employee)を代入できる
type X = PrintEmployeeFn extends PrintManagerFn ? true : false;

// 型エラー。型の引数は Employee だが、実際には Manager が必要
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const printEmployee: (arg: Employee) => void = (arg: Manager) => console.log(arg.grade);

// Manager を渡されても Employee の部分しか使わないので代入可能
const printManager: (arg: Manager) => void = (arg: Employee) => console.log(arg.name);

export { printEmployee, printManager, type X, type Y };
