import type { Employee } from 'ch1/ex70/types.js';

// { readonly name: string; readonly age: number; }
type ReadonlyEmployee = Readonly<Employee>;

// { name?: string; age?: number; }
type PartialEmployee = Partial<Employee>;

// "square" | "rectangle"
type ShapeWithoutCircle = Exclude<'square' | 'rectangle' | 'circle', 'circle'>;

export type { PartialEmployee, ReadonlyEmployee, ShapeWithoutCircle };
