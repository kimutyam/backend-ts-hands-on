import type { Employee } from './types';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableEmployee = Nullable<Employee>; // { name: string | null; age: number | null; }

export type { NullableEmployee };
