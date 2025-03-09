import type { Employee } from '1_type_system/70_type_manipulation/types.js';

type PartialEmployee = Partial<Employee>; // { name?: string; age?: number; }
type RequiredEmployee = Required<PartialEmployee>; // { name: string; age: number; }
type ReadonlyEmployee = Readonly<Employee>; // { readonly name: string; readonly age: number; }

export type {
  PartialEmployee,
  RequiredEmployee,
  ReadonlyEmployee,
};
