import type { Employee } from 'ch1/ex70/types.js';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// { name: string | null; age: number | null; }
type NullableEmployee = Nullable<Employee>;

export type { NullableEmployee };
