import type { MemberId, UserId } from './types.js';

type Greeting = 'hi' | 'hello';

// (string | number | boolean) 型
type UserOrMemberId = UserId | MemberId;
type UsernameOrAliases = string | Array<string>;

export type { Greeting, UsernameOrAliases, UserOrMemberId };
