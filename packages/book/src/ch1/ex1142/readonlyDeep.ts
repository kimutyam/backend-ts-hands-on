import type { Employee } from 'ch1/ex1142/employee.js';

type ReadonlyDeep<T> = {
  readonly [K in keyof T]: ReadonlyDeep<T[K]>;
};
const employee: ReadonlyDeep<Employee> = {
  name: 'Alice',
  details: { age: 30 },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
employee.details.age = 31; // 1
