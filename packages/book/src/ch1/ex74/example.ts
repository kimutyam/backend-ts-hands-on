import type { Employee } from 'ch1/ex70/types.js';

type ReadonlyEmployee = Readonly<Employee>; // { readonly name: string; readonly age: number; }

type PartialEmployee = Partial<Employee>; // { name?: string; age?: number; }

type ShapeWithoutCircle = Exclude<'square' | 'rectangle' | 'circle', 'circle'>; // "square" | "rectangle"

export type { ReadonlyEmployee, PartialEmployee, ShapeWithoutCircle };
