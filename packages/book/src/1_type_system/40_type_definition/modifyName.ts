import type { Employee } from './interface.js';

const modifyName = (
  employee: Employee,
  name: string,
): Employee => ({
  ...employee,
  name,
});

export { modifyName };
