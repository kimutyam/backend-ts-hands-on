import type {
  Employee,
  Manager,
} from '1_type_system/46_variant/types.js';

type PrintEmployeeFn = (arg: Employee) => void;
type PrintManagerFn = (arg: Manager) => void;

// false
// 引数: 狭い型(Employee)に広い型(Manager)を代入できない (危険な入力)
type Y = PrintManagerFn extends PrintEmployeeFn
  ? true
  : false;
// true
// 引数: 広い型(Manager)に狭い型(Employee)を代入できる
type X = PrintEmployeeFn extends PrintManagerFn
  ? true
  : false;

let printEmployee: PrintEmployeeFn = (arg: Employee) =>
  console.log(arg.name);
let printManager: PrintManagerFn = (arg: Manager) =>
  console.log(arg.grade);

// 型エラー。型の引数は Employee だが、実際には Manager が必要
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
printEmployee = printManager;

// Manager を渡されても Employee の部分しか使わないので代入可能
printManager = printEmployee;

// 関数内部で呼び出しているgradeプロパティを解決できないため、ランタイムで予期していない挙動を起こす
printEmployee({ name: '佐藤', age: 25 });

export { type X, type Y };
