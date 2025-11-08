import type { Employee } from './types.js';

type Nullable<T> = {
  [K in keyof T]: T[K] | null; // 1
};

type NullableEmployee = Nullable<Employee>; // 2

export type { NullableEmployee };
