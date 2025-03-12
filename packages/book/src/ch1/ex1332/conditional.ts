import type { Employee, Manager } from 'ch1/ex1332/types.js';

type IsEmployeeSubType<T> = T extends Employee ? 'yes' : 'no';

type Test1 = IsEmployeeSubType<Manager>; // 1
type Test2 = IsEmployeeSubType<{ name: string }>; // 2

export type { Test1, Test2 };
