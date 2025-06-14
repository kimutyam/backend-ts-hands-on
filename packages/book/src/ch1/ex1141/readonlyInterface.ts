interface Employee {
  readonly name: string;
  readonly age: number;
}

const modifyName = (employee: Employee, name: string): Employee => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line no-param-reassign
  employee.name = name; // 1
  return employee;
};

const employee = {
  name: '木村',
  age: 10,
};
modifyName(employee, '佐藤');

export { type Employee, modifyName };
