interface Employee {
  name: string;
  age: number;
}

const modifyName = (
  employee: Employee,
  name: string,
): Employee => {
  // eslint-disable-next-line no-param-reassign
  employee.name = name;
  return employee;
};

{
  const employee = {
    name: '木村',
    age: 10,
  };

  console.log(employee); // { 'name': '木村', 'age': 10 }

  const updatedPerson = modifyName(employee, '佐藤');

  console.log(employee); // { 'name': '佐藤', 'age': 10 }
  console.log(updatedPerson); // { 'name': '佐藤', 'age': 10 }
}
