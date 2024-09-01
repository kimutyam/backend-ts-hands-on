interface Employee {
  name: string;
  age: number;
}

function modifyName(employee: Employee, name: string): Employee {
  // eslint-disable-next-line no-param-reassign
  employee.name = name;
  return employee;
}

{
  const employee = {
    name: 'Alice',
    age: 10,
  };

  console.log(employee); // { 'name': 'Alice', 'age': 10 }

  const updatedPerson = modifyName(employee, 'Telles');

  console.log(employee); // { 'name': 'Telles', 'age': 10 }
  console.log(updatedPerson); // { 'name': 'Telles', 'age': 10 }
}
