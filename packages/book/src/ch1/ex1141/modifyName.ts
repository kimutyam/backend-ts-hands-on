import type { Employee } from 'ch1/ex1141/interface.js';

const modifyName = (employee: Employee, name: string): Employee => ({
  ...employee,
  name,
});

export { modifyName };
