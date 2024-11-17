import type { Manager } from './types';

const employee: Employee = { name: '木村', age: 30 };
const manager: Manager = { name: '佐藤', age: 25, grade: 3 };

type CreateEmployeeFn = () => Employee;
type CreateManagerFn = () => Manager;

// true
// 戻り値: 広い型(Employee)に狭い型(Manager)を代入できる
// 代入できるのでサブタイプ互換性がある
type X = CreateManagerFn extends CreateEmployeeFn ? true : false;
// false
// 戻り値: 狭い型(Manager)に広い型(Employee)を代入できない (危険な出力)
// 代入できないのでサブタイプ互換性がない
type Y = CreateEmployeeFn extends CreateManagerFn ? true : false;

const createEmployee: CreateEmployeeFn = () => manager;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const createManager: CreateManagerFn = () => employee;

export { createEmployee, createManager, type X, type Y };
