import type { Employee, Manager } from 'ch2/ex6/sample.js';

let employee: Employee = { name: '木村', age: 30 };
const manager: Manager = { name: '佐藤', age: 25, grade: 1 };
employee = manager;

console.log(employee);
