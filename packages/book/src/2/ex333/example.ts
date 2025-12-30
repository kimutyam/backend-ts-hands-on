import type { Employee } from '../ex332/types.js';

type ReadonlyEmployee = Readonly<Employee>; // 1

type PartialEmployee = Partial<Employee>;

type ShapeWithoutCircle = Exclude<'square' | 'rectangle' | 'circle', 'circle'>; // 1

export type { PartialEmployee, ReadonlyEmployee, ShapeWithoutCircle };
