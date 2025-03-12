import type { MemberId, UserId } from 'ch1/ex1311/types.js';

type UserIdAndMemberId = UserId & MemberId;

type NeverGreeting = 'hi' & 'hello';

export type { NeverGreeting, UserIdAndMemberId };
