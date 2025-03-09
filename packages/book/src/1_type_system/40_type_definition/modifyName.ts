import type { Employee } from '1_type_system/40_type_definition/interface.js';

const modifyName = (
  employee: Employee,
  name: string,
): Employee => ({
  ...employee,
  name,
});

export { modifyName };
