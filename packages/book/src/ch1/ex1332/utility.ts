import type { Employee } from 'ch1/ex1332/types.js';

// { name?: string; age?: number; }
type PartialEmployee = Partial<Employee>;
// { name: string; age: number; }
type RequiredEmployee = Required<PartialEmployee>;
// { readonly name: string; readonly age: number; }
type ReadonlyEmployee = Readonly<Employee>;

export type { PartialEmployee, ReadonlyEmployee, RequiredEmployee };
