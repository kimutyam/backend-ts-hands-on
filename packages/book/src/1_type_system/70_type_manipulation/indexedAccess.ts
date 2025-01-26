import type { Employee } from './types.js';

type Name = Employee['name']; // string

// 存在しないキーの場合はコンパイルエラーになります。
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type NotExist = Employee['notExist'];

export type { Name, NotExist };
