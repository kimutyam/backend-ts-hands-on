// ("hi" | "hello" | "good afternoon") 型
import type { MemberId, UserId } from './types';

type Greeting = 'hi' | 'hello' | 'good afternoon';

// (string | number)型または、(string | boolean)型 => (string | number | boolean) 型
type UserOrMemberId = UserId | MemberId;
type UsernameOrAliases = string | Array<string>;

export type { Greeting, UserOrMemberId, UsernameOrAliases };
