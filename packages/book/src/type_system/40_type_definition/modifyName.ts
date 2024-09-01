import type { Employee } from './interface';

function modifyName(employee: Employee, name: string): Employee {
  return { ...employee, name };
}

export { modifyName };
