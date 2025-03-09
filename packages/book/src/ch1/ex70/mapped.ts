import type { Employee } from 'ch1/ex70/types.js';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableEmployee = Nullable<Employee>; // { name: string | null; age: number | null; }

export type { NullableEmployee };
