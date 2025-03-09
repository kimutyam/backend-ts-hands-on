import type { Employee } from '1_type_system/70_type_manipulation/types.js';

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableEmployee = Nullable<Employee>; // { name: string | null; age: number | null; }

export type { NullableEmployee };
