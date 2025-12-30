import type { Employee } from './employee.js';

type ReadonlyDeep<T> = {
  readonly [K in keyof T]: ReadonlyDeep<T[K]>;
};
const employee: ReadonlyDeep<Employee> = {
  name: 'Alice',
  details: { age: 30 },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
employee.details.age = 31; // 1
