import type {
  Employee,
  Manager,
} from '1_type_system/70_type_manipulation/types.js';

type IsEmployeeSubType<T> = T extends Employee
  ? 'yes'
  : 'no';

// "yes" 型
type Test1 = IsEmployeeSubType<Manager>;
// "no"型
type Test2 = IsEmployeeSubType<{ name: string }>;

export type { Test1, Test2 };
