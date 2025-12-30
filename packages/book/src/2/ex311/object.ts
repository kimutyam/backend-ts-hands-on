import type { Employee, Manager } from '../ex221/employee.js';

let anyObject: object; // 1
const employee: Employee = { name: '木村', age: 30 };
const manager: Manager = {
  name: '佐藤',
  age: 25,
  grade: 3,
};
anyObject = employee;
anyObject = manager;

console.log(anyObject);
