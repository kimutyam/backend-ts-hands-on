interface Employee {
  name: string;
  age: number;
}

const modifyName = (employee: Employee, name: string): Employee => {
  // eslint-disable-next-line no-param-reassign
  employee.name = name; // 1
  return employee;
};

{
  const employee = {
    name: '木村',
    age: 10,
  };

  console.log(employee); // 2

  const updatedPerson = modifyName(employee, '佐藤');

  console.log(employee); // 3
  console.log(updatedPerson); // 4
}
