import type {
  MemberId,
  UserId,
} from '1_type_system/50_type_composing/types.js';

// string型
type UserIdAndMemberId = UserId & MemberId;

// never型
type NeverGreeting = 'hi' & 'hello';

export type { UserIdAndMemberId, NeverGreeting };
