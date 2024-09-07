import type { Executive, Manager } from '../44_subtype/employee';

// {name: string, age: number}型になります
type ManagerUnionExecutive = Manager | Executive;

declare function ManagerUnionExecutive(): ManagerUnionExecutive;

const managerUnionExecutive = ManagerUnionExecutive();
managerUnionExecutive.name = 'Bob'; // OK
managerUnionExecutive.age = 32; // OK
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
managerUnionExecutive.grade = 3; // NG: コンパイルエラー
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
managerUnionExecutive.title = 'CTO'; // NG: コンパイルエラー
