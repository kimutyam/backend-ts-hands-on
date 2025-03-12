interface Employee {
  readonly name: string;
  readonly details: { age: number };
}

const employee: Employee = {
  name: 'Alice',
  details: { age: 30 },
};
employee.details.age = 31; // 1

export { type Employee };
