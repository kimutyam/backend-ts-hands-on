import type {
  Executive,
  Manager,
} from '../44_subtype/employee.js';

// {name: string, age: number}型になります
type ManagerExecutiveUnion = Manager | Executive;

declare function ManagerExecutiveUnion(): ManagerExecutiveUnion;

const managerExecutiveUnion = ManagerExecutiveUnion();
managerExecutiveUnion.name = '木村'; // OK
managerExecutiveUnion.age = 32; // OK
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
managerExecutiveUnion.grade = 3; // NG: コンパイルエラー
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
managerExecutiveUnion.title = 'CTO'; // NG: コンパイルエラー
