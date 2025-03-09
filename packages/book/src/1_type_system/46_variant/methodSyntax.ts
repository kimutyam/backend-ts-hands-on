import type {
  Employee,
  Manager,
} from '1_type_system/46_variant/types.js';

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
  printFn: (arg: Manager) => console.log(arg.grade),
  // 双変になるため、コンパイルエラーになりません
  printMethod: (arg: Manager) => console.log(arg.grade),
};

export { managerFn };
