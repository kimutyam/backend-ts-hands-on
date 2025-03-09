type EmployeeName = string;
interface Employee {
  name: EmployeeName;
  age: number;
}

const modifyName = (employee: Employee, name: EmployeeName): Employee => ({
  ...employee,
  name,
});

export { type Employee, modifyName };
