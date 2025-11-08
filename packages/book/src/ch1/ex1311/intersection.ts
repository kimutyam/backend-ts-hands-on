import type { MemberId, UserId } from './types.js';

type UserIdAndMemberId = UserId & MemberId;

type NeverGreeting = 'hi' & 'hello';

export type { NeverGreeting, UserIdAndMemberId };
