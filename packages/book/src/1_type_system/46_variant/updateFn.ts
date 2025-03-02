import type { Employee, Manager } from './types.js';

type UpdateEmployeeFn = (
  target: Employee,
  props: Partial<Employee>,
) => Employee;
type UpdateManagerFn = (
  target: Manager,
  props: Partial<Manager>,
) => Manager;

// 互換性の判断が難しくなります。
// また、updateメソッドはクラス等を用いて実装する必要があります。この方法は本書では積極的に採用しません。3章で説明します。

// false
type X = UpdateManagerFn extends UpdateEmployeeFn
  ? true
  : false;

export type { X };
