import type { Manager } from './types';

// 型エラー。型の引数は Employee だが、実際には Manager が必要
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const printEmployee: (arg: Employee) => void = (arg: Manager) => console.log(arg.grade);

// Manager を渡されても Employee の部分しか使わないので代入可能
const printManager: (arg: Manager) => void = (arg: Employee) => console.log(arg.name);

export { printEmployee, printManager };
