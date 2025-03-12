import type { Employee } from 'ch1/ex1332/types.js';

type ReadonlyEmployee = Readonly<Employee>; // 1

type PartialEmployee = Partial<Employee>;

type ShapeWithoutCircle = Exclude<'square' | 'rectangle' | 'circle', 'circle'>; // 1

export type { PartialEmployee, ReadonlyEmployee, ShapeWithoutCircle };
