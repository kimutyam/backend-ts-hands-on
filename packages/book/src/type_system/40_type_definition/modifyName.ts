import type { Employee } from './interface';

const modifyName = (employee: Employee, name: string): Employee => ({
  ...employee,
  name,
});

export { modifyName };
