import type { Employee } from 'ch1/ex70/types.js';

type PartialEmployee = Partial<Employee>; // { name?: string; age?: number; }
type RequiredEmployee = Required<PartialEmployee>; // { name: string; age: number; }
type ReadonlyEmployee = Readonly<Employee>; // { readonly name: string; readonly age: number; }

export type { PartialEmployee, RequiredEmployee, ReadonlyEmployee };
