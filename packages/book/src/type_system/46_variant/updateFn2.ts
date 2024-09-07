import type { Manager } from './types';

type UpdateEmployeeFn = (target: Employee) => Employee;
type UpdateManagerFn = (target: Employee) => Manager;

// 互換性の判断が難しくなります。
// また、updateメソッドはクラス等を用いて実装する必要があります。この方法は本書では積極的に採用しません。3章で説明します。

// true
type X = UpdateManagerFn extends UpdateEmployeeFn ? true : false;

export type { X };
