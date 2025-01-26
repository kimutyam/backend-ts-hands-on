import type { Employee, Manager } from '../44_subtype/employee.js';

// あらゆるオブジェクトを代入可能なobject型です
let anyObject: object;
const employee: Employee = { name: '木村', age: 30 };
const manager: Manager = { name: '佐藤', age: 25, grade: 3 };
anyObject = employee;
anyObject = manager;

console.log(anyObject);
