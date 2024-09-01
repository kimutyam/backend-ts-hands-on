import type { Manager } from './types';

const employee: Employee = { name: 'Alice', age: 30 };
const manager: Manager = { name: 'Bob', age: 25, grade: 3 };

const createEmployee: () => Employee = () => manager;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const createManager: () => Manager = () => employee;

export { createEmployee, createManager };
