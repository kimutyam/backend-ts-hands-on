import type { Employee, Manager } from 'ch1/ex1251/types.js';

const employee: Employee = { name: '木村', age: 30 };
const manager: Manager = {
  name: '佐藤',
  age: 25,
  grade: 3,
};

type CreateEmployeeFn = () => Employee;
type CreateManagerFn = () => Manager;

const createEmployee: CreateEmployeeFn = () => manager;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const createManager: CreateManagerFn = () => employee;

export { createEmployee, createManager };
