import type { Employee, Manager } from 'ch1/ex1251/types.js';

interface EmployeeFn {
  // プロパティ記法
  printFn: (arg: Employee) => void;
  // メソッド記法
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  printMethod(arg: Employee): void;
}

const managerFn: EmployeeFn = {
  // 反変と評価されるためコンパイルエラーになります
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  printFn: (arg: Manager): void => {
    console.log(arg.grade);
  },
  // 双変になるため、コンパイルエラーになりません
  printMethod: (arg: Manager): void => {
    console.log(arg.grade);
  },
};

export { managerFn };
