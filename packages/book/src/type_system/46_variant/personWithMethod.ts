import type { Executive } from './types';

interface EmployeeFn {
  update: (target: Employee) => Employee;
}

interface ExecutiveFn {
  update: (target: Executive) => Executive;
}

// 互換性の判断が難しくなります。
// また、updateメソッドはクラス等を用いて実装する必要があります。この方法は本書では積極的に採用しません。3章で説明します。

// false
type X = ExecutiveFn extends EmployeeFn ? true : false;
// false

export type { EmployeeFn, X };
