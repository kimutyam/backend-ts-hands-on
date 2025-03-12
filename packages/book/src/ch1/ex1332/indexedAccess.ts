import type { Employee } from 'ch1/ex1332/types.js';

type Name = Employee['name']; // 1

// 存在しないキーの場合はコンパイルエラーになります。
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type NotExist = Employee['notExist']; // 2

export type { Name, NotExist };
