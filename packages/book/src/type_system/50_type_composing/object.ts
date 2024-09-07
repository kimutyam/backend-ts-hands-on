import type { Employee, Manager } from '../44_subtype/employee';

// あらゆるオブジェクトを代入可能なobject型です
let anyObject: object;
const employee: Employee = { name: 'Alice', age: 30 };
const manager: Manager = { name: 'Bob', age: 25, grade: 3 };
anyObject = employee;
anyObject = manager;

console.log(anyObject);
