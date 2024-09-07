import type { MemberId, UserId } from './types';

// string型
type UserIdAndMemberId = UserId & MemberId;

// never型
type NeverGreeting = 'hi' & 'hello';

export type { UserIdAndMemberId, NeverGreeting };
