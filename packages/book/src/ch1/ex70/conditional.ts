import type { Employee, Manager } from 'ch1/ex70/types.js';

type IsEmployeeSubType<T> = T extends Employee
  ? 'yes'
  : 'no';

// "yes" 型
type Test1 = IsEmployeeSubType<Manager>;
// "no"型
type Test2 = IsEmployeeSubType<{ name: string }>;

export type { Test1, Test2 };
