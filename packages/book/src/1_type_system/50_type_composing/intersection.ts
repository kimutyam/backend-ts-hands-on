import type { MemberId, UserId } from './types.js';

// string型
type UserIdAndMemberId = UserId & MemberId;

// never型
type NeverGreeting = 'hi' & 'hello';

export type { UserIdAndMemberId, NeverGreeting };
