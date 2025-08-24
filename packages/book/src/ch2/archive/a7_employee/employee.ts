interface Employee {
  name: string;
  age: number;
}

const data = {
  name: '木村',
  age: 20,
};

const employee: Employee = data;

console.log(employee.name);
