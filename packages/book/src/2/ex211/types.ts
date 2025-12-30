interface Employee {
  name: string;
  age: number;
}

interface PartTime {
  // 1
  name: string;
  age: number;
}

let employee: Employee = { name: '木村', age: 30 };
const partTime: PartTime = { name: '佐藤', age: 25 };
employee = partTime; // 2

interface Person {
  name: string;
}

let person: Person = { name: '斎藤' };
person = employee;

console.log(employee, person);

export type { Employee, PartTime, Person };
