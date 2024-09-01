type EmployeeName = string;
interface Employee {
  name: EmployeeName;
  age: number;
}

function modifyName(employee: Employee, name: EmployeeName): Employee {
  return { ...employee, name };
}

export { modifyName, type Employee };
