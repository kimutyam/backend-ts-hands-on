import type { Employee } from 'ch1/ex1211/types.js';

const printName = (person: { name: string }) => {
  console.log(person.name);
};

const employee: Employee = { name: '木村', age: 30 };
printName(employee); // OK: Employee型はnameプロパティを持つため
