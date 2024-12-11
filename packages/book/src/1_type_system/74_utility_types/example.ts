import type { Employee } from '../70_type_manipulation/types';

type ReadonlyEmployee = Readonly<Employee>; // { readonly name: string; readonly age: number; }

type PartialEmployee = Partial<Employee>; // { name?: string; age?: number; }

type ShapeWithoutCircle = Exclude<'square' | 'rectangle' | 'circle', 'circle'>; // "square" | "rectangle"

export type { ReadonlyEmployee, PartialEmployee, ShapeWithoutCircle };
