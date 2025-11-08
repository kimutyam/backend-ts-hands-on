import type { Employee } from './types.js';

type Name = Employee['name']; // 1

// 存在しないキーの場合はコンパイルエラーになります。
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type NotExist = Employee['notExist']; // 2

export type { Name, NotExist };
